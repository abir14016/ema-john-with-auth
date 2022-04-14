import { getAuth } from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWPr7GK_KnVLaUhdGOMp5AoKj40xEe8hY",
    authDomain: "ema-john-with-auth-eafd1.firebaseapp.com",
    projectId: "ema-john-with-auth-eafd1",
    storageBucket: "ema-john-with-auth-eafd1.appspot.com",
    messagingSenderId: "727958604818",
    appId: "1:727958604818:web:aaf87e837a43ed83029ccb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;