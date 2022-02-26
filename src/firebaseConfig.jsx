// console.log("api key: ", window._env_.REACT_APP_FIREBASE_API_KEY);
const config = {
    apiKey: window._env_.REACT_APP_FIREBASE_API_KEY,
    authDomain: window._env_.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: window._env_.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: window._env_.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: window._env_.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: window._env_.REACT_APP_FIREBASE_APP_ID,
    measurementId: window._env_.REACT_APP_FIREBASE_MESUREMENT_ID
};
export default config;