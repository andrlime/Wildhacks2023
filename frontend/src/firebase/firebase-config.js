// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Currently unused, may need in future.
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDExpOmBvAlncR8T7xJ2iUAfl_Iy0xfwug",
  authDomain: "wildhacks-2023.firebaseapp.com",
  projectId: "wildhacks-2023",
  storageBucket: "wildhacks-2023.appspot.com",
  messagingSenderId: "1092878813994",
  appId: "1:1092878813994:web:7cb4e3d016c015e6e8ac53",
  databaseURL: "https://wildhacks-2023-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); // Currently unused, may need in future.