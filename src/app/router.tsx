import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import * as pages from "@/pages";
import * as widgets from "@/widgets";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<widgets.HeaderLayout />}>
        <Route index element={<pages.HomePage />} />
        <Route
          path="article-read/:article_id"
          element={<pages.ArticleRead />}
        />
        <Route path="profile" element={<pages.ProfilePage />} />
      </Route>
      <Route element={<widgets.AuthLayout />}>
        <Route path="sign-in" element={<pages.SignInPage />} />
        <Route path="sign-up" element={<pages.SignUpPage />} />
      </Route>
      <Route path="*" element={<pages.NotFoundPage />} />
    </>
  )
);

export default router;
