import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAeqOCePX89HSelKr04OkBIx9cU_SzLxXw",
    authDomain: "notepilot-156a1.firebaseapp.com",
    projectId: "notepilot-156a1",
    storageBucket: "notepilot-156a1.firebasestorage.app",
    messagingSenderId: "464515820964",
    appId: "1:464515820964:web:9f6c813a1c49865db66531",
    measurementId: "G-XEPWPWM7JF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
