// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore,collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9hxULobvNE6M0h9apLEAGi4wBiQIsbU0",
  authDomain: "movieverse-2095e.firebaseapp.com",
  projectId: "movieverse-2095e",
  storageBucket: "movieverse-2095e.appspot.com",
  messagingSenderId: "60404240720",
  appId: "1:60404240720:web:0eb47369eb23040642dc55",
  measurementId: "G-SYMTVSRL7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db= getFirestore(app);
 export const moviesRef= collection(db,"movies");
 export const reviewsRef= collection(db,"review");
const analytics = getAnalytics(app);
export default app;