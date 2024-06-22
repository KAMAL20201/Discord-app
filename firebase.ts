// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  // apiKey: "AIzaSyB9tsFVr_1w1xjddxFEwPsoA0le-UQiG_I",
  authDomain: "discord-clone-f8a4c.firebaseapp.com",
  projectId: "discord-clone-f8a4c",
  storageBucket: "discord-clone-f8a4c.appspot.com",
  messagingSenderId: "1093249869786",
  appId: "1:1093249869786:web:4aa96f57a57aa4d545c2e3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
