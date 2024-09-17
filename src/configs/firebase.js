/* eslint-disable linebreak-style */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-RwO0I5npW4uY3JnAHg23pkZIxOnoG9w",
  authDomain: "imagination-station-d9e2c.firebaseapp.com",
  projectId: "imagination-station-d9e2c",
  storageBucket: "imagination-station-d9e2c.appspot.com",
  messagingSenderId: "844127671059",
  appId: "1:844127671059:web:c20af4547ae983de84c0e6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
export const storage = getStorage(app);
