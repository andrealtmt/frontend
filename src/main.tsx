import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import { AppShell } from "./components/AppShell";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppShell>
      <RouterProvider router={router} />
    </AppShell>
  </React.StrictMode>
);
