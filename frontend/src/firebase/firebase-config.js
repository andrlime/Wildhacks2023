// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDExpOmBvAlncR8T7xJ2iUAfl_Iy0xfwug",
  authDomain: "wildhacks-2023.firebaseapp.com",
  projectId: "wildhacks-2023",
  storageBucket: "wildhacks-2023.appspot.com",
  messagingSenderId: "1092878813994",
  appId: "1:1092878813994:web:7cb4e3d016c015e6e8ac53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);