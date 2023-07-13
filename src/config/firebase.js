// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8EEYJR9uF97ZNhnxAEBXqJ5asOhe-uqs",
  authDomain: "fir-auth-demo-335c0.firebaseapp.com",
  projectId: "fir-auth-demo-335c0",
  storageBucket: "fir-auth-demo-335c0.appspot.com",
  messagingSenderId: "599491829248",
  appId: "1:599491829248:web:907cbab14960163a6442e5",
  measurementId: "G-X9WDTXZPPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()