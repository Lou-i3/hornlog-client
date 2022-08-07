import Pill from "./Pill";
import { ENUM_VALUES_QUERY } from "../../helpers/queries";
import { useQuery } from "@apollo/client";
import { enumLabel } from "../../helpers/helpers";
import { useEffect, useState } from "react";

const HooksTypesTotals = (props) => {
    const { data, loadingMyHooks } = props;
    const [hooks, setHooks] = useState([]);

    const enumName = "hookType";
    const { loading, error, data: dataEnum } = useQuery(ENUM_VALUES_QUERY, {
        variables: { enumName: enumName.charAt(0).toUpperCase() + enumName.slice(1) }
    });

    useEffect(() => {
        // console.log('usefeect hooks calendar data: ', data);
        if (data) {
            setHooks(data);
        }
    }, [data]);

    const getTotal = (hookType) => {
        let total = 0;
        let tempHooks = hooks.filter((hook) => hook.hookType === hookType);
        total = tempHooks.length;
    
        return total;
    }

    return (
        <div className="hooksTypesTotals">
            {
                loading ?
                    <div>Loading...</div> :
                    error ?
                        <div>Error: {error.message}</div> :
                        dataEnum && dataEnum.__type && dataEnum.__type.enumValues &&
                        dataEnum.__type.enumValues.map(value => (
                            <Pill
                                // selected={values && values[propName] === value.name}
                                // onClick={(e) => handleClickValue(e, value.name)}
                                key={value.name}
                                text={enumLabel(value.name)}
                                className={`${value.name}`}
                                readOnly={true}
                                icon="withNumber"
                                number={getTotal(value.name)}
                                loading={loadingMyHooks}
                            />
                        ))
            }

        </div>
    );
}

export default HooksTypesTotals;