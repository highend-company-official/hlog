import { createBrowserRouter, Outlet } from "react-router-dom";
import * as pages from "@/pages";
import Header from "@/widgets/header";

const HeaderLayout = () => {
  return (
    <>
      <Header />

      <div className="pt-28 px-36">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <pages.FeedPage />,
      },
    ],
  },
]);

export default router;
