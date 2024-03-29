import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// import Firebase from './helpers/firebase';
import firebase from 'firebase/app';


// console.log("windows.R: ", window.__RUNTIME_CONFIG__);
// console.log("coucouuuu");

const httpLink = createHttpLink({
  uri: 'https://hornlog-api.nas.dewwwe.com/',
  // credentials: 'include'
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  const user = firebase.auth().currentUser;
  let fireToken;
  if (user) {
    fireToken = await user.getIdToken()
  }
  // console.log('final token', `Bearer ${fireToken}`);
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
      authorization: fireToken ? `Bearer ${fireToken}` : "",
    }
  }



});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Matomo instance
const matomoInstance = createInstance({
  urlBase: 'https://matomo.nas.dewwwe.com',
  siteId: 5,
  // userId: '', // optional, default value: `undefined`.
  // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
  // srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    // seconds: 10 // optional, default value: `15
  },
  linkTracking: false, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    // disableCookies: true,
    // setSecureCookie: true,
    // setRequestMethod: 'POST'
  }
});


// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter >
      <MatomoProvider value={matomoInstance}>
        <App />
      </MatomoProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
