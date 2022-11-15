import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt5rm8QMn7nVP_w85ilSH4G40qz5AV1h0",
  authDomain: "simple-booking-platform.firebaseapp.com",
  projectId: "simple-booking-platform",
  storageBucket: "simple-booking-platform.appspot.com",
  messagingSenderId: "833171219160",
  appId: "1:833171219160:web:fd2b8b0cc15225cb5b2dad",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const appFirestore = firebase.firestore(app);
export const auth = getAuth(app);
export default app; 
