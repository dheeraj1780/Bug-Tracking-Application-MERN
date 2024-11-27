import Wrapper from "../../assets/wrappers/Users";
import { useNavigate, useOutletContext } from "react-router-dom";

const Users = () => {
  const { details } = useOutletContext();
  console.log(details);
  const navigate = useNavigate();
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
            {details && details.length > 0 ? (
              details.map((user) => (
                <tr key={user._id} onClick={() => handleRowClick(user._id)}>
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
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Users;
