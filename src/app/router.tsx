import { createBrowserRouter } from "react-router-dom";

import * as pages from "@/pages";
import * as widgets from "@/widgets";
import * as hoc from "./hoc";

const router = createBrowserRouter([
  {
    element: <widgets.HeaderLayout />,
    children: [
      {
        index: true,
        element: <pages.HomePage />,
      },
      {
        path: "article-read/:article_id",
        element: <pages.ArticleRead />,
      },
      {
        path: "profile",
        element: (
          <hoc.PrivateRoute>
            <pages.ProfilePage />
          </hoc.PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth", // Added a forward slash at the beginning
    element: <widgets.AuthLayout />,
    children: [
      {
        path: "sign-in", // Added a forward slash at the beginning
        element: <pages.SignInPage />,
      },
      {
        path: "sign-up", // Added a forward slash at the beginning
        element: <pages.SignUpPage />,
      },
    ],
  },
]);

export default router;
