import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const getChatId = (uid1, uid2) => {

  return [uid1, uid2]

    .sort()

    .join("_");

};




export const sendMessage = async (
  text,
  currentUser,
  selectedUser
) => {

  const chatId = getChatId(
    currentUser.uid,
    selectedUser.uid
  );

  await addDoc(

    collection(
      db,
      "chats",
      chatId,
      "messages"
    ),

    {
      text,
      uid: currentUser.uid,
      email: currentUser.email,
      createdAt: serverTimestamp(),
    }

  );

};

export const getMessages = (
  currentUser,
  selectedUser,
  callback
) => {

  const chatId = getChatId(
    currentUser.uid,
    selectedUser.uid
  );

  const q = query(

    collection(
      db,
      "chats",
      chatId,
      "messages"
    ),

    orderBy("createdAt")

  );

  return onSnapshot(q, (snapshot) => {

    const messages = snapshot.docs.map((doc) => ({

      id: doc.id,

      ...doc.data(),

    }));

    callback(messages);

  });

};