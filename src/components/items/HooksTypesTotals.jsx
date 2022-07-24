import Pill from "./Pill";
import HookEnumField from "./hooks/HookEnumField";
import { ENUM_VALUES_QUERY } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import { enumLabel } from "../../helpers/helpers";

const HooksTypesTotals = (props) => {

    const enumName = "hookType";
    const { loading, error, data } = useQuery(ENUM_VALUES_QUERY, {
        variables: { enumName: enumName.charAt(0).toUpperCase() + enumName.slice(1) }
    });

    return (
        <div className="hooksTypesTotals">
            {
                loading ?
                    <div>Loading...</div> :
                    error ?
                        <div>Error: {error.message}</div> :
                        data && data.__type && data.__type.enumValues &&
                        data.__type.enumValues.map(value => (
                            <Pill
                                // selected={values && values[propName] === value.name}
                                // onClick={(e) => handleClickValue(e, value.name)}
                                key={value.name}
                                text={enumLabel(value.name)}
                                className={`${value.name}`}
                            />
                        ))
            }

        </div>
    );
}

export default HooksTypesTotals;