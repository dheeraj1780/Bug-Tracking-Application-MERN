import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  AssignedReports,
  CompletedReports,
  InprogressReports,
  RegisterReports,
  Reports,
  ViewReport,
  Users,
  RegisterUser,
  ViewUser,
  Centre,
  Dashboard,
  Error,
  HomeLayout,
  Login,
  Landing,
  Profile,
  UsersLayout,
  ReportsLayout,
} from "./pages";

import { action as loginAction } from "./pages/Login";
import { action as userAction } from "./pages/Users/Users";
import { loader as dashboardLoader } from "./pages/Dashboard";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Centre />,
          },
          {
            path: "profile",
            element: <Profile />,
            // action: profileAction,
          },
          {
            path: "users",
            element: <UsersLayout />,
            children: [
              {
                index: true,
                element: <Users />,
                action: userAction,
              },
              {
                path: "registerUser",
                element: <RegisterUser />,
              },
              {
                path: "viewUser",
                element: <ViewUser />,
              },
            ],
          },
          {
            path: "reports",
            element: <ReportsLayout />,
            children: [
              {
                index: true,
                element: <Reports />,
              },
              {
                path: "assingedReports",
                element: <AssignedReports />,
              },
              {
                path: "registerReports",
                element: <RegisterReports />,
              },
              {
                path: "inprogressReports",
                element: <InprogressReports />,
              },
              {
                path: "completedReports",
                element: <CompletedReports />,
              },
              {
                path: "viewReports",
                element: <ViewReport />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
