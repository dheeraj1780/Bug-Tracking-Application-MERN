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
        children: [
          {
            index: true,
            element: <Centre />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "users",
            element: <UsersLayout />,
            children: [
              {
                index: true,
                element: <Users />,
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
