import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

// import logo from './logo.svg';
// import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'
// import 'rsuite-table/dist/css/rsuite-table.min.css';

import './sass/App.scss';
import { useMatomo } from '@datapunt/matomo-tracker-react';

// import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/global/Header';
import Nav from './components/global/Nav';

import Login from "./components/pages/Login";
// import Register from "./components/pages/Register";

import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Error404 from './components/pages/error404';
import Hooks from './components/pages/Hooks';
import Partners from './components/pages/Partners';

import { gql, useQuery } from '@apollo/client';

import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Loading from './components/pages/Loading';
import ForgotPassword from './components/pages/ForgotPassword';
import Settings from './components/pages/Settings';
import Icons from './components/pages/Icons';
import Loader from './components/items/Loader';

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


// require('dotenv').config({ path: "./.env" });
// console.log("api key (react app): ", window.__RUNTIME_CONFIG__.REACT_APP_FIREBASE_API_KEY);
// console.log("api url: ", window.__RUNTIME_CONFIG__.REACT_APP_API_URL);
// console.log("api url: ", window.__RUNTIME_CONFIG__.API_URL);
// console.log("api key: ", window.__RUNTIME_CONFIG__.FIREBASE_API_KEY);
// console.log("api key: ", window.__RUNTIME_CONFIG__.FIREBASE_API_KEY);

const firebaseAppAuth = firebaseApp.auth();

// Ok Query 
const ok = gql`
  query Ok {
    ok
  }
`;


function OkQuery(_props: { user: any; }) {
  const { loading, error, data } = useQuery(ok);
  // console.log("OkQuery");
  // console.log(data);

  const handleClick = () => {
    console.log("Clicked");
    console.log(_props.user)
    // console.log("user: " + _props.user.currentUser);
  }
  // console.log("api key: ", window.__RUNTIME_CONFIG__.FIREBASE_API_KEY);
  return (
    <div className="okQuery">
      <p>OkQuery</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>{data.ok}</p>}
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

const App: React.FC<WrappedComponentProps> = ({
  /** These props are provided by withFirebaseAuth HOC */
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setError,
  user,
  error,
  loading,
}) => {

  const [pageLoading, setPageLoading] = useState(false);
  const { pushInstruction } = useMatomo();

  useEffect(() => {
    // console.log(user?.getIdToken());
    if (user) {
      // setisLoggedIn(true);
    }
    pushInstruction('setUserId', user?.email);

    // EventBus.on("logout", logOut);

    return () => {
      // EventBus.remove("logout", logOut);
    };
  }, [user]);

  return (
    <div className='app'>

      {/* <OkQuery user={user} /> */}

      {user && <Nav setPageLoading={setPageLoading} />}
      <div className="content">

        <Header isLoggedIn={!(user === null)} logOut={signOut} user={user} />
        {/* {console.log("user exist: " + !(user === null))} */}
        {console.log("user ", user)}

        {(loading || user === undefined) ?
          <Loader size="page" what="Searching for a user..." />
          :
          user ? (
            pageLoading
              ? <Loader size="page" what="Loading page..." />
              :
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                <Route path="/profile" element={<Profile user={user} logOut={signOut} />} />

                <Route path="/hooks" element={<Hooks key={`${Date.now()}`} />} />

                <Route path="/partners" element={<Partners />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/icons" element={<Icons />} />

                <Route path="/*" element={<Error404 />} />
              </Routes>
          )
            :
            <Routes>
              {console.log("user ", user)}
              {/* {!user && <Route exact path="/register">
                <Register onSubmit={createUserWithEmailAndPassword} errorAuth={error} />
              </Route>} */}

              {!user &&
                <Route path={"/forgotPassword"} element={<ForgotPassword />} />
              }

              {!user &&
                <>
                  <Route path="/login" element={
                    <Login onSubmit={signInWithEmailAndPassword} errorAuth={error} loadingAuth={loading} />
                  }
                  />
                  <Route path="/*" element={
                    <Login onSubmit={signInWithEmailAndPassword} errorAuth={error} loadingAuth={loading} />
                  }
                  />
                </>
              }


            </Routes>
        }
      </div>
      {/* <AuthVerify logOut={logOut} /> */}
    </div>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
