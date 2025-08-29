import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

// Google login
export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
}; //After a user successfully signs in, the Firebase SDK provides the client with the user's profile information and an ID token.

// Logout
export const logout = () => {
    return signOut(auth);
};
