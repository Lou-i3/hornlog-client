import { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import Nav from './components/Nav';
import * as AuthService from "./services/auth.service";
import AuthVerify from './common/AuthVerify';
import EventBus from './common/EventBus';
import Error404 from './components/error404';
import Hooks from './components/Hooks';


const App: React.FC = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const logOut = () => {
    AuthService.logout();
    setisLoggedIn(false);
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setisLoggedIn(true);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  return (
    <div>
      <Nav isLoggedIn={isLoggedIn} logOut={logOut} />
      { isLoggedIn && <p>Logged In!</p>}
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          { !isLoggedIn && <Route  path="/" component={Login} />}
          
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/hooks" component={Hooks} />


          <Route path="/" component={Error404} />
        </Switch>
      </div>
      <AuthVerify logOut={logOut} />
    </div>
  );
}

export default App;
