
import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import useAuth from "../hooks/useAuth";

export default function Sidebar({

    selectedUser,

    setSelectedUser

}) {

    const [users, setUsers] = useState([]);

const { currentUser } = useAuth();


useEffect(() => {

  const fetchUsers = async () => {

    const data = await getUsers();

    setUsers(data);

  };

  fetchUsers();

}, []);
  return (
    <aside className="sidebar">

      {users
  .filter(user => user.uid !== currentUser?.uid)
  .map(user => (

    <div
key={user.uid}
className={`chat-user ${
selectedUser?.uid === user.uid ? "active-user" : ""
}`}
onClick={() => setSelectedUser(user)}
>

      <h4>

        {user.email}

      </h4>

    </div>

))}
    </aside>
  );
}

