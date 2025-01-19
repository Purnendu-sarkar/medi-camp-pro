import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import AvailableCamps from "../Page/AvailableCamps/AvailableCamps";
import LogIn from "../Page/Authentication/LogIn";
import SignUp from "../Page/Authentication/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Page/Shared/Profile";
import AdminRoute from "./AdminRoute";
import UpdateProfile from "../Page/Shared/UpdateProfile";
import AddCamp from "../Page/Organizer/AddCamp";
import ManageCamps from "../Page/Organizer/ManageCamps";
import UpdateCamp from "../Page/Organizer/UpdateCamp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-camps",
        element: (
          <PrivateRoute>
            <AvailableCamps></AvailableCamps>
          </PrivateRoute>
        ),
      },
      {
        path: "/join-us",
        element: <LogIn></LogIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },
      //Admin Routes
      {
        path: "/dashboard/adminProfile",
        element: (
          <AdminRoute>
            <Profile></Profile>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addCamp",
        element: (
          <AdminRoute>
            <AddCamp></AddCamp>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageCamp",
        element: (
          <AdminRoute>
            <ManageCamps></ManageCamps>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateCamp/:id",
        element: (
          <AdminRoute>
            <UpdateCamp></UpdateCamp>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/camps/${params.id}`),
      },
      //
      {
        path: "/dashboard/userHome",
        element: <Profile></Profile>,
      },
    ],
  },
]);
