import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/home/Home";
import SignUp from "../pages/authentication/SignUp";
import Login from "../pages/authentication/Login";
import ErrorPage from "../pages/Error/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import AddedJobTask from "../pages/dashboard/Buyer/AddedJobTask";
import MyDashboad from "../pages/dashboard/MyDashboad";
import MyTasks from "../pages/dashboard/Buyer/MyTasks";
import PriviteRouter from "../auth/PriviteRouter";
import BuyerRoute from "./BuyerRoute";
import PurchaseCoin from "../pages/dashboard/Buyer/PurchaseCoin";
import PaymentPage from "../pages/dashboard/Buyer/PaymentPage";
import PaymentHistory from "../pages/dashboard/Buyer/PaymentHistory";
import WorkerRoute from "./WorkerRoute";
import TaskList from "../pages/dashboard/Workers/TaskList";
import TaskDetails from "../pages/dashboard/Workers/TaskDetails";
import MySubmissions from "../pages/dashboard/Workers/MySubmissions";
import Withdrawals from "../pages/dashboard/Workers/Withdrawals";
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageTasks from "../pages/dashboard/Admin/ManageTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PriviteRouter>
        <Dashboard />
      </PriviteRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PriviteRouter>
            <MyDashboad />
          </PriviteRouter>
        ),
      },
      {
        path: "my-dashboad",
        element: (
          <PriviteRouter>
            <MyDashboad />
          </PriviteRouter>
        ),
      },

      // admin route
      {
        path: "/dashboard/manage-users",
        element: (
          <PriviteRouter>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PriviteRouter>
        ),
      },
      {
        path: "/dashboard/manage-tasks",
        element: (
          <PriviteRouter>
            <AdminRoute>
              <ManageTasks />
            </AdminRoute>
          </PriviteRouter>
        ),
      },
      // buyer route
      {
        path: "/dashboard/add-task",
        element: (
          <PriviteRouter>
            <BuyerRoute>
              <AddedJobTask />
            </BuyerRoute>
          </PriviteRouter>
        ),
      },
      {
        path: "/dashboard/my-tasks",
        element: (
          <PriviteRouter>
            <BuyerRoute>
              <MyTasks />
            </BuyerRoute>
          </PriviteRouter>
        ),
      },
      {
        path: "/dashboard/purchase-coin",
        element: (
          <PriviteRouter>
            <BuyerRoute>
              <PurchaseCoin />
            </BuyerRoute>
          </PriviteRouter>
        ),
      },
      {
        path: "/dashboard/payment/:price/:coins",
        element: (
          <PriviteRouter>
            <BuyerRoute>
              <PaymentPage />
            </BuyerRoute>
          </PriviteRouter>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <PriviteRouter>
            <BuyerRoute>
              <PaymentHistory />
            </BuyerRoute>
          </PriviteRouter>
        ),
      },
      // worker route
      {
        path: "/dashboard/tasks-list",
        element: (
          <PriviteRouter>
            <WorkerRoute>
              <TaskList />
            </WorkerRoute>
          </PriviteRouter>
        ),
      },

      {
        path: "/dashboard/tasks-details/:taskId",
        element: (
          <PriviteRouter>
            <WorkerRoute>
              <TaskDetails />
            </WorkerRoute>
          </PriviteRouter>
        ),
      },
      {
        path: "/dashboard/my-submissions",
        element: (
          <PriviteRouter>
            <WorkerRoute>
              <MySubmissions />
            </WorkerRoute>
          </PriviteRouter>
        ),
      },
      {
        path: "/dashboard/withdrawals",
        element: (
          <PriviteRouter>
            <WorkerRoute>
              <Withdrawals />
            </WorkerRoute>
          </PriviteRouter>
        ),
      },
    ],
  },
]);

export default router;
