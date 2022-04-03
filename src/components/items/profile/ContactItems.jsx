import { Field, FieldArray } from "formik";
import { Fragment } from "react";
import Icon from "../../global/Icon";

const ContactItems = (props) => {
    const { type, displayMode, values, readOnly } = props;

    const fieldName = `contactInfos${type}`;

    const iconForType = (type) => {
        switch (type) {
            case "Email":
                return "email";
            case "Phone":
                return "phone";
            case "social_media":
                return type.designation;
            default:
                return type;
        }
    }

    const handleClickNew = (arrayHelpers) => {
 
        arrayHelpers.push({
            id: null,
            type: type,
            info: "",
            designation: "",
        });

    }

    return (

        <FieldArray
            name={fieldName}
            render={arrayHelpers => (
                <Fragment>

                    {
                        values[fieldName].map((item, index) => (
                            item.type === type ?
                                <Fragment key={index}>
                                    {
                                        index !== 0 && <div className="infoSeparator" ></div>
                                    }
                                    <div className="infoItem" key={index}>
                                        <Icon type={iconForType(type)} />

                                        <div className="infoTexts">
                                            {
                                                displayMode === "view" ?
                                                    <Fragment>
                                                        <h4>{item.designation}</h4>
                                                        <p>{item.info}</p>
                                                    </Fragment>
                                                    :
                                                    <Fragment>
                                                        <Field
                                                            name={`${fieldName}[${index}].designation`}
                                                            type="text"
                                                            key={fieldName + "designation" + (readOnly ? "readonly" : "active") + index}
                                                            className="form-control"
                                                            placeholder="Designation"
                                                            disabled={readOnly}
                                                        // value={values.nickName}

                                                        />
                                                        <Field
                                                            name={`${fieldName}[${index}].info`}
                                                            type="text"
                                                            key={fieldName + "info" + (readOnly ? "readonly" : "active") + index}
                                                            className="form-control"
                                                            placeholder="xxx"
                                                            disabled={readOnly}
                                                        // value={values.nickName}

                                                        />
                                                    </Fragment>
                                            }

                                        </div>
                                        <Icon type="bin" onClick={() => arrayHelpers.remove(index)} />
                                    </div>
                                </Fragment>
                                : null
                        ))
                    }

                    {
                        displayMode !== "view" &&
                        <Fragment>
                            { values[fieldName].length > 0 && <div className="infoSeparator" ></div> }

                            <div className="new" onClick={() => handleClickNew(arrayHelpers)}>
                                <p>New</p>
                                <Icon type="plus" />
                            </div>
                        </Fragment>
                    }
                </Fragment>)}
        />

    );
}

export default ContactItems;