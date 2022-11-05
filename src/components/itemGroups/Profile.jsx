
import { Fragment, useEffect, useState } from "react";
import { enumLabel, formatDateTime } from "../../helpers/helpers";
import Icon from "../global/Icon";
import { gql, useMutation } from '@apollo/client';
import { Form, Formik, Field } from "formik";
// import { MY_PARTNERS_QUERY } from "./myPartners";
import GendersOptions from "../items/profile/GendersOptions";
import SexualityOptions from "../items/profile/SexualityOptions";
import PositionOptions from "../items/profile/PositionOptions";
import ContactItems from "../items/profile/ContactItems";
import { MY_PARTNERS_QUERY } from "../../helpers/queries";
import ProfilePicture from "../items/profile/ProfilePicture";
import { DeletePartnerMutation } from "../../helpers/mutations";
import StarRating from "../items/StarRating";
import { useMatomo } from '@datapunt/matomo-tracker-react'


const NewPartnerMutation = gql`
    mutation NewPartnerMutation($data: PartnerCreateInput!) {
        addPartner(data: $data) {
         
            id

        }
    }
    `;

const EditPartnerMutation = gql`
    mutation EditPartnerMutation($data: PartnerUpdateInput!) {
        editPartner(data: $data) {
         
            id

        }
    }
    `;

