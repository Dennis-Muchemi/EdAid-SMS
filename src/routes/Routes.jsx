import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/bashboard/common/Profile";
import ManageUsers from "../pages/bashboard/Admin/ManageUsers";
import AddScholarShip from "../pages/bashboard/Admin/AddScholarShip";
import ManageScholerShips from "../pages/bashboard/Admin/ManageScholarships";
import ManageAppliedApplication from "../pages/bashboard/Admin/ManageAppliedApplication";
import ManageReview from "../pages/bashboard/Admin/ManageReview";
import Home from "../pages/Home/Home";
import SholarshipDetails from "../pages/details/SholarshipDetails";
import Payment from "../pages/payment/Payment";
import Chackout from "../pages/Checkout";
import AllScholarship from "../pages/AllScholarship";
import EditScholarShipForm from "../components/Dashboard/Form/EditScholarshipForm";
import MyApplication from "../pages/bashboard/user/MyApplication";
import MyReviews from "../pages/bashboard/user/MyReviews";
import ApplicationsDetails from "../components/pages/ApplicationsDetails";
import PrivateRoute from "../routes/PrivateRoute";
import AdminHomeRechart from "../pages/bashboard/Admin/AdminHomeRechart";
import AdminRoute from "../routes/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/allscholarship", element: <AllScholarship /> },
      {
        path: "/ScholarShip/:id",
        element: <PrivateRoute><SholarshipDetails /></PrivateRoute>,
        loader: async ({ params }) => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/ScholarShip/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch scholarship details.");
          }
          return response.json();
        },
      },
      {
        path: "/chackout/:id",
        element: <PrivateRoute><Chackout /></PrivateRoute>,
        loader: async ({ params }) => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/ScholarShips/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch scholarship data for checkout.");
          }
          return response.json();
        },
      },
      { path: "/payment", element: <Payment /> },
    ],
  },
  {
    path: "/Dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true, element: <AdminHomeRechart /> },
      { path: "profile", element: <Profile /> },
      { path: "add-scholarship", element: <AddScholarShip /> },
      { path: "manage-scholarship", element: <ManageScholerShips /> },
      {
        path: "manage-scholarship/updateScholarShip/:id",
        element: <EditScholarShipForm />,
        loader: async ({ params }) => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/ScholarShip/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch scholarship for editing.");
          }
          return response.json();
        },
      },
      { path: "manage-Applied-Application", element: <ManageAppliedApplication /> },
      { path: "manage-Reviews", element: <ManageReview /> },
      {
        path: "manage-Users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "my-application", element: <MyApplication /> },
      {
        path: "manage-Applied-Application/application-details/:id",
        element: <ApplicationsDetails />,
        loader: async ({ params }) => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/application-details/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch application details.");
          }
          return response.json();
        },
      },
    ],
  },
]);
