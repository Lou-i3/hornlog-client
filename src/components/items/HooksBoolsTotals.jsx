
import { useEffect, useState } from "react";
import Pill from "./Pill";

const HooksBoolsTotals = (props) => {
    const { data:hooks } = props;

    // const [hooks, setHooks] = useState([]);

    // useEffect(() => {
    //     if (data) {
    //         setHooks(data);
    //     }
    // }, [data]);

    let values = {
        penetration: true, 
        sex: true,
    }

    const getTotalItem = (type) => {

        let typeHooks = hooks.filter( hook => hook[type] === true );
        let typeTotal = typeHooks.length; 

        console.log("type", type);
        console.log("typeTotal", typeTotal);
        console.log("typeHooks", typeHooks);
        console.log("hooks", hooks);

        return (
            <div className="totalItem">
                <Pill
                    type={type}
                    icon='iconOnly'
                    values={values}
                />
                { typeTotal }
            </div>
        )
    }

    return (
        <div className="hooksBoolsTotals">
            {
                getTotalItem('sex')
            }
            {
                getTotalItem('penetration')
            }
        </div>
    );
}

export default HooksBoolsTotals;