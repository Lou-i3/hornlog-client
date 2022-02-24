import { gql, useQuery } from '@apollo/client';

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY {
        allUsers {
            id
            username
            displayName
            email
            role
            createdAt
            updatedAt
            
        }
    }
`;

const AllUsers = () => {
    const { loading, error, data } = useQuery(ALL_USERS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="allUsers">
            <table>
                <thead>
                    <th>id</th>
                    <th>username</th>
                    <th>displayName</th>
                    <th>email</th>
                    <th>role</th>
                </thead>
                <tbody>
                {
                    data.allUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.displayName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default AllUsers;