
import { Fragment, useEffect, useState } from "react";
import { formatDateTime } from "../../helpers";
import Icon from "../global/Icon";
import { gql, useMutation, useQuery } from '@apollo/client';
import { Form, Formik, Field } from "formik";
import { MY_PARTNERS_QUERY } from "./myPartners";
import GendersOptions from "../items/profile/GendersOptions";


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

    const [mutateFctNewPartner, { dataNewPartner, loadingNewPartner, errorNewPartner }] = useMutation(NewPartnerMutation, { refetchQueries: [{ query: MY_PARTNERS_QUERY }] });
    const [mutateFctEditPartner, { dataEditPartner, loadingEditPartner, errorEditPartner }] = useMutation(EditPartnerMutation, { refetchQueries: [{ query: MY_PARTNERS_QUERY }] });


    useEffect(() => {
        setReadOnly(props.displayMode === "view");
        if (props.displayMode === "new") {
            setPerson(null);

        } else {
            setPerson(props.person);
        }

        // document.querySelector("input[name='firstName']").value = ""

    }, [props.displayMode, props.person, props.partner]);

    console.log("person props: ", props.person);

    const handleClickEdit = (values) => {
        setReadOnly(false);
        props.setDisplayMode("edit");
    }
    const handleClickSave = (values) => {
        setReadOnly(true);
        console.log("handleClickSave", values);

        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            nickName: values.nickName,
            birthday: new Date(values.birthday),
            nationality: values.nationality,
            notes: values.notes,
            how: values.how,
            genderId: 24
        }
        console.log(new Date(values.birthday))

        if (props.displayMode === "new") {
            mutateFctNewPartner({
                variables: {
                    data: data
                }
            }).then(res => {
                console.log(res);
                props.setSelectedPartner(res.data.addPartner);
            }).catch(err => {
                console.log(err);
            });
        } else if (props.displayMode === "edit") {
            data.id = parseInt(person.id);
            console.log("edit data: ", data);
            mutateFctEditPartner({
                variables: {
                    data: data
                }
            }).then(res => {
                console.log(res);
                // props.setSelectedPartner(res.data.editPartner);
            }).catch(err => {
                console.log(err);
            });

        }
        props.setDisplayMode("loading");

        console.log(data);

    }

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
                    notes: person.notes === null ? "" : person.notes,
                    how: person.how === null ? "" : person.how,
                    genderId: person ? person.genderId : ""
                } : {
                    firstName: "",
                    lastName: "",
                    nickName: "",
                    birthday: "",
                    nationality: "",
                    sexuality: "",
                    notes: "",
                    how: "",
                    genderId: "0"
                }}
                onSubmit={(values) => {
                    props.displayMode === "view" ?
                        handleClickEdit(values) :
                        handleClickSave(values);

                }}  >
                {({ handleSubmit, values }) => (
                    // console.log(values),
                    <Form>

                        <Fragment>
                            <div className="column left">
                                <div className="header">
                                    <Field as="span" onClick={handleSubmit}>
                                        {props.displayMode === "view" && <Icon type="edit" /*onClick={() => handleClickEdit()} */ />}
                                        {["edit", "new"].includes(props.displayMode) && <Icon type="save" /*onClick={() => handleClickSave()} */ />}
                                    </Field>
                                    <div className="personHeader">
                                        <img src="/Ellipse 4.png" alt="" className="profilePic" />
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
                                        <div className="infoGroup phone">
                                            <div className="infoItem">
                                                <Icon type="phone" />
                                                <div className="infoTexts">
                                                    <h4 className="label">
                                                        Phone</h4>
                                                    <p className="value">
                                                    </p>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="infoGroup email">
                                            <div className="infoItem">
                                                <Icon type="email" />
                                                <div className="infoTexts">
                                                    <h4 className="label">
                                                        Email</h4>
                                                    <p className="value">
                                                    </p>
                                                </div>


                                            </div>
                                        </div>
                                        {
                                            (props.displayMode === "view" ?
                                                values.notes != "" && true :
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

                                                            />
                                                        </p>
                                                    </div>


                                                </div>
                                            </div>
                                        }
                                        {
                                            (props.displayMode === "view" ?
                                                values.how != "" && true :
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
                                                                            value={formatDateTime(values.birthday, 'techdate')}

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
                                                <div className="infoGroup social">
                                                    <div className="infoItem">
                                                        <Icon type="snapchat" />
                                                        <div className="infoTexts">
                                                            <h4 className="label">
                                                                Snapchat</h4>
                                                        </div>
                                                        <p className="value">
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column right">
                                                <div className="infoGroup sexuality">
                                                    <div className="infoItem sexuality">
                                                        <Icon type={(values.sexuality && values.sexuality === "straight") ? "sexualityStraight" : "sexuality"} />
                                                        <div className="infoTexts">
                                                            <h4 className="label">Sexuality</h4>
                                                            <p className="value">
                                                                {
                                                                    props.displayMode === "view" ?
                                                                        person.sexuality :
                                                                        <Field
                                                                            name="sexuality"
                                                                            as="select"
                                                                            value={values.sexuality}
                                                                        >
                                                                            {
                                                                                props.displayMode === "new" &&
                                                                                <option disabled value="0"> -- select an option -- </option>
                                                                            }
                                                                            <option value="straight">Straight</option>
                                                                            <option value="Gay">Gay</option>
                                                                        </Field>
                                                                }
                                                            </p>

                                                        </div>
                                                    </div>
                                                    <div className="infoSeparator" ></div>

                                                    <div className="infoItem gender">
                                                        <Icon type="genders" />
                                                        <div className="infoTexts">
                                                            <h4 className="label">Gender</h4>
                                                            <p className="value">
                                                                {props.displayMode === "view" ?
                                                                    person.gender.label :
                                                                    <Field
                                                                        name="gender"
                                                                        as="select"
                                                                        value={values.genderId}
                                                                    >
                                                                        {
                                                                            props.displayMode === "new" &&
                                                                            <option disabled value="0"> -- select an option -- </option>
                                                                        }
                                                                        <GendersOptions />
                                                                    </Field>
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="infoSeparator" ></div>

                                                    <div className="infoItem position">
                                                        <Icon type="position" />
                                                        <div className="infoTexts">
                                                            <h4 className="label">Position</h4>
                                                            <p className="value">{person ? person.sexPosition : null}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="infoGroup grade">
                                                    <div className="infoItem">
                                                        <div className="infoTexts">
                                                            <h4 className="label">Grade</h4>
                                                        </div>
                                                    </div>
                                                </div>
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