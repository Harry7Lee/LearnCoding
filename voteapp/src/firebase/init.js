import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAj2yXOW2U8QKuW0DDz8JU3Clcggpem49s",
    authDomain: "vote-42be5.firebaseapp.com",
    databaseURL: "https://vote-42be5.firebaseio.com",
    projectId: "vote-42be5",
    storageBucket: "vote-42be5.appspot.com",
    messagingSenderId: "416777917347"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

//export firestore database

export default firebaseApp.firestore();