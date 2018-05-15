import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCnqABMshj4SvWEOCgCYnrjmtm6qozSHnw",
  authDomain: "udemy-ninja-smoothies-2952c.firebaseapp.com",
  databaseURL: "https://udemy-ninja-smoothies-2952c.firebaseio.com",
  projectId: "udemy-ninja-smoothies-2952c",
  storageBucket: "udemy-ninja-smoothies-2952c.appspot.com",
  messagingSenderId: "892419715877"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

//export firestore database

export default firebaseApp.firestore();
