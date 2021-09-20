import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDMbGyKPHHKApEajVlF3VlAr8WWY9DOVIg",
  authDomain: "reelsclone-007.firebaseapp.com",
  projectId: "reelsclone-007",
  storageBucket: "reelsclone-007.appspot.com",
  messagingSenderId: "504188072427",
  appId: "1:504188072427:web:28291764892002f594a9ae",
});

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const database = {
  users: firestore.collection("users"),
  posts: firestore.collection("posts"),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();
