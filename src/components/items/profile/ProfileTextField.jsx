import { Field } from "formik";

const ProfileTextField = (props) => {
    const { readOnly, values } = props;
    return (
        <Field
            name="nickName"
            type="text"
            key={"nickName" + (readOnly ? "readonly" : "active") + (person && person.nickName)}
            className="form-control"
            placeholder="Nickname"
            disabled={readOnly}
            value={values.nickName}

        />
    );
}

export default ProfileTextField;