import { Field } from "formik";

const ProfileTextField = (props) => {
    const { readOnly, values } = props;
    return ( 
        <Field
        name="firstName"
        type="text"
        key={(readOnly ? "readonly" : "active") + (person && person.firstName)}
        className="form-control"
        placeholder="First Name"
        disabled={readOnly}
        value={values.firstName} 
    />
    );
}
 
export default ProfileTextField;