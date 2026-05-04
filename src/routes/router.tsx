import MainCart from "@/base/mainCart/MainCart";
import MainLayout from "@/base/mainLayout/MainLayout";
import HomePage from "@/components/pages/home/homePage/HomePage";
import Profile from "@/components/pages/profile/profile/Profile";
import Shipping from "@/components/pages/shipping/Shipping";
import Payment from "@/components/pages/payment/Payment";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "cart",
        element: <MainCart />,
      },
    ],
  },
  {
    path: "/cart/shipping",
    element: <Shipping />,
  },
  {
    path: "/cart/payment",
    element: <Payment />,
  },
]);
