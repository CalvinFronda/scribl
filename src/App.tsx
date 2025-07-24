import { StrictMode } from "react";

import { AuthProvider } from "./contexts/AuthContext";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes.tsx";

function App() {
  return (
    <AuthProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </AuthProvider>
  );
}

export default App;
