
// src/firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAx4B8ou_IYRiFgQ47eIxtLEEoGI9JEc_4",
    authDomain: "example-project-72d6d.firebaseapp.com",
    projectId: "example-project-72d6d",
    storageBucket: "example-project-72d6d.appspot.com",
    messagingSenderId: "601807933751",
    appId: "1:601807933751:web:d1b8cc7c15de515faecab2",
    measurementId: "G-H53DSJ4VVL"
};

// src/firebase.js
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}