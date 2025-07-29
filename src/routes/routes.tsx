import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";

import { Dashboard } from "@/pages/Dashboard";

import LandingPage from "@/pages/LandingPage";
import { RequireAuth } from "@/components/auth/RequireAuth";
import PrivateJournalPage from "@/pages/PrivateJournalPage";

// src/components/auth/ProtectedRoutes.tsx
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  return <Outlet />;
}

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
        element: (
          <RequireAuth>
            <ProtectedRoutes />
          </RequireAuth>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "private",
            element: <PrivateJournalPage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
