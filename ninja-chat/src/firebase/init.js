import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDKdVwsgwz9BjQ6TGHwLdEmr-GTECuAEj4",
  authDomain: "ninja-chat-fa347.firebaseapp.com",
  databaseURL: "https://ninja-chat-fa347.firebaseio.com",
  projectId: "ninja-chat-fa347",
  storageBucket: "ninja-chat-fa347.appspot.com",
  messagingSenderId: "8327310237"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebase.firestore();
