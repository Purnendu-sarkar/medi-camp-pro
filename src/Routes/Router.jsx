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
import CampDetails from "../Page/Shared/CampDetails";
import RegisteredCamps from "../Page/Participant/RegisteredCamps";
import PaymentPage from "../Page/Participant/PaymentPage";
import ManageRegisteredCamps from "../Page/Organizer/ManageRegisteredCamps";
import Payment from "../Page/Participant/Payment";
import PaymentHistory from "../Page/Participant/PaymentHistory";
import FeedbackModal from "../Page/Participant/FeedbackModal";
import Analytics from "../Page/Participant/Analytics";
import NotFound from "../Page/Shared/NotFound";
import HowItWorks from "../Page/HowItWorks/HowItWorks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      // {
      //   path: "*",
      //   element: <NotFound></NotFound>,
      // },
      {
        path: "/available-camps",
        element: <AvailableCamps></AvailableCamps>,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks></HowItWorks>,
      },
      {
        path: "/camp-details/:campId",
        // element: (
        //   <PrivateRoute>
        //     <CampDetails></CampDetails>
        //   </PrivateRoute>
        // ),
        element: <CampDetails></CampDetails>,
        loader: ({ params }) =>
          fetch(
            `https://medi-camp-server-seven.vercel.app/camps/${params.campId}`
          ).then((res) => res.json()),
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
    errorElement: <NotFound></NotFound>,
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
          fetch(`https://medi-camp-server-seven.vercel.app/camps/${params.id}`),
      },
      {
        path: "/dashboard/registeredCamps",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps></ManageRegisteredCamps>
          </AdminRoute>
        ),
      },
      //Participant Rotues
      {
        path: "/dashboard/userHome",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/analytics",
        element: <Analytics></Analytics>,
      },
      {
        path: "/dashboard/cart",
        element: (
          <PrivateRoute>
            <RegisteredCamps></RegisteredCamps>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:campId",
        element: (
          <PrivateRoute>
            <PaymentPage></PaymentPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/paymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/feedback",
        element: (
          <PrivateRoute>
            <FeedbackModal></FeedbackModal>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
