import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

let { Firebase_Config } = require("../secrets");
firebase.initializeApp(Firebase_Config);

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const database = {
  users: firestore.collection("users"),
  posts: firestore.collection("posts"),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();
