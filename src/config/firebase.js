import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9j6gnZXdqnqZ-yfNyQQT77G4HtjKa2TA",
  authDomain: "firearm-6356c.firebaseapp.com",
  projectId: "firearm-6356c",
  storageBucket: "firearm-6356c.appspot.com",
  messagingSenderId: "838288196431",
  appId: "1:838288196431:web:0084cadefa7a7b076e7b3a",
  measurementId: "G-NGKWLCEYL9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { db, firebase };