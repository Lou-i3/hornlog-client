import { Fragment } from "react";

import { useQuery } from '@apollo/client';
import { ENUM_VALUES_QUERY } from "../../../helpers/queries";
import { enumLabel } from "../../../helpers";

const PositionOptions = () => {
    const { loading, error, data } = useQuery(ENUM_VALUES_QUERY, {
        variables: { enumName: "SexPosition" }
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
                            data.__type.enumValues.map(position => (
                                <option
                                    value={position.name}
                                    key={position.name}
                                >
                                    {enumLabel(position.name)}
                                </option>
                            ))
                        }
                    </Fragment>
                    : <option>Nope</option>
    );
}

export default PositionOptions;