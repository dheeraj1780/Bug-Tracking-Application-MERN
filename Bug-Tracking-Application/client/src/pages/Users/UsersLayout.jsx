import { Outlet, useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";

export const loader = async () => {
  try {
    const users = await customFetch.get("/users/users");
    return users.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return redirect("/");
  }
};

const UsersLayout = () => {
  const details = useLoaderData();
  console.log(details);
  return (
    <div>
      <Outlet context={{ details }} />
    </div>
  );
};

export default UsersLayout;
