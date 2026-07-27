import { useState, useEffect, useRef } from "react";



import useAuth from "../hooks/useAuth";
import { sendMessage, getMessages } from "../services/chatService";

export default function ChatWindow({

selectedUser

}) {



    
    const { currentUser } = useAuth();

    const [text, setText] = useState("");

    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {

  bottomRef.current?.scrollIntoView({

    behavior: "smooth",

  });

}, [messages]);



  useEffect(() => {

  if (!selectedUser) return;

  const unsubscribe = getMessages(

    currentUser,

    selectedUser,

    setMessages

  );

  return unsubscribe;

}, [currentUser, selectedUser]);


   const handleSend = async () => {

  if(text.trim() === "") return;

  try{

    await sendMessage(
  text,
  currentUser,
  selectedUser
);

    setText("");

  }
  catch(error){

    alert(error.message);

  }

};


if (!selectedUser) {

return (

<div className="chat-window">

<h2

style={{

margin:"auto"

}}

>

Select a user to start chatting 💬

</h2>

</div>

);

}
  return (

   

<section className="chat-window">

<div className="chat-header">

<h3>

{selectedUser.email}

</h3>

</div>



      <div className="messages">

        {messages.map((message) => (

        <div
  key={message.id}
  className={`message ${
    message.uid === currentUser.uid
      ? "sent"
      : "received"
  }`}
>
    

  <small>

    {message.email}

  </small>

  <p>

    {message.text}

  </p>

</div>
        ))}
        <div ref={bottomRef}></div>

      </div>

      <div className="message-input">

        <input
type="text"
placeholder="Type a message..."
value={text}
onChange={(e)=>setText(e.target.value)}
/>

       <button onClick={handleSend}>

Send

</button>

      </div>

    </section>

  );
} 