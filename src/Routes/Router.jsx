import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import AvailableCamps from "../Page/AvailableCamps/AvailableCamps";
import LogIn from "../Page/Authentication/LogIn";
import SignUp from "../Page/Authentication/SignUp";

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
        element: <AvailableCamps></AvailableCamps>,
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
]);
