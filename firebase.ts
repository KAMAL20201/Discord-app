// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "discord-clone-f8a4c.firebaseapp.com",
  projectId: "discord-clone-f8a4c",
  storageBucket: "discord-clone-f8a4c.appspot.com",
  messagingSenderId: "1093249869786",
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
