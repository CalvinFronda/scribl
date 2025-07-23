import { StrictMode } from "react";
import { RouterProvider } from "react-router";

import "./App.css";

import "./index.css";
import { router } from "./routes/routes.tsx";

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
