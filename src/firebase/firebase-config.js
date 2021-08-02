import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBI2Ek-hfIfF3szORyl1p7BgpM3Vc68FsQ",
    authDomain: "curso-react-cero-exp.firebaseapp.com",
    projectId: "curso-react-cero-exp",
    storageBucket: "curso-react-cero-exp.appspot.com",
    messagingSenderId: "803361469520",
    appId: "1:803361469520:web:b41f625b51a20bfc8a0d55",
};

const firebaseConfigTest = {
    apiKey: "AIzaSyBmej95enrFXMnAHIPlF7ylNUgQEiC7dMA",
    authDomain: "react-journal-testing-jm.firebaseapp.com",
    projectId: "react-journal-testing-jm",
    storageBucket: "react-journal-testing-jm.appspot.com",
    messagingSenderId: "433899802856",
    appId: "1:433899802856:web:77149cab5d44a3f284f95d",
};

// Initialize Firebase acording to environment
if (process.env.NODE_ENV === "test") {
    firebase.initializeApp(firebaseConfigTest);
} else {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
