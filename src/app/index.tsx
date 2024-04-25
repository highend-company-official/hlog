import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import * as hoc from "./hoc";
import router from "./router";

import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <hoc.QueryClient>
      <hoc.ErrorBoundary>
        <hoc.AuthContainer>
          <hoc.ToastContainer>
            <RouterProvider router={router} />
          </hoc.ToastContainer>
        </hoc.AuthContainer>
      </hoc.ErrorBoundary>
    </hoc.QueryClient>
  </React.StrictMode>
);
