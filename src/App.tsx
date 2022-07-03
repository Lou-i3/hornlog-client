import { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";

// import logo from './logo.svg';
// import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'
import 'rsuite-table/dist/css/rsuite-table.min.css';

import './sass/App.scss';


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
    console.log("user: " + _props.user.currentUser);
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

  useEffect(() => {
    // console.log(user?.getIdToken());
    if (user) {
      // setisLoggedIn(true);
    }

    // EventBus.on("logout", logOut);

    return () => {
      // EventBus.remove("logout", logOut);
    };
  }, [user]);

  return (
    <div className='app'>

      {/* <OkQuery user={user} /> */}

      {user && <Nav setPageLoading={setPageLoading}/>}
      <div className="content">

        <Header isLoggedIn={!(user === null)} logOut={signOut} user={user} />
        {/* {console.log("user exist: " + !(user === null))}
        {console.log("user ", user)} */}

        {(loading || user === undefined) ?
          <Loading /> :
          user ? (
            pageLoading
              ? <Loading />
              : <Switch>
                <Route exact path={["/", "/home", ""]} >
                  <Home />
                </Route>
                <Route exact path="/profile" >
                  <Profile user={user} logOut={signOut} />
                </Route>

                <Route path="/hooks" >
                  <Hooks key={`${Date.now()}`} />
                </Route>
                <Route path="/partners" component={Partners} />
                <Route path="/settings" component={Settings} />
                <Route path="/icons" component={Icons} />

                <Route path="/" component={Error404} />
              </Switch>
          )
            :
            <Switch>
              {console.log("user ", user)}
              {/* {!user && <Route exact path="/register">
                <Register onSubmit={createUserWithEmailAndPassword} errorAuth={error} />
              </Route>} */}

              {!user && <Route exact path={"/forgotPassword"} >
                <ForgotPassword />
              </Route>}

              {!user && <Route path={["/", "/login"]} >
                <Login onSubmit={signInWithEmailAndPassword} errorAuth={error} loadingAuth={loading} />
              </Route>}


            </Switch>
        }
      </div>
      {/* <AuthVerify logOut={logOut} /> */}
    </div>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
