import { useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

// import logo from './logo.svg';
import './sass/App.scss';

// import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/global/Header';
import Nav from './components/global/Nav';

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Error404 from './components/pages/error404';
import Hooks from './components/pages/Hooks';
import Partners from './components/pages/Partners';
import Admin from './components/pages/Admin';

import { gql, useQuery } from '@apollo/client';

import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Loading from './components/pages/Loading';

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// require('dotenv').config({ path: "./.env" });
console.log("api key (react app): ", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("api url: ", process.env.REACT_APP_API_URL);
console.log("api url: ", process.env.API_URL);
console.log("api key: ", process.env.FIREBASE_API_KEY);

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
  console.log("api key: ", process.env.REACT_APP_FIREBASE_API_KEY);
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

  useEffect(() => {
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

      <OkQuery user={user} />

      { user && <Nav /> }
      <div className="content">

        <Header isLoggedIn={!(user === null)} logOut={signOut} user={user} />
        {/* {console.log("user exist: " + !(user === null))}
        {console.log("user ", user)} */}

        { (loading || user === undefined)  ?
          <Loading /> :
          user ?
            <Switch>

              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/profile" >
                <Profile user={user} />
              </Route>

              <Route path="/admin" component={Admin} />
              <Route path="/hooks" component={Hooks} />
              <Route path="/partners" component={Partners} />

              <Route path="/" component={Error404} />
            </Switch>
            :
            <Switch>
              {console.log("user ", user)}
              {!user && <Route exact path="/register">
                <Register onSubmit={createUserWithEmailAndPassword} errorAuth={error} />
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
