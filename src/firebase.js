import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYWX4BwceNhOlsi_MM3iPKgGFYo_TTg-w",
    authDomain: "whatsapp-clone-740bc.firebaseapp.com",
    projectId: "whatsapp-clone-740bc",
    storageBucket: "whatsapp-clone-740bc.appspot.com",
    messagingSenderId: "145319514603",
    appId: "1:145319514603:web:28cb343ee2dc4444eac9ae",
    measurementId: "G-HS5NGDBFCJ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
