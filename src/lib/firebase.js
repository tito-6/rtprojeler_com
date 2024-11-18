// lib/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ9gHdHnDoviItTQQXfPxad1oN9Cz6zQE",
  authDomain: "elgi-reportage.firebaseapp.com",
  projectId: "elgi-reportage",
  storageBucket: "elgi-reportage.appspot.com",
  messagingSenderId: "825748764405",
  appId: "1:825748764405:web:ecee19f7fc7aaaf200f7bc",
};

// Initialize Firebase and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const yahooProvider = new OAuthProvider("yahoo.com");

export {
  auth,
  googleProvider,
  twitterProvider,
  facebookProvider,
  yahooProvider,
};
