import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { enumLabel, formatDateTime } from "../../helpers/helpers.js";
import { DeleteHookMutation, EditHookMutation, NewHookMutation } from "../../helpers/mutations.js";
import { MY_HOOKS_QUERY, MY_PARTNERS_QUERY } from "../../helpers/queries.js";
import Icon from "../global/Icon";
import DurationField from "../items/hooks/DurationField.jsx";
import HookEnumField from "../items/hooks/HookEnumField.jsx";
import HookPartnersField from "../items/hooks/HookPartnersField.jsx";
import MoodPicker from "../items/MoodPicker.jsx";
import Pill from "../items/Pill.jsx";
import StarRating from "../items/StarRating.jsx";

const HookDetails = (props) => {
    const { displayMode, setDisplayMode, setSelectedHook } = props;
    const [readOnly, setReadOnly] = useState(displayMode === "view");
    const [hook, setHook] = useState(props.hook);

    const [mutateFctNewHook] = useMutation(NewHookMutation, { refetchQueries: [{ query: MY_HOOKS_QUERY }, { query: MY_PARTNERS_QUERY }] });
    const [mutateFctEditHook] = useMutation(EditHookMutation, { refetchQueries: [{ query: MY_HOOKS_QUERY }, { query: MY_PARTNERS_QUERY }] });
    const [mutateFctDeleteHook] = useMutation(DeleteHookMutation, { refetchQueries: [{ query: MY_HOOKS_QUERY }, { query: MY_PARTNERS_QUERY }] });

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
            dateTime: new Date(new Date(values.date + "T" + values.time +"Z") - 120*60*1000),
            note: values.note,
            sex: values.sex,
            penetration: values.penetration,
            orgasm: values.orgasm,
            protection: values.protection,
            porn: values.porn,
            pill: values.pill,
        }

        
        if (values.mood !== "") {
            data.mood = values.mood;
        }
        if (values.grade !== "") {
            data.grade = values.grade;
        }
        if (values.duration !== "") {
            data.duration = parseInt(values.duration);
        }

        // partners 
        if (values.partners) {
            let additionalPartners = values.partners.filter(partner => {
                return partner.id !== "new" && hook ? hook.partners.filter(hookPartner => {
                    return partner.id === hookPartner.id;
                }).length === 0 : true;
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

    const handleClickDelete = () => {

        const idToDelete = parseInt(hook.id);
        console.log("idToDelete: ", idToDelete);
        mutateFctDeleteHook({
            variables: {
                id: idToDelete
            }
        }).then(res => {
            console.log(res);
            props.setSelectedHook(null);
            props.setDisplayMode("none");

        }).catch(err => {
            console.log(err);
        });
    }
    const getBoolVal = (val) => {
        return val !== undefined ? val : null;
    }

    return (
        (hook || displayMode === "new") &&
        <div className={`hookDetails ${displayMode}`}>
            <Formik
                enableReinitialize
                initialValues={hook ? {
                    dateTime: hook.dateTime,
                    date: formatDateTime(hook.dateTime, "techdatefromDtb"),
                    time: formatDateTime(hook.dateTime, "techtimefromDtb"),
                    duration: hook.duration ? hook.duration : 0,
                    hookType: hook.hookType,
                    location: hook.location ? hook.location : "",
                    mood: hook.mood ? hook.mood : "",
                    grade: hook.grade ? hook.grade : "",
                    sex: getBoolVal(hook.sex),
                    penetration: getBoolVal(hook.penetration),
                    orgasm: getBoolVal(hook.orgasm),
                    protection: getBoolVal(hook.protection),
                    porn: getBoolVal(hook.porn),
                    pill: getBoolVal(hook.pill),
                    note: hook.note ? hook.note : "",
                    partners: hook.partners ?
                        hook.partners.map((partner, index) => ({
                            id: partner.id,
                            name: partner.person.nickName ?
                                partner.person.nickName :
                                partner.person.firstName + " " + partner.person.lastName,
                            picture: partner.person.picture,
                            partner: partner,
                        })) :
                        [],
                } : {
                    dateTime: "",
                    date: formatDateTime(new Date(), "techdate"),
                    time: formatDateTime(new Date(), "techtime"),
                    duration: 0,
                    hookType: "",
                    location: "",
                    mood: "",
                    grade: "",
                    sex: null,
                    penetration: null,
                    orgasm: null,
                    protection: null,
                    porn: null,
                    pill: null,
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
                            <span className="mobileBack">
                                <Icon type="arrowLeft" className="mobileBack" onClick={() => {
                                    props.setSelectedHook(null);
                                    props.setDisplayMode("none");
                                }} />
                            </span>
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
                                    displayMode === "edit" &&
                                    <>
                                        <Field as="span" onClick={() => { }}>
                                            <Icon type="apple" />
                                        </Field>
                                        <Field as="span" onClick={() => {
                                            handleClickDelete();
                                            props.setSelectedHook(null);
                                            props.setDisplayMode("none");
                                        }}>
                                            <Icon type="bin" />
                                        </Field>
                                    </>
                                }
                                <Field as="span" onClick={handleSubmit}>
                                    {displayMode === "view" && <Icon type="edit" />}
                                    {["edit", "new"].includes(displayMode) && <Icon type="save" />}
                                </Field>

                            </div>
                        </div>

                        <div className="info">
                            <div className="infoItemWrapper">
                                <div className={`hookDetailsFirstGroupWrapper ${["edit", "new"].includes(displayMode) ? 'edit' : 'view'}`}>
                                    <div className="infoItem dateTime">
                                        {
                                            ["edit", "new"].includes(displayMode) &&
                                            <Fragment>
                                                <h3>On</h3>
                                                <Field
                                                    type="date"
                                                    name="date"
                                                    key={"date" + (readOnly ? "readonly" : "active") + (hook && hook.date)}
                                                    className="form-control"
                                                    placeholder="2022-06-21"
                                                    disabled={readOnly}
                                                    value={values.date}
                                                />
                                            </Fragment>

                                        }
                                        <h3>at</h3>
                                        {
                                            displayMode === "view" ?
                                                <p style={{ fontSize: '15px' }}><b>{formatDateTime(hook.dateTime, 'time')}</b></p> :
                                                <Field
                                                    name="time"
                                                    type="time"
                                                    key={"time" + (readOnly ? "readonly" : "active") + (hook && hook.time)}
                                                    className="form-control"
                                                    // placeholder="Nickname"
                                                    disabled={readOnly}
                                                    value={values.time}

                                                />


                                        }
                                    </div>


                                    <div className="infoItem">
                                        {
                                            /* Hook Type
                                            */
                                            ["edit", "new"].includes(displayMode) ?
                                                <HookEnumField
                                                    setValues={setValues}
                                                    values={values}
                                                    enumName="hookType"
                                                /> :
                                                <Pill
                                                    text={hook && enumLabel(hook.hookType)}
                                                    selected
                                                />

                                        }
                                    </div>
                                </div>

                                {
                                    /* Duration
                                     */
                                    (values.duration !== 0 || props.displayMode !== "view") &&
                                    <div className="infoItem">
                                        <h3>for</h3>
                                        {
                                            <DurationField
                                                values={values}
                                                setValues={setValues}
                                                readOnly={readOnly}
                                            />
                                        }
                                    </div>
                                }

                                {
                                    /* With (Partners)
                                    */
                                    (values.partners.length > 0 || displayMode !== "view") &&
                                    <div className="infoItem with">
                                        <HookPartnersField
                                            values={values}
                                            displayMode={displayMode}
                                            readOnly={readOnly}
                                            setValues={setValues}

                                        />
                                    </div>
                                }

                                {
                                    /* Location
                                    */
                                    (values.location !== "" || props.displayMode !== "view") &&
                                    <div className="hooksDetailsLocationGroup">
                                        <div className="infoItem">
                                            <h3> at</h3>
                                            {
                                                ["edit", "new"].includes(displayMode) ?
                                                    <HookEnumField
                                                        setValues={setValues}
                                                        values={values}
                                                        enumName="locationType"
                                                    /> :
                                                    <Pill
                                                        text={hook && enumLabel(hook.locationType)}
                                                        selected
                                                    />

                                            }
                                        </div>

                                        <div className="infoItem location">
                                            <Icon type="location" />
                                            {/* <p>{hook.location}</p> */}
                                        </div>
                                    </div>
                                }

                                <div className="infoGroup bools">
                                    {
                                        /* Sex
                                        */
                                        (values.sex !== null || props.displayMode !== "view") &&
                                        <div className="infoItem sex">
                                            <Pill
                                                values={values}
                                                setValues={setValues}
                                                type="sex"
                                                icon
                                                readOnly={readOnly}
                                            />
                                        </div>
                                    }
                                    {
                                        /* Penetration
                                        */
                                        (values.penetration !== null || props.displayMode !== "view") &&
                                        <div className="infoItem penetration">
                                            <Pill
                                                values={values}
                                                setValues={setValues}
                                                type="penetration"
                                                icon
                                                readOnly={readOnly}
                                            />
                                        </div>
                                    }
                                    {
                                        /* Orgasm
                                        */
                                        (values.orgasm !== null || props.displayMode !== "view") &&
                                        <div className="infoItem orgasm">
                                            <Pill
                                                values={values}
                                                setValues={setValues}
                                                type="orgasm"
                                                icon
                                                readOnly={readOnly}
                                            />
                                        </div>
                                    }
                                    {
                                        /* Protection
                                        */
                                        (values.protection !== null || props.displayMode !== "view") &&
                                        <div className="infoItem protection">
                                            <Pill
                                                values={values}
                                                setValues={setValues}
                                                type="protection"
                                                icon
                                                readOnly={readOnly}
                                            />
                                        </div>
                                    }
                                    {
                                        /* Porn
                                        */
                                        (values.porn !== null || props.displayMode !== "view") &&
                                        <div className="infoItem porn">
                                            <Pill
                                                values={values}
                                                setValues={setValues}
                                                type="porn"
                                                icon
                                                readOnly={readOnly}
                                            />
                                        </div>
                                    }
                                    {
                                        /* Pill 
                                        */
                                        (values.pill !== null || props.displayMode !== "view") &&
                                        <div className="infoItem pill">
                                            <Pill
                                                values={values}
                                                setValues={setValues}
                                                type="pill"
                                                icon
                                                readOnly={readOnly}
                                            />
                                        </div>
                                    }
                                </div>

                                {
                                    /* Mood or Grade
                                    */
                                    (values.mood !== "" || values.grade !== "" || props.displayMode !== "view") &&
                                    <div className="infoGroup">
                                        {
                                            /* Mood
                                            */
                                            (values.mood !== "" || props.displayMode !== "view") &&
                                            <div className="infoItem mood">
                                                <div className="infoText">
                                                    <h3>Mood</h3>
                                                </div>
                                                <MoodPicker
                                                    displayMode={displayMode}
                                                    readOnly={readOnly}
                                                    setValues={setValues}
                                                    values={values}
                                                />
                                            </div>
                                        }
                                        {
                                            /* Grade
                                            */
                                            (values.grade !== "" || props.displayMode !== "view") &&
                                            <div className="infoItem grade">
                                                <h3>Grade</h3>
                                                <StarRating
                                                    displayMode={displayMode}
                                                    setValues={setValues}
                                                    values={values}
                                                    name="grade"
                                                    readOnly={readOnly}

                                                />

                                            </div>
                                        }
                                    </div>
                                }

                                {
                                    /* Notes
                                    */
                                    (values.note !== "" || props.displayMode !== "view") &&
                                    <div className="infoItem note">
                                        <h3>Notes</h3>
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
                                }
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </div >
    );

}

export default HookDetails;