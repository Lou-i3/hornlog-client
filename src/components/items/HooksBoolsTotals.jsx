
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Pill from "./Pill";

const HooksBoolsTotals = (props) => {
    const { data: hooks, loading } = props;

    // const [hooks, setHooks] = useState([]);

    // useEffect(() => {
    //     if (data) {
    //         setHooks(data);
    //     }
    // }, [data]);

    useEffect(() => {
        console.log("hooksBooksTotal, loading: ", loading);
    }, [loading]);

    let values = {
        penetration: true,
        sex: true,
    }

    const getTotalItem = (type) => {

        let typeHooks = hooks.filter(hook => hook[type] === true);
        let typeTotal = typeHooks.length;

        // console.log(">> type", type);
        // console.log("typeTotal", typeTotal);
        // console.log("typeHooks", typeHooks);
        // console.log("hooks", hooks);

        return (
            <div className="totalItem">
                <Pill
                    type={type}
                    icon='iconOnly'
                    values={values}
                    loading={loading}
                />
                {typeTotal}
            </div>
        )
    }

    return (
        <div className="hooksBoolsTotals">
            {
                loading ?
                    <Loader type="mini" /> :
                    <>
                        {
                            getTotalItem('sex')
                        }
                        {
                            getTotalItem('penetration')
                        }
                    </>
            }

        </div>
    );
}

export default HooksBoolsTotals;