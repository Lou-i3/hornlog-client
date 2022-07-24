import { useQuery } from "@apollo/client";
import { enumLabel } from "../../../helpers/helpers";
import { ENUM_VALUES_QUERY } from "../../../helpers/queries";
import Pill from "../Pill";


const HookEnumField = (props) => {
    const { setValues, values, enumName } = props;

    const { loading, error, data } = useQuery(ENUM_VALUES_QUERY, {
        variables: { enumName: enumName.charAt(0).toUpperCase() + enumName.slice(1) }
    });

    const propName = enumName === "protectionType" ? "protected" : enumName;

    const handleClickValue = (e, value) => {
        console.log("click value: ", value);

        let newValues = values;
        if (values[propName] === value && propName !== "hookType") {
            newValues[propName] = "";
        } else {
            newValues[propName] = value;
        }
        setValues(newValues)
    }

    return (
        loading ?
            <div>Loading...</div> :
            error ?
                <div>Error: {error.message}</div> :
                data && data.__type && data.__type.enumValues &&
                <div className={`hookEnumField ${propName}`}>
                    {
                        data.__type.enumValues.map(value => (
                            <Pill
                                selected={values && values[propName] === value.name}
                                onClick={(e) => handleClickValue(e, value.name)}
                                key={value.name}
                                text={enumLabel(value.name)}
                            />
                        ))
                    }
                </div>
    );
}

export default HookEnumField;