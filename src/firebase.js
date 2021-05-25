import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDF-Qs3t7-s2DoyhmI3OQb4xIySzypCk7I",
    authDomain: "msging-96a58.firebaseapp.com",
    projectId: "msging-96a58",
    storageBucket: "msging-96a58.appspot.com",
    messagingSenderId: "151641952335",
    appId: "1:151641952335:web:4b092be9935a243cea1a3a"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {db, auth, provider};


