import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

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
  uri:   'https://hornlog-api.nas.dewwwe.com/',
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



ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
