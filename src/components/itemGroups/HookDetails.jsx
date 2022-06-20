import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { enumLabel, formatDateTime } from "../../helpers/helpers.js";
import { EditHookMutation, NewHookMutation } from "../../helpers/mutations.js";
import { MY_HOOKS_QUERY, MY_PARTNERS_QUERY } from "../../helpers/queries.js";
import Icon from "../global/Icon";
import ChoicePill from "../items/ChoicePill";
import HookEnumField from "../items/hooks/HookEnumField.jsx";
import HookPartnersField from "../items/hooks/HookPartnersField.jsx";
import StarRating from "../items/StarRating.jsx";

const HookDetails = (props) => {
    const { displayMode, setDisplayMode, setSelectedHook } = props;
    const [readOnly, setReadOnly] = useState(displayMode === "view");
    const [hook, setHook] = useState(props.hook);

    const [mutateFctNewHook] = useMutation(NewHookMutation, { refetchQueries: [{ query: MY_HOOKS_QUERY }, { query: MY_PARTNERS_QUERY }] });
    const [mutateFctEditHook] = useMutation(EditHookMutation, { refetchQueries: [{ query: MY_HOOKS_QUERY }, { query: MY_PARTNERS_QUERY }] });

    useEffect(() => {
        // console.log("useEffect HookDetails");
        // console.log(hook);
        setHook(props.hook);
        setReadOnly(displayMode === "view");

    }, [props.hook, displayMode]);

    let iconType;

    if (props.hook) {
        switch (props.hook.protectionType) {
            case "Protected":
                iconType = "condom"
                break;
            case "Unprotected":
                iconType = "nocondom"
                break;
            case "not_required":
                iconType = "pill"
                break;
            default:
                break;
        }
    }

    const handleClickEdit = (values) => {
        setReadOnly(false);
        setDisplayMode("edit");
        console.log("handleClickEdit, values: ", values);
    }

    const handleClickSave = (values) => {
        console.log("handleClickSave, values: ", values);

        setReadOnly(true);
        setDisplayMode("view");



        let data = {
            hookType: values.hookType,
            // protected: values.protected,
            dateTime: new Date(values.date + "T" + values.time),
        }

        // protected 
        if (values.protected !== "") {
            data.protected = values.protected;
        }

        // partners 
        if (values.partners) {
            let additionalPartners = values.partners.filter(partner => {
                return partner.id !== "new" && hook.partners.filter(hookPartner => {
                    return partner.id === hookPartner.id;
                }).length === 0
            });

            if (additionalPartners && additionalPartners.length > 0) {
                data.additionalPartners = additionalPartners.map(partner => {
                    return {
                        id: parseInt(partner.id),
                    }
                });
            }
            let removedPartners;
            if (hook) {

                removedPartners = hook.partners.filter(partner => {
                    return values.partners.filter(hookPartner => {
                        return partner.id === hookPartner.id;
                    }).length === 0
                });

                if (removedPartners && removedPartners.length > 0) {
                    data.removedPartners = removedPartners.map(partner => {
                        return {
                            id: parseInt(partner.id),
                        }
                    });
                }
            }
            let newPartners = values.partners.filter(partner => {
                return partner.id === "new"
            });

            if (newPartners && newPartners.length > 0) {
                data.newPartners = newPartners.map(partner => {
                    return {
                        nickName: partner.name,
                    }
                });
            }

            console.log("values for partners");
            console.log("additionalPartners: ", additionalPartners);
            console.log("removedPartners: ", removedPartners);
            console.log("newPartners: ", newPartners);

            // if ( hook.partners.includes(values.partners) ) 
        }



        setDisplayMode("loading");

        if (props.displayMode === "new") {
            mutateFctNewHook({
                variables: {
                    data: data
                }
            }).then(res => {
                console.log(res);
                setSelectedHook(res.data.addPartner);
                setDisplayMode("view");

            }).catch(err => {
                console.log(err);
            });
        } else if (props.displayMode === "edit") {
            data.id = parseInt(hook.id);
            console.log("edit data: ", data);
            mutateFctEditHook({
                variables: {
                    data: data
                }
            }).then(res => {
                console.log(res);
                // props.setSelectedPartner(res.data.editPartner);
                setSelectedHook(props.hook)
                setDisplayMode("view");
            }).catch(err => {
                console.log(err);
            });

        }

        console.log(data);

    }

    return (
        (hook || displayMode === "new") &&
        <div className="hookDetails">
            <Formik
                enableReinitialize
                initialValues={hook ? {
                    dateTime: hook.dateTime,
                    date: formatDateTime(hook.dateTime, "techdate"),
                    time: formatDateTime(hook.dateTime, "techtime"),
                    hookType: hook.hookType,
                    protected: hook.protected,
                    note: hook.note ? hook.note : "",
                    partners: hook.partners ?
                        hook.partners.map((partner, index) => ({
                            id: partner.id,
                            name: partner.person.nickName ?
                                partner.person.nickName :
                                partner.person.firstName + " " + partner.person.lastName,
                            picture: partner.person.picture,
                        })) :
                        [],
                } : {
                    dateTime: "",
                    date: "",
                    time: "",
                    hookType: "",
                    protected: "",
                    note: "",
                    partners: [],
                }}
                onSubmit={(values) => {
                    displayMode === "view" ?
                        handleClickEdit(values) :
                        handleClickSave(values);

                }}  >
                {({ handleSubmit, values, setValues }) => (
                    // console.log("form values: ", values),
                    <Form>
                        <div className="title">
                            {
                                displayMode === "new" ?
                                    <h2>New Hook</h2> :
                                    displayMode === "edit" ?
                                        <h2>Edit Hook</h2> :
                                        <h2 className="date">
                                            {formatDateTime(values.dateTime, 'longdate').split(",")[0]},
                                            <br />
                                            {formatDateTime(values.dateTime, 'longdate').split(",")[1]}
                                        </h2>
                            }
                            <div className="icones">
                                {
                                    displayMode !== "new" &&
                                    <Field as="span" onClick={handleSubmit}>
                                        <Icon type="apple" />
                                    </Field>
                                }
                                <Field as="span" onClick={handleSubmit}>
                                    {displayMode === "view" && <Icon type="edit" />}
                                    {["edit", "new"].includes(displayMode) && <Icon type="save" />}
                                </Field>
                                {
                                    displayMode !== "new" &&
                                    <Field as="span" onClick={handleSubmit}>
                                        <Icon type="archive" />
                                    </Field>
                                }
                            </div>
                        </div>

                        <div className="info">
                            <div className="infoItemWrapper">
                                <div className="infoItem dateTime">
                                    {
                                        ["edit", "new"].includes(displayMode) &&
                                        <Fragment>
                                            <p>On</p>
                                        <Field
                                            type="date"
                                            name="date"
                                            key={"date" + (readOnly ? "readonly" : "active") + (hook && hook.date)}
                                            className="form-control"
                                            // placeholder="Nickname"
                                            disabled={readOnly}
                                            value={formatDateTime(values.date, 'techdate')}
                                        />
                                        </Fragment>

                                    }
                                    <p>at</p>
                                    {
                                        displayMode === "view" ?
                                            <p><b>{formatDateTime(hook.dateTime, 'time')}</b></p> :
                                            <Field
                                                name="time"
                                                type="time"
                                                key={"time" + (readOnly ? "readonly" : "active") + (hook && hook.time)}
                                                className="form-control"
                                                // placeholder="Nickname"
                                                disabled={readOnly}
                                                value={formatDateTime(values.time, 'techtime')}

                                            />


                                    }
                                </div>

                                <div className="infoItem">
                                    {
                                        ["edit", "new"].includes(displayMode) ?
                                            <HookEnumField
                                                setValues={setValues}
                                                values={values}
                                                enumName="hookType"
                                            /> :
                                            <ChoicePill text={hook && enumLabel(hook.hookType)} selected={true} />

                                    }
                                </div>
                                <div className="infoItem with">
                                    <HookPartnersField
                                        values={values}
                                        displayMode={displayMode}
                                        readOnly={readOnly}
                                        setValues={setValues}

                                    />
                                    {/* <div className="partnerItem">
                                        <PictureAndName partner={hook && hook.partners[0]} />
                                    </div> */}
                                </div>

                                <div className="infoItem">
                                    <p> at</p>
                                    {
                                        ["edit", "new"].includes(displayMode) ?
                                            <HookEnumField
                                                setValues={setValues}
                                                values={values}
                                                enumName="locationType"
                                            /> :
                                            <ChoicePill text={hook && enumLabel(hook.locationType)} selected={true} />

                                    }
                                </div>

                                <div className="infoItem">
                                    <Icon type="location" />
                                    {/* <p>{hook.location}</p> */}
                                </div>

                                <div className="infoItem">
                                    {/* <p>Protection Type</p> */}
                                    {
                                        ["edit", "new"].includes(displayMode) ?
                                            <HookEnumField
                                                setValues={setValues}
                                                values={values}
                                                enumName="protectionType"
                                            /> :
                                            hook && hook.protected &&
                                            <ChoicePill text={hook && enumLabel(hook.protected)} selected={true} />



                                    }
                                </div>
                                <div className="infoItem">
                                    <Icon type="mood" />
                                    <p>{hook && hook.mood}</p>
                                </div>
                                <div className="infoItem">
                                    <p>Grade</p>
                                    <StarRating />
                                </div>
                                <div className="infoItem">
                                    <Icon type="duration" />
                                    <p>{hook && hook.duration}</p>
                                </div>
                                <div className="infoItem">
                                    <p>Notes</p>
                                    {
                                        displayMode === "view" ?
                                            <p>{hook && hook.note}</p> :
                                            <Field
                                                name="note"
                                                type="textarea"
                                                as="textarea"
                                                rows="3"
                                                key={"note" + (readOnly ? "readonly" : "active") + (hook && hook.note)}
                                                className="form-control"
                                                placeholder="Something to say?"
                                                disabled={readOnly}
                                                value={values.note}

                                            />
                                    }
                                </div>
                            </div>
                        </div>
                    </Form>

                )}
            </Formik>

        </div >
    );

}

export default HookDetails;