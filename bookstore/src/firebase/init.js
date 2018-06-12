import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC9X44ps3Lkjs76HRpROBd96wdjM5YM0-w",
  authDomain: "bookstore-f1b66.firebaseapp.com",
  databaseURL: "https://bookstore-f1b66.firebaseio.com",
  projectId: "bookstore-f1b66",
  storageBucket: "bookstore-f1b66.appspot.com",
  messagingSenderId: "25605068327"
};
const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
