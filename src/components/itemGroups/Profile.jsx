
import { Fragment, useEffect, useState } from "react";
import { formatDateTime } from "../../helpers";
import Icon from "../global/Icon";
import { gql, useMutation } from '@apollo/client';
import { Form, Formik, Field } from "formik";
import { MY_PARTNERS_QUERY } from "./myPartners";


const NewPartnerMutation = gql`
    mutation NewPartnerMutation($data: PartnerCreateInput!) {
        addPartner(data: $data) {
         
            id

        }
    }
    `;

const Profile = (props) => {
    const [readOnly, setReadOnly] = useState(props.displayMode === "view");
    const [person, setPerson] = useState(props.person);
    const [mutateFctNewPartner, { dataNewPartner, loadingNewPartner, errorNewPartner }] = useMutation(NewPartnerMutation, { refetchQueries: [{ query: MY_PARTNERS_QUERY }] });

    useEffect(() => {
        setReadOnly(props.displayMode === "view");
        if (props.displayMode === "new") {
            setPerson(null);

        } else {
            setPerson(props.person);
        }

        // document.querySelector("input[name='firstName']").value = ""

    }, [props.displayMode, props.person, props.partner]);

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
            genderId: 24
        }

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

        }
        props.setDisplayMode("view");

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
                    genderId: person ? person.genderId : ""
                } : {
                    firstName: "",
                    lastName: "",
                    nickName: "",
                    genderId: ""
                }}
                onSubmit={(values) => {
                    props.displayMode === "view" ?
                        handleClickEdit(values) :
                        handleClickSave(values);

                }}  >
                {({ handleSubmit, values }) => (
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
                                        <div className="infoGroup note">
                                            <div className="infoItem">
                                                <Icon type="notes" />
                                                <div className="infoTexts">
                                                    <h4 className="label">
                                                        Notes</h4>
                                                    <p className="value">
                                                    </p>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="infoGroup how">
                                            <div className="infoItem">
                                                <Icon type="how" />
                                                <div className="infoTexts">
                                                    <h4 className="label">
                                                        How</h4>
                                                    <p className="value">
                                                        <input type="text" defaultValue={person ? person.how : null} disabled={readOnly} />

                                                    </p>
                                                </div>


                                            </div>
                                        </div>
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
                                                <div className="infoGroup identity">
                                                    <div className="infoItem birthday">
                                                        <Icon type="birthday" />
                                                        <div className="infoTexts">
                                                            <h4 className="label">
                                                                Birthday</h4>
                                                            <p className="value">
                                                                {person ? formatDateTime(person.birthday, 'shortdate') : null}
                                                            </p>
                                                        </div>


                                                    </div>
                                                    <div className="infoSeparator" ></div>
                                                    <div className="infoItem nationality">
                                                        <Icon type="nationality" />
                                                        <div className="infoTexts">
                                                            <h4 className="label">
                                                                Nationality</h4>
                                                            <p className="value">
                                                                {
                                                                    person ? person.nationality : null
                                                                }
                                                            </p>
                                                        </div>


                                                    </div>
                                                </div>
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
                                                        <Icon type="" />
                                                        <div className="infoTexts">
                                                            <h4 className="label">Sexuality</h4>
                                                            <p className="value">{person ? person.sexuality : null}</p>
                                                        </div>
                                                    </div>
                                                    <div className="infoSeparator" ></div>

                                                    <div className="infoItem gender">
                                                        <Icon type="" />
                                                        <div className="infoTexts">
                                                            <h4 className="label">Gender</h4>
                                                            <p className="value">{person ? person.gender.label : null}</p>
                                                        </div>
                                                    </div>
                                                    <div className="infoSeparator" ></div>

                                                    <div className="infoItem position">
                                                        <Icon type="" />
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
                                                <Icon type="" />
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