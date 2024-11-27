import { useState } from "react";
import cryptoRandomString from "crypto-random-string"; // Import the library
import Wrapper from "../../assets/wrappers/RegisterUser";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  // Use crypto-random-string to generate password
  const generatePassword = () => {
    const generatedPassword = cryptoRandomString({
      length: 12,
      type: "alphanumeric",
    });
    setPassword(generatedPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, username, password, role });
  };

  return (
    <Wrapper>
      <div className="register-page">
        <h1>Create New User</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter user's full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              readOnly
              placeholder="Generated Password"
            />
            <button
              type="button"
              onClick={generatePassword}
              className="generate-btn"
            >
              Generate Password
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Register User
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default RegisterUser;
