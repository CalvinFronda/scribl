import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Rootlayout";

import { Dashboard } from "@/pages/Dashboard";
import { requireAuth } from "@/components/auth/auth";
import LandingPage from "@/pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
        loader: requireAuth,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
