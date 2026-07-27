import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";



export const saveUser = async (user, userData) => {

  await setDoc(doc(db, "users", user.uid), {

    uid: user.uid,

    email: user.email,

    firstName: userData.firstName,

    lastName: userData.lastName,

    phone: userData.phone,

   

    createdAt: new Date(),

  });

};


export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};



export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  return null;
};



export const updateUserProfile = async (uid, data) => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, data);
};