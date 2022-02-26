// console.log("api key: ", window.__RUNTIME_CONFIG__.FIREBASE_API_KEY);
const config = {
    apiKey: window.__RUNTIME_CONFIG__.FIREBASE_API_KEY,
    authDomain: window.__RUNTIME_CONFIG__.FIREBASE_AUTH_DOMAIN,
    projectId: window.__RUNTIME_CONFIG__.FIREBASE_PROJECT_ID,
    storageBucket: window.__RUNTIME_CONFIG__.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: window.__RUNTIME_CONFIG__.FIREBASE_MESSAGING_SENDER_ID,
    appId: window.__RUNTIME_CONFIG__.FIREBASE_APP_ID,
    measurementId: window.__RUNTIME_CONFIG__.FIREBASE_MESUREMENT_ID
};
export default config;