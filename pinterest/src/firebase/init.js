import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBHBXOKnWLrwQxMCYQzMum4BJbe4nCJ7ps",
  authDomain: "pinterest-89871.firebaseapp.com",
  databaseURL: "https://pinterest-89871.firebaseio.com",
  projectId: "pinterest-89871",
  storageBucket: "",
  messagingSenderId: "420343996852"
};
const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
