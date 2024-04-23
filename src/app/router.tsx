import { createBrowserRouter, Outlet } from "react-router-dom";
import * as pages from "@/pages";
import Header from "@/widgets/header";
import * as hoc from "./hoc";

const HeaderLayout = () => {
  return (
    <>
      <Header />

      <div className="w-full min-h-screen bg-white">
        <div className="md:w-[600px] lg:w-[800px] xl:w-[1200px] mx-auto pt-[100px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

const AuthLayout = () => {
  return (
    <div className="h-screen bg-white">
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
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
    element: <AuthLayout />,
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
