import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import * as hoc from "./hoc";
import router from "./router";

import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <hoc.ErrorBoundary>
      <hoc.QueryClient>
        <React.Suspense fallback={<>Page Load...</>}>
          <hoc.AuthContainer>
            <hoc.ToastContainer>
              <hoc.ModalContainer>
                <RouterProvider router={router} />
              </hoc.ModalContainer>
            </hoc.ToastContainer>
          </hoc.AuthContainer>
        </React.Suspense>
      </hoc.QueryClient>
    </hoc.ErrorBoundary>
  </React.StrictMode>
);
