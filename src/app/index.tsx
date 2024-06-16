import * as React from "react";
import { CgSpinner } from "react-icons/cg";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { QueryBoundary, Skeleton } from "@/shared";

import * as hocs from "./hocs";
import router from "./router";

import "./styles/normalize.css";
import "./styles/inline-style.css";
import "./styles/editor-style.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <hocs.QueryClient>
      <QueryBoundary loadingFallback={<Skeleton height={300} />}>
        <hocs.ToastContainer>
          <RouterProvider
            router={router}
            fallbackElement={<CgSpinner size={80} className="animate-spin" />}
          />
        </hocs.ToastContainer>
      </QueryBoundary>
    </hocs.QueryClient>
    <SpeedInsights />
  </React.StrictMode>
);
