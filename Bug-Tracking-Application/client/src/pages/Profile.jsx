import { useState } from "react";
import Wrapper from "../assets/wrappers/Profile";

const Profile = () => {
  // Example profile data (this can be replaced with real user data from a context or API)
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe123");
  const [role, setRole] = useState("Admin");
  const [createdAt, setCreatedAt] = useState("2022-01-15");


  const navigateToEditProfile = () => {
    console.log("asd")
  };

  return (
    <Wrapper>
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-icon">
              <img
                src="https://via.placeholder.com/100" // Replace with actual profile image URL
                alt="Profile Icon"
                className="icon-img"
              />
            </div>
            <h2 className="profile-name">{name}</h2>
          </div>
          <div className="profile-details">
            <div className="profile-info">
              <span className="profile-label">Username:</span>
              <span className="profile-value">{username}</span>
            </div>
            <div className="profile-info">
              <span className="profile-label">Role:</span>
              <span className="profile-value">{role}</span>
            </div>
            <div className="profile-info">
              <span className="profile-label">User Created:</span>
              <span className="profile-value">{createdAt}</span>
            </div>
            <button
              className="edit-profile-btn"
              onClick={navigateToEditProfile}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
