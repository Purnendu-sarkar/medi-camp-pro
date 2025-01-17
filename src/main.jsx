import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="md:w-11/12 mx-auto">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
