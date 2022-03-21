
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { formatDateTime } from '../../helpers';
import Icon from '../global/Icon';
import PersonName from '../items/PersonName';
// import firebase from 'firebase/app';

export const MY_PARTNERS_QUERY = gql`
    query MY_PARTNERS_QUERY {
        myPartners {
            id
            person {
                id
                firstName
                lastName
                nickName
                picture
                gender {
                    id
                    label
                }
                birthday
                nationality
                sexuality
                sexPosition
            }
            hooks {
                id
                dateTime
            }
            
        }
    }
`;

const MyPartners = (props) => {
    const { loading, error, data } = useQuery(MY_PARTNERS_QUERY);
    // console.log("myPartners");
    console.log(data);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    const handleClick = (partner) => {
        props.setSelectedPartner(partner);
        props.setDisplayMode("view");
        // console.log("handleClick", partner);
    }

    useEffect(() => {
        console.log("useEffect myPartners");
        // const { loading, error, data } = useQuery(MY_HOOKS_QUERY);

        // console.log(data);
        if (data && props.selectedPartner) {
            if (props.selectedPartner.id in data.myPartners) { console.log("selectedPartner in data.myPartners"); }
        }
    }, [props.selectedPartner, data]);

    return (
        <div className="myPartners">
            {/* {fireToken && <pstyle="">FireToken: {fireToken}</p>} */}
            {loading ?
                <p>Loading...</p> :
                error ?
                console.log(error) &&
                    <p>Error: {error.message}</p> :
                    <table className="list">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Hook</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.myPartners.map(partner => (

                                    <tr className={`listItem ${props.selectedPartner && props.selectedPartner.id === partner.id ? "selected" : ""}`} key={partner.id} onClick={() => handleClick(partner)}>

                                        <td className="listColumn">
                                            <p className="listName">
                                                {
                                                    partner.person.nickName ?
                                                        partner.person.nickName :
                                                        partner.person.firstName + " " + partner.person.lastName
                                                }
                                                </p>
                                        </td>
                                        <td className="listColumn">
                                            <div className="partnerLastHook">
                                                <p className="partnerLastHook">
                                                    {
                                                        partner.hooks[0] ?
                                                            formatDateTime(partner.hooks[0].dateTime, 'date') :
                                                            "Never"
                                                    }
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>

            }
        </div>
    );
}

export default MyPartners;