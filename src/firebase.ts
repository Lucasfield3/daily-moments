import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCg2oVNcCxTu3tYP7xUUJxTddF78LgLm5g",
    authDomain: "daily-moments-a477e.firebaseapp.com",
    projectId: "daily-moments-a477e",
    storageBucket: "daily-moments-a477e.appspot.com",
    messagingSenderId: "120654313877",
    appId: "1:120654313877:web:a99ca8ebe7bf38d2cd1e9c"
  };

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()