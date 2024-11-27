import Wrapper from "../../assets/wrappers/Users";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";

export const action = async () => {
  try {
    const { users } = await customFetch.get("/users/users", data);
    console.log(users);
    return users;
  } catch (error) {
    return redirect("/");
  }
};

const Users = () => {
  console.log("hi this is user bar ");
  const navigate = useNavigate();

  // Example user data (this should come from a database or state)
  const users = [
    { id: 1, name: "John Doe", username: "johndoe", role: "Admin" },
    { id: 2, name: "Jane Smith", username: "janesmith", role: "User" },
    { id: 3, name: "Sam Wilson", username: "samwilson", role: "Editor" },
  ];

  const handleRowClick = (id) => {
    navigate(`/dashboard/users/viewUser?id=${id}`);
  };

  const handleRegisterClick = () => {
    navigate(`/dashboard/users/registerUser`);
  };

  return (
    <Wrapper>
      <div className="users-page">
        <button
          type="button"
          className="register-btn"
          onClick={handleRegisterClick}
        >
          Register User
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                <td>
                  <div className="user-row">
                    <div className="profile-icon">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Users;
