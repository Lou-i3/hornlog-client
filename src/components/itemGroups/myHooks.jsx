
import { gql, useQuery } from '@apollo/client';
import Icon from '../global/Icon';
import PersonName from '../items/PersonName';
// import firebase from 'firebase/app';

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

const MyHooks = (props) => {
    const { loading, error, data } = useQuery(MY_HOOKS_QUERY);
    // console.log("myHooks");
    // console.log(data);

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    const handleClick = (hook) => {
        props.setSelectedHook(hook);
        console.log("handleClick", hook);
    }

    return (
        <div className="myHooks">
            {/* {fireToken && <pstyle="">FireToken: {fireToken}</p>} */}
            {loading ?
                <p>Loading...</p> :
                error ?
                    <p>Error: {error.message}</p> :
                    <div className="hooksList">
                        {
                            data.myHooks.map(hook => (

                                <div className={`hookItem ${props.selectedHook && props.selectedHook.id == hook.id ? "selected" : ""}`} key={hook.id} onClick={() => handleClick(hook)}>
                                    <div className="hookColumn">
                                        <p className="hookDate">{hook.dateTime}</p>
                                        <PersonName />
                                    </div>
                                    <div className="hookColumn">
                                        <div className="hookLocation">
                                            <Icon type="location" />
                                            <p>Lyon, France</p>
                                        </div>
                                    </div>
                                    <div className="hookColumn">
                                        <h4 className="hookType">{hook.hookType}</h4>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

            }
        </div>
    );
}

export default MyHooks;