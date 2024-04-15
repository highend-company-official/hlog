import { createBrowserRouter, Outlet } from "react-router-dom";
import * as pages from "@/pages";
import Header from "@/widgets/header";

const HeaderLayout = () => {
  return (
    <>
      <Header />

      <div className="bg-white min-h-screen w-full">
        <div className="tablet:w-[600px] laptop:w-[800px] desktop:w-[1200px] mx-auto pt-[100px]">
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
        element: <pages.FeedPage />,
      },
      {
        path: "article-read/:article_id",
        element: <pages.ArticleRead />,
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
