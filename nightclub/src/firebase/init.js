import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAoJTPyzEJ_6Lx3XVzWnoJdJElRiT471nQ",
  authDomain: "nightclub-368a0.firebaseapp.com",
  databaseURL: "https://nightclub-368a0.firebaseio.com",
  projectId: "nightclub-368a0",
  storageBucket: "",
  messagingSenderId: "404715745585"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

//export firestore database

export default firebaseApp.firestore();
