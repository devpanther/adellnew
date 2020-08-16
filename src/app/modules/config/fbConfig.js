import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
    apiKey: "AIzaSyBHjzEFQLT6N136gtSjJOECBXD8RuHVocY",
    authDomain: "adellcare.firebaseapp.com",
    databaseURL: "https://adellcare.firebaseio.com",
    projectId: "adellcare",
    storageBucket: "adellcare.appspot.com",
    messagingSenderId: "358181193447",
    appId: "1:358181193447:web:fc859c4a4d1d0198008442",
    measurementId: "G-8FHYGSV3JL"
};
firebase.initializeApp(config);

export const db = firebase.firestore();

export default firebase;