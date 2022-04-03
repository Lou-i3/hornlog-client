import { Fragment } from "react";

import { useQuery } from '@apollo/client';
import { ENUM_VALUES_QUERY } from "../../../helpers/queries";
import { enumLabel } from "../../../helpers";

const SexualityOptions = () => {
    const { loading, error, data } = useQuery(ENUM_VALUES_QUERY, {
        variables: { enumName: "Sexuality" }
    });

    return (
        loading ?
            <option disabled value="0">Loading options...</option> :
            error ?
                <option disabled value="0">Error: </option> :
                data ?
                    <Fragment>
                        <option value=""> -- </option>
                        {
                            data.__type.enumValues.map(sexuality => (
                                <option
                                    value={sexuality.name}
                                    key={sexuality.name}
                                >
                                    {enumLabel(sexuality.name)}
                                </option>
                            ))
                        }
                    </Fragment>
                    : <option>Nope</option>
    );
}

export default SexualityOptions;