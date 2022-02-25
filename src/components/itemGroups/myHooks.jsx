
import { gql, useQuery } from '@apollo/client';
// import firebase from 'firebase/app';
// import { useState } from 'react';

const MY_HOOKS_QUERY = gql`
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
            
        }
    }
`;

const MyHooks = () => {
    const { loading, error, data } = useQuery(MY_HOOKS_QUERY);
    // const [fireToken, setFireToken] = useState('');
    console.log("myHooks");
    console.log(data);

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    // const user = firebase.auth().currentUser;
    // // let fireToken = null;
    // if (user) {
    //     user.getIdToken().then((token) => (
    //         setFireToken(token)
    //     ));
    //     // console.log('fire token', fireToken);
    // }
    return (
        <div className="myHooks">
            {/* {fireToken && <pstyle="">FireToken: {fireToken}</p>} */}
            {error ? <p>Error: {error.message}</p> :
                <table>
                    <thead>
                        <th>id</th>
                        <th>hookType</th>
                        <th>dateTime</th>
                        <th>orgasm</th>
                        <th>mood</th>
                    </thead>
                    <tbody>
                        {
                            data.myHooks.map(hook => (
                                <tr key={hook.id}>
                                    <td>{hook.id}</td>
                                    <td>{hook.hookType}</td>
                                    <td>{hook.dateTime}</td>
                                    <td>{hook.orgasm ? "Yes" : "No"}</td>
                                    <td>{hook.mood}</td>
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