import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI2Ek-hfIfF3szORyl1p7BgpM3Vc68FsQ",
    authDomain: "curso-react-cero-exp.firebaseapp.com",
    projectId: "curso-react-cero-exp",
    storageBucket: "curso-react-cero-exp.appspot.com",
    messagingSenderId: "803361469520",
    appId: "1:803361469520:web:b41f625b51a20bfc8a0d55",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
