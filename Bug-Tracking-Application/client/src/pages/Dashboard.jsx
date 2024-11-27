import { useNavigation, Outlet, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import { Navbar, Sidebar } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const data = useLoaderData();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    console.log(showSidebar);
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("succesfully logged out");
  };
  return (
    <DashboardContext.Provider
      value={{
        data,
        logoutUser,
        showSidebar,
        toggleSidebar,
        isDarkTheme,
        toggleDarkTheme,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <Sidebar />
          <div>
            <Navbar />
            <Outlet context={{ data }} />
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;
