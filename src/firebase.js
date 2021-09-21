import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/storage";
import { getFirestore, collection, query } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDMbGyKPHHKApEajVlF3VlAr8WWY9DOVIg",
  authDomain: "reelsclone-007.firebaseapp.com",
  projectId: "reelsclone-007",
  storageBucket: "reelsclone-007.appspot.com",
  messagingSenderId: "504188072427",
  appId: "1:504188072427:web:28291764892002f594a9ae",
});

export const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const database = {
  users: query(collection(firestore, "users")),
  posts: query(collection(firestore, "posts")),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();
