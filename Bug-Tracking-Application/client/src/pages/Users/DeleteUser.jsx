import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    console.log(params.id);
    await customFetch.delete(`/users/admin/delete-user/${params.id} `);
    toast.success("Successfully User Deleted");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
    return error;
  }
  return redirect("/dashboard/users");
};

