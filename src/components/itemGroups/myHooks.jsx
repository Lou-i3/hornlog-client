
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { formatDateTime } from '../../helpers';
import Icon from '../global/Icon';
import PictureAndName from '../items/profile/PictureAndName';
import HookDetails from './HookDetails';
// import firebase from 'firebase/app';

export const MY_HOOKS_QUERY = gql`
    query MY_HOOKS_QUERY {
        myHooks {
            id
            createdAt
            updatedAt
            hookType
            dateTime
            duration
            orgasm
            porn
            note
            grade
            protectionType
            addToAppleHealth
            mood
            archived
            partners {
                id
                person {
                    id
                    firstName
                    lastName
                    nickName
                    picture
                }
            }
            
        }
    }
`;

const MyHooks = (props) => {
    const { loading, error, data } = useQuery(MY_HOOKS_QUERY);
    // console.log("myHooks");
    // console.log(data);

    const handleClick = (hook) => {
        props.setSelectedHook(hook);
        // console.log("handleClick", hook);
    }

    useEffect(() => {
        console.log("useEffect myHooks");
        // const { loading, error, data } = useQuery(MY_HOOKS_QUERY);

        // console.log(data);
        if (data && props.selectedHook) {
            if (props.selectedHook.id in data.myHooks) { console.log("selectedHook in data.myHooks"); }
        }
    }, [props.selectedHook, data]);

    return (
        <div className="myHooks">
            {/* {fireToken && <pstyle="">FireToken: {fireToken}</p>} */}
            {loading ?
                <p>Loading...</p> :
                error ?
                    <p>Error: {error.message}{console.log(error)}</p> :
                    <table className="list">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Who</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.myHooks.map(hook => (

                                    <tr className={`listItem ${props.selectedHook && props.selectedHook.id === hook.id ? "selected" : ""}`} key={hook.id} onClick={() => handleClick(hook)}>

                                        <td className="listColumn">
                                            <p className="hookDate">{formatDateTime(hook.dateTime, 'date')}</p>
                                        </td>
                                        <td className="listColumn">
                                            <div className="hookLocation">
                                                {
                                                    hook.partners[0] &&
                                                    <PictureAndName
                                                        partner={hook.partners[0]}
                                                    />
                                                }


                                            </div>
                                        </td>
                                        <td className="listColumn">
                                            <h4 className="hookType">{hook.hookType}</h4>
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

export default MyHooks;