import { useNavigate, redirect, useLoaderData, Form } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import Wrapper from "../../assets/wrappers/ViewUser";

//loader function to fetch user data by id
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/users/users/${params.id}`);
    return data.user;
  } catch (error) {
    redirect("/");
  }
};

const ViewUser = () => {
  const navigate = useNavigate();
  const user = useLoaderData();
  const { name, username, role, createdAt } = user;
  console.log(name, username, role, createdAt);
  return (
    <Wrapper>
      <div className="view-user-container">
        <div className="user-avatar">{name.charAt(0).toUpperCase()}</div>
        <h2>{name}</h2>
        <div className="user-details">
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <Form method="post" action={`../deleteUser/${user._id}`}>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
        <button
          className="back-button"
          onClick={() => navigate("/dashboard/users")}
        >
          Back to Users
        </button>
        <button
          className="edit-button"
          onClick={() => navigate(`/dashboard/edit-user/${user._id}`)}
        >
          Edit User
        </button>
      </div>
    </Wrapper>
  );
};

export default ViewUser;