const Profile = (props) => {
    const [readOnly, setReadOnly] = useState(props.displayMode === "view");
    const [person, setPerson] = useState(props.person);

    const [mutateFctNewPartner] = useMutation(NewPartnerMutation, { refetchQueries: [{ query: MY_PARTNERS_QUERY }] });
    const [mutateFctEditPartner] = useMutation(EditPartnerMutation, { refetchQueries: [{ query: MY_PARTNERS_QUERY }] });
    const [mutateFctDeletePartner] = useMutation(DeletePartnerMutation, { refetchQueries: [{ query: MY_PARTNERS_QUERY }] });

    const [profilePicture, setProfilePicture] = useState("");

    const { trackPageView } = useMatomo();

    useEffect(() => {
        trackPageView({
            documentTitle: 'Partner Details',
        });
    }, []);

    useEffect(() => {
        setReadOnly(props.displayMode === "view");
        if (props.displayMode === "new") {
            setPerson(null);

        } else {
            setPerson(props.person);
        }

    }, [props.displayMode, props.person, props.partner]);

    console.log("person props: ", props.person);

    const handleClickEdit = (values) => {
        setReadOnly(false);
        props.setDisplayMode("edit");
    }
    const handleClickSave = (values) => {
        setReadOnly(true);
        console.log("handleClickSave", values);

        let data = {
            firstName: values.firstName,
            lastName: values.lastName,
            nickName: values.nickName,
            birthday: new Date(values.birthday +"T00:00Z"),
            nationality: values.nationality,
            // sexuality: values.sexuality,
            notes: values.notes,
            how: values.how,
            newContactInfos: [],
            // updatedContactInfos: [],
            // deletedContactInfos: [],
            genderId: Number(values.genderId)
        };

        if (!["0", ""].includes(values.sexuality)) {
            data.sexuality = values.sexuality;
        }
        if (!["0", ""].includes(values.sexPosition)) {
            data.sexPosition = values.sexPosition;
        }

        let checkInfo = (info) => {
            let checkedInfo = [];
            info.forEach(item => {
                if (item.designation && item.designation !== "" && item.info && item.info !== "") {
                    checkedInfo.push(item);
                }
            });

            return checkedInfo;
        }

        let ContactInfosValues = [
            ...checkInfo(values.contactInfosPhone),
            ...checkInfo(values.contactInfosEmail),
            ...checkInfo(values.contactInfossocial_media)
        ];

        if (person) {
            data.updatedContactInfos = [];
            data.deletedContactInfos = [];
        }

        ContactInfosValues.forEach(contactInfos => {
            if (contactInfos.id) {

                data.updatedContactInfos.push({
                    id: parseInt(contactInfos.id),
                    type: contactInfos.type,
                    info: contactInfos.info,
                    designation: contactInfos.designation
                });
            } else {
                data.newContactInfos.push({
                    type: contactInfos.type,
                    info: contactInfos.info,
                    designation: contactInfos.designation
                });
            }
        });

        person && person.contactInfos.forEach(contactInfos => {
            if (!ContactInfosValues.find(contactInfos2 => contactInfos2.id === contactInfos.id)) {
                data.deletedContactInfos.push({
                    id: parseInt(contactInfos.id)
                });
            }
        });

        console.log("######## profilePicture: ", profilePicture);
        if (profilePicture !== "") {
            data.picture = profilePicture;
        }

        console.log(new Date(values.birthday));

        props.setDisplayMode("loading");

        if (props.displayMode === "new") {
            mutateFctNewPartner({
                variables: {
                    data: data
                }
            }).then(res => {
                console.log(res);
                props.setSelectedPartner(res.data.addPartner);
                props.setDisplayMode("view");

            }).catch(err => {
                console.log(err);
            });
        } else if (props.displayMode === "edit") {
            data.id = parseInt(props.partner.id);
            console.log("edit data: ", data);
            mutateFctEditPartner({
                variables: {
                    data: data
                }
            }).then(res => {
                console.log(res);
                // props.setSelectedPartner(res.data.editPartner);
                props.setDisplayMode("view");
            }).catch(err => {
                console.log(err);
            });

        }

        console.log(data);

    }

    const handleClickDelete = () => {

        const idToDelete = parseInt(props.partner.id);
        console.log("idToDelete: ", idToDelete);
        mutateFctDeletePartner({
            variables: {
                id: idToDelete
            }
        }).then(res => {
            console.log(res);
            props.setSelectedPartner(null);
            props.setDisplayMode("none");

        }).catch(err => {
            console.log(err);
        });
    }

    function validateGender(value) {
        let error;
        if (!value || value === "0") {
            error = 'Required';
        }
        // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        //   error = 'Invalid email address';
        // }
        return error;
    }

    let getConactInfo = (forType, person) => {
        let contactInfos = [];
        const emptyConactInfo = (forType) => ({
            id: null,
            type: forType,
            info: "",
            designation: ""
        });
        if (person) {

            let personContactInfos = person.contactInfos.filter((info) => { return info.type === forType });
            let isPersonContactInfos = personContactInfos.length > 0;

            contactInfos = [
                ...person.contactInfos.filter((info) => { return info.type === forType })
            ];
            if (!isPersonContactInfos) contactInfos.push(emptyConactInfo(forType));

        } else {
            contactInfos.push(emptyConactInfo(forType));

        }

        return contactInfos
    };

    let getPartnerGrade = (partnerHooks) => {
        let len = partnerHooks.filter(hook => hook.grade).length;
        let grade;
        if (len === 0) {
            grade = "";
        } else if (len === 1) {
            grade = partnerHooks[0].grade;
        } else {
            let sum = partnerHooks.filter(hook => hook.grade).reduce((a, b) => a.grade + b.grade);
            grade = sum / len;
        }
        return grade

    };

    return (
        (person || props.displayMode === "new") &&
        <div className="profile">
            <Formik
                enableReinitialize
                initialValues={person ? {
                    firstName: person.firstName === null ? "" : person.firstName,
                    lastName: person.lastName === null ? "" : person.lastName,
                    nickName: person.nickName === null ? "" : person.nickName,
                    birthday: person.birthday === null ? "" : person.birthday,
                    nationality: person.nationality === null ? "" : person.nationality,
                    sexuality: person.sexuality === null ? "" : person.sexuality,
                    sexPosition: person.sexPosition === null ? "" : person.sexPosition,
                    notes: person.notes === null ? "" : person.notes,
                    how: person.how === null ? "" : person.how,
                    genderId: person && person.gender ? person.gender.id : "",
                    contactInfosPhone: getConactInfo("Phone", person),
                    contactInfosEmail: getConactInfo("Email", person),
                    contactInfossocial_media: getConactInfo("social_media", person),
                    grade: props.partner && props.partner.hooks ? getPartnerGrade(props.partner.hooks) : "",
                } : {
                    firstName: "",
                    lastName: "",
                    nickName: "",
                    birthday: "",
                    nationality: "",
                    sexuality: "0",
                    sexPosition: "0",
                    notes: "",
                    how: "",
                    genderId: "0",
                    contactInfosPhone: getConactInfo("Phone"),
                    contactInfosEmail: getConactInfo("Email"),
                    contactInfossocial_media: getConactInfo("social_media"),
                    grade: "",
                }}
                onSubmit={(values) => {
                    props.displayMode === "view" ?
                        handleClickEdit(values) :
                        handleClickSave(values);

                }}  >
                {({ handleSubmit, values, errors, touched }) => (
                    console.log("form values profile: ", values),
                    <Form>
                        <Fragment>
                            <div className="column left">
                                <div className="header">
                                    <div className="actionIcons">
                                        {/* <span className="mobileBack"> */}
                                        <Icon type="arrowLeft" className="mobileBack" onClick={() => {
                                            props.setSelectedPartner(null);
                                            props.setDisplayMode("none");
                                        }} />
                                        {/* </span> */}

                                        <span className="rightButtons">
                                            {
                                                props.displayMode === "edit" &&
                                                <span className="deleteButton">
                                                    <Icon type="bin" className="deleteButton" onClick={() => {
                                                        handleClickDelete();
                                                        props.setSelectedPartner(null);
                                                        props.setDisplayMode("none");
                                                    }}
                                                    />
                                                </span>
                                            }

                                            <Field as="span" className="submit" onClick={handleSubmit}>
                                                {props.displayMode === "view" && <Icon type="edit" /*onClick={() => handleClickEdit()} */ />}
                                                {["edit", "new"].includes(props.displayMode) && <Icon type="save" /*onClick={() => handleClickSave()} */ />}
                                            </Field>
                                        </span>

                                    </div>

                                    <div className="personHeader">

                                        <ProfilePicture
                                            displayMode={props.displayMode}
                                            profilePicture={profilePicture}
                                            setProfilePicture={setProfilePicture}
                                            person={person}
                                        />

                                        <h2 className="name">
                                            {
                                                props.displayMode === "view" ?
                                                    person.firstName + " " + person.lastName :
                                                    <Fragment>
                                                        <Field
                                                            name="firstName"
                                                            type="text"
                                                            key={"firstName" + (readOnly ? "readonly" : "active") + (person && person.firstName)}
                                                            className="form-control"
                                                            placeholder="First Name"
                                                            disabled={readOnly}
                                                            value={values.firstName}
                                                        />
                                                        <Field
                                                            name="lastName"
                                                            type="text"
                                                            key={"lastName" + (readOnly ? "readonly" : "active") + (person && person.lastName)}
                                                            className="form-control"
                                                            placeholder="Last Name"
                                                            disabled={readOnly}
                                                            value={values.lastName}

                                                        />
                                                    </Fragment>
                                            }
                                        </h2>
                                        <h3>
                                            {
                                                props.displayMode === "view" ?
                                                    person.nickName :
                                                    <Field
                                                        name="nickName"
                                                        type="text"
                                                        key={"nickName" + (readOnly ? "readonly" : "active") + (person && person.nickName)}
                                                        className="form-control"
                                                        placeholder="Nickname"
                                                        disabled={readOnly}
                                                        value={values.nickName}

                                                    />
                                            }
                                        </h3>
                                    </div>

                                </div>
                                <div className="info">
                                    <div className="column left">
                                        {
                                            (values.contactInfosPhone.length > 0 || props.displayMode !== "view") &&
                                            <div className="infoGroup phone">

                                                <ContactItems
                                                    type="Phone"
                                                    displayMode={props.displayMode}
                                                    values={values}
                                                    readOnly={readOnly}
                                                />

                                            </div>
                                        }

                                        {
                                            (values.contactInfosEmail.length > 0 || props.displayMode !== "view") &&
                                            <div className="infoGroup email">

                                                <ContactItems
                                                    type="Email"
                                                    displayMode={props.displayMode}
                                                    values={values}
                                                    readOnly={readOnly}
                                                />

                                            </div>
                                        }

                                        {
                                            (props.displayMode === "view" ?
                                                values.notes !== "" && true :
                                                true) &&
                                            <div className="infoGroup note">
                                                <div className="infoItem">
                                                    <Icon type="notes" />
                                                    <div className="infoTexts">
                                                        <h4 className="label">
                                                            Notes</h4>
                                                        <p className="value">
                                                            <Field
                                                                name="notes"
                                                                type="textarea"
                                                                as="textarea"
                                                                rows="3"
                                                                key={"notes" + (readOnly ? "readonly" : "active") + (person && person.notes)}
                                                                className="form-control"
                                                                placeholder="What did you think about them?"
                                                                disabled={readOnly}
                                                                value={values.notes}
                                                                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'

                                                            />
                                                        </p>
                                                    </div>


                                                </div>
                                            </div>
                                        }
                                        {
                                            (props.displayMode === "view" ?
                                                values.how !== "" && true :
                                                true) &&
                                            <div className="infoGroup how">
                                                <div className="infoItem">
                                                    <Icon type="path" />
                                                    <div className="infoTexts">
                                                        <h4 className="label">
                                                            How</h4>
                                                        <p className="value">
                                                            <Field
                                                                name="how"
                                                                type="text"
                                                                key={"how" + (readOnly ? "readonly" : "active") + (person && person.how)}
                                                                className="form-control"
                                                                placeholder="How did you meet?"
                                                                disabled={readOnly}
                                                                value={values.how}

                                                            />
                                                        </p>
                                                    </div>


                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="column right">
                                <div className="header">

                                    {
                                        props.partner ?
                                            <p>Recent hooks</p> :
                                            <div className="empty"></div>
                                    }
                                </div>
                                <div className="info">
                                    <div className="column right">
                                        <div className="info">
                                            <div className="column left">
                                                {
                                                    (props.displayMode === "view" ?
                                                        person && (person.birthday || person.nationality) && true
                                                        : true) &&
                                                    <div className="infoGroup identity">
                                                        {
                                                            (props.displayMode === "view" ?
                                                                person && person.birthday && true
                                                                : true) &&
                                                            <div className="infoItem birthday">
                                                                <Icon type="birthday" />
                                                                <div className="infoTexts">
                                                                    <h4 className="label">
                                                                        Birthday</h4>
                                                                    <p className="value">
                                                                        <Field
                                                                            name="birthday"
                                                                            type="date"
                                                                            key={"birthday" + (readOnly ? "readonly" : "active") + (person && person.birthday)}
                                                                            className="form-control"
                                                                            // placeholder="Nickname"
                                                                            disabled={readOnly}
                                                                            value={values.birthday.split("T")[0]}

                                                                        />
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        }

                                                        {
                                                            (props.displayMode === "view" ?
                                                                person && person.birthday && person.nationality && true
                                                                : true) &&
                                                            <div className="infoSeparator" ></div>}
                                                        {
                                                            (props.displayMode === "view" ?
                                                                person && person.nationality && true
                                                                : true) &&

                                                            <div className="infoItem nationality">
                                                                <Icon type="nationality" />
                                                                <div className="infoTexts">
                                                                    <h4 className="label">
                                                                        Nationality</h4>
                                                                    <p className="value">
                                                                        <Field
                                                                            name="nationality"
                                                                            type="text"
                                                                            key={"nationality" + (readOnly ? "readonly" : "active") + (person && person.nationality)}
                                                                            className="form-control"
                                                                            placeholder="British"
                                                                            disabled={readOnly}
                                                                            value={values.nationality}

                                                                        />
                                                                    </p>
                                                                </div>


                                                            </div>
                                                        }

                                                    </div>
                                                }
                                                {
                                                    ((values.contactInfossocial_media.length > 0 && values.contactInfossocial_media[0].info !== "") || props.displayMode !== "view") &&
                                                    <div className="infoGroup social_media">
                                                        <h4>Social Media</h4>
                                                        <ContactItems
                                                            type="social_media"
                                                            displayMode={props.displayMode}
                                                            values={values}
                                                            readOnly={readOnly}
                                                        />

                                                    </div>
                                                }
                                            </div>
                                            <div className="column right">
                                                <div className="infoGroup sexuality">
                                                    {
                                                        (props.displayMode !== "view" || values.sexuality !== "") &&
                                                        <>
                                                            <div className="infoItem sexuality">
                                                                <Icon type={(values.sexuality && values.sexuality === "Straight") ? "sexualityStraight" : "sexuality"} />
                                                                <div className="infoTexts">
                                                                    <h4 className="label">Sexuality</h4>
                                                                    <p className="value">
                                                                        {
                                                                            props.displayMode === "view" ?
                                                                                enumLabel(person.sexuality) :
                                                                                <Field
                                                                                    name="sexuality"
                                                                                    as="select"
                                                                                    value={values.sexuality}
                                                                                >
                                                                                    {
                                                                                        props.displayMode === "new" &&
                                                                                        <option disabled value="0"> -- select an option -- </option>
                                                                                    }
                                                                                    <SexualityOptions />
                                                                                    {/* <option value="straight">Straight</option>
                                                                            <option value="Gay">Gay</option> */}
                                                                                </Field>
                                                                        }

                                                                    </p>

                                                                </div>
                                                            </div>
                                                            <div className="infoSeparator" ></div>
                                                        </>
                                                    }

                                                    <div className={`infoItem gender ${touched.genderId && errors.genderId ? "error" : ""}`}>
                                                        <Icon type="genders" />
                                                        <div className="infoTexts">
                                                            <h4 className="label">Gender</h4>
                                                            <p className="value">
                                                                {props.displayMode === "view" ?
                                                                    person && person.gender && person.gender.label :
                                                                    <Fragment>
                                                                        <Field
                                                                            name="genderId"
                                                                            as="select"
                                                                            value={values.genderId}
                                                                            validate={validateGender}
                                                                        >
                                                                            {
                                                                                props.displayMode === "new" &&
                                                                                <option disabled value="0"> -- select an option -- </option>
                                                                            }
                                                                            <GendersOptions />
                                                                        </Field>
                                                                        {
                                                                            touched.genderId && errors.genderId &&
                                                                            <div className="error">Required</div>
                                                                        }
                                                                    </Fragment>
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {
                                                        (props.displayMode !== "view" || values.sexPosition !== "") &&
                                                        <>
                                                            <div className="infoSeparator" ></div>

                                                            <div className="infoItem position">
                                                                <Icon type="position" />
                                                                <div className="infoTexts">
                                                                    <h4 className="label">Position</h4>
                                                                    <p className="value">
                                                                        {props.displayMode === "view" ?
                                                                            enumLabel(person.sexPosition) :
                                                                            <Field
                                                                                name="sexPosition"
                                                                                as="select"
                                                                                value={values.sexPosition}
                                                                            >
                                                                                {
                                                                                    props.displayMode === "new" &&
                                                                                    <option disabled value="0"> -- select an option -- </option>
                                                                                }
                                                                                <PositionOptions />
                                                                            </Field>
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }

                                                </div>
                                                {
                                                    values.grade !== "" &&
                                                    <div className="infoGroup grade">
                                                        <div className="infoItem">
                                                            <div className="infoTexts">
                                                                <h4 className="label">Average Grade</h4>
                                                                <StarRating
                                                                    displayMode="view"
                                                                    values={values}
                                                                    name="grade"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="infoGroup location">
                                            <div className="infoItem">
                                                <Icon type="location" />
                                                <div className="infoTexts">
                                                    <h4 className="label">Location</h4>
                                                    <p className="value"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Fragment>
                    </Form>

                )}
            </Formik>
        </div>
    );
}

export default Profile;