import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../helpers/helpers.js";
import Icon from "../global/Icon";
import ChoicePill from "../items/ChoicePill";
import PictureAndName from "../items/profile/PictureAndName.jsx";

const HookDetails = (props) => {
    const { displayMode, setDisplayMode } = props;
    const [readOnly, setReadOnly] = useState(displayMode === "view");
    const [hook, setHook] = useState(props.hook);

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
    }

    const handleClickSave = (values) => {
        setReadOnly(true);
        setDisplayMode("view");
    }

    return (
        (hook || displayMode === "new") &&
        <div className="hookDetails">
            <Formik
                enableReinitialize
                initialValues={hook ? {
                    date: formatDateTime(hook.date, 'dateTime'),
                } : {
                    date: "",
                }}
                onSubmit={(values) => {
                    displayMode === "view" ?
                        handleClickEdit(values) :
                        handleClickSave(values);

                }}  >
                {({ handleSubmit, values }) => (
                    // console.log("form values: ", values),
                    <Form>
                        <div className="title">
                            <h2 className="date">{formatDateTime(hook.date, 'longdate')}</h2>
                            <div className="icones">
                                <Icon type="apple" />
                                <Field as="span" onClick={handleSubmit}>
                                    {displayMode === "view" && <Icon type="edit" />}
                                    {["edit", "new"].includes(displayMode) && <Icon type="save" />}
                                </Field>
                                <Icon type="archive" />
                            </div>
                        </div>

                        <div className="info">
                            <div className="infoItem">
                                <p>at</p>
                                <p><b>{formatDateTime(hook.date, 'time')}</b></p>
                            </div>
                            <ChoicePill text={hook.hookType} selected={true} />

                            <div className="infoItem">
                                <p> with</p>
                                <div className="partnerItem">
                                    {/* <img src="/Ellipse 4.png" alt="" className="profile-pic" /> */}
                                    {/* <p>{hook.partner}</p> */}
                                    <PictureAndName partner={hook.partners[0]} />
                                </div>
                                <p> at</p>
                                <div className="location">
                                    <p>{hook.locationType}</p>
                                </div>
                            </div>

                            <div className="infoItem">
                                <Icon type="location" />
                                {/* <p>{hook.location}</p> */}
                            </div>
                            <div className="infoItem">
                                <p>Protection Type</p>
                                <Icon type={iconType} />
                            </div>
                            <div className="infoItem">
                                <Icon type="mood" />
                                <p>{hook.mood}</p>
                            </div>
                            <div className="infoItem">
                                <p>Grade</p>
                                <div className="icones">
                                    <Icon type="star" />
                                    <Icon type="star" />
                                    <Icon type="star" />
                                    <Icon type="star" />
                                    <Icon type="star" />
                                </div>
                            </div>
                            <div className="infoItem">
                                <Icon type="duration" />
                                <p>{hook.duration}</p>
                            </div>
                            <div className="infoItem">
                                <p>Notes</p>
                                <p>{hook.note}</p>
                            </div>
                        </div>
                    </Form>

                )}
            </Formik>

        </div>
    );

}

export default HookDetails;