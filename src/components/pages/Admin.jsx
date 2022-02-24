import AllUsers from "../itemGroups/allUsers";


const Admin = () => {

    return (
        <div className="content-inner">
            <div className="admin-page">

                <h1>Admin</h1>

                <h2>All Users</h2>
                <AllUsers />

            </div>
        </div>
    );
}

export default Admin;