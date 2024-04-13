import { createBrowserRouter } from "react-router-dom";
import * as pages from "../pages";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <pages.FeedPage />,
  },
]);

export default router;
