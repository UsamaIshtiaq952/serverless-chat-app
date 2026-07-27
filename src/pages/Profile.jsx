import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  getUserProfile,
  updateUserProfile,
} from "../services/userService";
import { Link } from "react-router-dom";
 import { toast } from "react-toastify";

export default function Profile() {
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;

      try {
        const data = await getUserProfile(currentUser.uid);

        if (data) {
          setName(data.name || "");
          setBio(data.bio || "");
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [currentUser]);

  const handleSave = async () => {
    try {
      await updateUserProfile(currentUser.uid, {
        name,
        bio,
      });

     

toast.success("profile updated Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">

       <Link to="/home" className="back-home-btn">
    ← Back to Home
  </Link>
      <div className="profile-card">

        <div className="avatar">
          👤
        </div>

        <h2>My Profile</h2>

        <div className="profile-info">

          <div className="info-item">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="info-item">
            <label>Email</label>

            <input
              type="text"
              value={currentUser?.email}
              disabled
            />
          </div>

          <div className="info-item">
            <label>Bio</label>

            <textarea
              rows="4"
              placeholder="Write something about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

        </div>

        <button
          className="edit-btn"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}