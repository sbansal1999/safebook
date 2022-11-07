import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsBT4FOJ4cZ1ZUf5sZY4heekMnHSVrjH4",
  authDomain: "safebook-8aa47.firebaseapp.com",
  projectId: "safebook-8aa47",
  storageBucket: "safebook-8aa47.appspot.com",
  messagingSenderId: "336424387603",
  appId: "1:336424387603:web:61974f4c557270aab06be6",
  measurementId: "G-DSRQ4N1D7N",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
