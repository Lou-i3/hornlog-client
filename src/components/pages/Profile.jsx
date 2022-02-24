import React from "react";
// import { getCurrentUser } from "../../services/auth.service";

const Profile = (props) => {
  // const currentUser = getCurrentUser();

  return (
    <div className="content-inner">
      {props.user && (
        <div>
          <header className="jumbotron">
            <h3>
              {/* <strong>{props.user.username}</strong> Profile */}
            </h3>
          </header>
          <p>
            <strong>Token:</strong>
          </p>
          {/* <p style={{ wordWrap: 'break-word' }}>{currentUser.accessToken}</p> */}
          <p>
            <strong>Refresh Token:</strong>
          </p>
          {/* <p style={{ wordWrap: 'break-word' }}>{currentUser.refreshToken}</p> */}
          <p>
            {/* <strong>Id:</strong> {currentUser.id} */}
          </p>
          <p>
            <strong>Email:</strong> {props.user.email}
          </p>
          <strong>Authorities:</strong>
          {/* <ul>
            {currentUser.roles &&
              currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
          </ul> */}
        </div>
      )}

    </div>
  );
};

export default Profile;