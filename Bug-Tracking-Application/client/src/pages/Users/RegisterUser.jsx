import {
  Form,
  redirect,
  useNavigation,
  Link,
  useActionData,
} from "react-router-dom";
import { toast } from "react-toastify";
import cryptoRandomString from "crypto-random-string"; // Import the library
import Wrapper from "../../assets/wrappers/RegisterUser";
import { useState } from "react";
import { FormRow } from "../../components";
import customFetch from "../../utils/customFetch";

//this is he action method for registering user
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/users/register", data);
    toast.success("Registration successful");
    return redirect("/dashboard/users");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const RegisterUser = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [password, setPassword] = useState("");
  // Use crypto-random-string to generate password
  const generatePassword = () => {
    const generatedPassword = cryptoRandomString({
      length: 12,
      type: "alphanumeric",
    });
    setPassword(generatedPassword);
  };

  return (
    <Wrapper>
      <div className="register-page">
        <h1>Create New User</h1>
        <Form method="post" className="register-form">
          <div className="form-group">
            <FormRow
              type="text"
              name="name"
              labelText="name"
              placeholder="Name"
            />
          </div>

          <div className="form-group">
            <FormRow
              type="email"
              name="username"
              labelText="username"
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
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
            <select name="role" required>
              <option value="">Select Role</option>
              <option value="tester">Tester</option>
              <option value="developer">Developer</option>
              <option value="incharge">Incharge</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {errors && <p style={{ color: "red" }}>{errors.msg}</p>}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "Register"}
          </button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default RegisterUser;
