import React from "react";
import { gql, useQuery } from '@apollo/client';

import { useState } from 'react';

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


  return (
    <div className="content-inner">
      {loading ?
        <p>Loading...</p> :
        error ? <p>Error: {error.message}</p> :
          data ?
            (
              <div>

                {console.log("data", data)}
                <header className="jumbotron">
                  <h3>
                    <strong>{data.me.username}</strong> Profile
                  </h3>
                </header>
                <p>
                  <strong>Token:</strong>
                </p>
                <p style={{ wordWrap: 'break-word' }}>{data.me.accessToken}</p>
                <p>
                  <strong>Refresh Token:</strong>
                </p>
                {/* <p style={{ wordWrap: 'break-word' }}>{currentUser.refreshToken}</p> */}
                <p>
                  {/* <strong>Id:</strong> {currentUser.id} */}
                </p>
                <p>
                  <strong>Email:</strong> {data.me.email}
                </p>
                <p>
                  <strong>Role:</strong>
                  {
                    data.me.role
                  }
                </p>
              </div>
            ) : null
      }

    </div>
  );
};

export default Profile;