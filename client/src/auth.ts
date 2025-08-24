import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

// Google login
export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

// Logout
export const logout = () => {
    return signOut(auth);
};
