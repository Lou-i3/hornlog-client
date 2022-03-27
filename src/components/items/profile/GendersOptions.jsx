import { Fragment, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';


const ACCESSIBLE_GENDERS_QUERY = gql`
    query ACCESSIBLE_GENDERS_QUERY {
        accessibleGenders {
            id
            label
        }
    }
    `;


const GendersOptions = (props) => {
    const { loading, error, data } = useQuery(ACCESSIBLE_GENDERS_QUERY);
    const selectedId = props.selectedId

    // loading && return <p>Loading options...</p>


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