import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useState } from "react";
export default function Home() {
    const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="home">

      <Navbar />

      <div className="chat-layout">

       <Sidebar
    selectedUser={selectedUser}
    setSelectedUser={setSelectedUser}
/>

<ChatWindow
    selectedUser={selectedUser}
/>

      </div>

    </div>
  );
}