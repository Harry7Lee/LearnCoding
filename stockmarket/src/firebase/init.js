// Initialize Firebase
import firebase from "firebase";
import firestore from "firebase/firestore";
var config = {
  apiKey: "AIzaSyA8uWcBKvKDCCW39Iubuwf6tcGKKpNDOEM",
  authDomain: "stockmarket-6a4c9.firebaseapp.com",
  databaseURL: "https://stockmarket-6a4c9.firebaseio.com",
  projectId: "stockmarket-6a4c9",
  storageBucket: "stockmarket-6a4c9.appspot.com",
  messagingSenderId: "579464456618"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
