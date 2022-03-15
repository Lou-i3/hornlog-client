import React from "react";
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { formatDateTime } from "../../helpers";

// import { useState } from 'react';

const ME_QUERY = gql`
    query ME_QUERY {
        me {
            id
            createdAt
            updatedAt
            displayName
            username
            email
            role
            
        }
    }
`;
const Profile = (props) => {
  // const currentUser = getCurrentUser();
  const { loading, error, data } = useQuery(ME_QUERY);
  const [me, setMe] = useState(null);

  useEffect(() => {
    console.log("profile useEffet");
    if (data) {
      setMe({
        displayName: data.me.displayName,
        username: data.me.username,
        email: data.me.email,
        role: data.me.role,
        since: data.me.createdAt
      })
    }
  },
    [data]
  );

  return (
    <div className="content-inner">
      {loading ?
        <p>Loading...</p> :
        error ? <p>Error: {error.message}</p> :
          me ?
            (
              <div>

                {console.log("data", data)}
                <header className="jumbotron">
                  <h3>My Profile</h3>
                </header>
                <div className="profile">
                  <div className="profileItem">
                    <h4>Display Name</h4>
                    <p>{me.displayName}</p>
                  </div>
                  <div className="profileItem">
                    <h4>Username</h4>
                    <p>{me.username}</p>
                  </div>
                  <div className="profileItem">
                    <h4>Email</h4>
                    <p>{me.email}</p>
                  </div>
                  <div className="profileItem">
                    <h4>Role</h4>
                    <p>{me.role}</p>
                  </div>
                  <div className="profileItem">
                    <h4>Since</h4>
                    <p>{formatDateTime(me.since, "date")}</p>
                  </div>
                </div>
              </div>
            ) : null
      }

    </div>
  );
};

export default Profile;