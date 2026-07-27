import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

// Register User
export const signup = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login User
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout User
export const logout = async () => {
  return await signOut(auth);
};