import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Skeleton } from "@/shared";
import * as hocs from "./hocs";
import router from "./router";

import "./styles/normalize.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <hocs.ErrorBoundary>
      <React.Suspense fallback={<Skeleton height={300} />}>
        <hocs.QueryClient>
          <hocs.AuthContainer>
            <hocs.ToastContainer>
              <RouterProvider router={router} />
            </hocs.ToastContainer>
          </hocs.AuthContainer>
        </hocs.QueryClient>
      </React.Suspense>
    </hocs.ErrorBoundary>
  </React.StrictMode>
);
