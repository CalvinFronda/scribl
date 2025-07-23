import DashboardPage from "@/pages/auth/Dashboard";
import { SignIn } from "@/pages/auth/SignIn";
import HomePage from "@/pages/Home";
import WritePage from "@/pages/Write";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/write",
    Component: WritePage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "sign-in",
    Component: SignIn,
  },
]);
