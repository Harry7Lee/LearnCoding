import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBw3evFR6plZBJ8j6jSQ7TgvB7L4PrZD68",
  authDomain: "geo-c88a2.firebaseapp.com",
  databaseURL: "https://geo-c88a2.firebaseio.com",
  projectId: "geo-c88a2",
  storageBucket: "geo-c88a2.appspot.com",
  messagingSenderId: "167765331261"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
