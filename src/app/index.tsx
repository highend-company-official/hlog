import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import * as provider from "./providers";
import router from "./router";

import { Skeleton } from "@/shared";

import "./styles/index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <provider.ErrorBoundary>
      <React.Suspense fallback={<Skeleton height={300} />}>
        <provider.QueryClient>
          <provider.AuthContainer>
            <provider.ToastContainer>
              <RouterProvider router={router} />
            </provider.ToastContainer>
          </provider.AuthContainer>
        </provider.QueryClient>
      </React.Suspense>
    </provider.ErrorBoundary>
  </React.StrictMode>
);
