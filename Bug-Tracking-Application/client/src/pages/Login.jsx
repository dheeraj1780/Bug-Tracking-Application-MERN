import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useActionData } from "react-router-dom";
import Wrapper from "../assets/wrappers/Login";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   try {
//     await customFetch.post("/auth/login", data);
//     toast.success("Registration successful");
//     return redirect("/dashboard");
//   } catch (error) {
//     console.log(error);
//     toast.error(error?.response?.data?.message);
//     return error;
//   }
// };
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.password.length < 3) {
    errors.msg = "password too short";
    return errors;
  }
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    // toast.error(error?.response?.data?.msg);
    errors.msg = error?.response?.data?.message;
    return errors;
  }
};

const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>login</h4>
        <FormRow type="email" name="username" />
        <FormRow type="password" name="password" />
        {errors && <p style={{ color: "red" }}>{errors.msg}</p>}
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          <Link to="/" className="member-btn">
            Back
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
