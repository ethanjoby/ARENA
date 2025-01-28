// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqT1mrxKLc3CgzEgqqAK156sMi4V6oP6s",
  authDomain: "arena-e6f82.firebaseapp.com",
  projectId: "arena-e6f82",
  storageBucket: "arena-e6f82.appspot.com",
  messagingSenderId: "643762431817",
  appId: "1:643762431817:web:1d8e806356f312c1bd1c98",
  measurementId: "G-DT3J7N68B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
