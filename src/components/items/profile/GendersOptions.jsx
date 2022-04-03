import { Fragment, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { ACCESSIBLE_GENDERS_QUERY } from "../../../helpers/queries";


const GendersOptions = () => {
    const { loading, error, data } = useQuery(ACCESSIBLE_GENDERS_QUERY);

    useEffect(() => {
        console.log("coucou Genders Options: ", data);

    })

    return (

        loading ?
            <option disabled value="0">Loading options...</option> :
            error ?
                <option disabled value="0">Error: </option> :
                data ?
                    <Fragment>
                        {
                            data.accessibleGenders.map(gender => (
                                <option
                                    value={gender.id}
                                    key={gender.id}
                                // selected={gender.id === selectedId}
                                >
                                    {gender.label}
                                </option>
                            ))
                        }
                    </Fragment>
                    : <option>Nope</option>
    );
}

export default GendersOptions;