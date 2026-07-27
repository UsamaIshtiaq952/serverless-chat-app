import { useNavigate, Link } from "react-router-dom";
import { logout } from "../services/authService";
import useAuth from "../hooks/useAuth";


export default function Navbar() {


  const { currentUser } = useAuth();

  const navigate = useNavigate();


  const handleLogout = async () => {

    try {

      await logout();

      navigate("/");

    } catch(error) {

      alert(error.message);

    }

  };


  return (

  <nav className="navbar">

  <h2 className="logo">
    💬 ChatSphere
  </h2>

  <div className="nav-right">

    <Link
      to="/profile"
      className="profile-link"
    >
      Profile
    </Link>

    <span className="user-email">
      {currentUser?.email}
    </span>

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>

</nav>
  );

}