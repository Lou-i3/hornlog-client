import { gql, useQuery } from '@apollo/client';
import { formatDateTime } from '../../helpers/helpers';
import Icon from '../global/Icon';
import Loader from '../items/Loader';

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY {
        allUsers {
            id
            email
            role
            lastLoginAt
        }
    }
`;

const AllUsers = () => {
    const { loading, error, data } = useQuery(ALL_USERS_QUERY);

    if (loading) return <Loader size="mini" />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="settingsBlock">
            <div className="settingsBlockHeader">
                <div className="title">
                    <Icon type="user" />

                    <p>All Users</p>

                </div>
                {/* <Icon type="edit" /> */}

            </div>

            <div className="allUsers">
                <table>
                    <thead>
                        <tr>
                            <th><h3>Email</h3></th>
                            <th><h3>Last Activity</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.allUsers.map(user => (
                                <tr key={user.id}>
                                    {/* <td>{user.id}</td> */}
                                    {/* <td>{user.username}</td> */}
                                    {/* <td>{user.displayName}</td> */}
                                    <td className='listColumn'>{user.email}</td>
                                    <td>{formatDateTime(user.lastLoginAt, 'shortdate')}</td>
                                    {/* <td>{user.role}</td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllUsers;