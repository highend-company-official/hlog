import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Suspense } from "react";

import {
  ProfileInfo,
  ProfileArticles,
  ProfileSettings,
} from "@/entities/profile";

import * as shared from "@/shared";
import * as pages from "@/pages";
import * as widgets from "@/widgets";
import * as hoc from "./hoc";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<widgets.HeaderLayout />}>
        <Route index element={<pages.HomePage />} />
        <Route
          path="article-read/:article_id"
          element={<pages.ArticleRead />}
        />
        <Route path="profile/:user_id" element={<pages.ProfilePage />}>
          <Route
            index
            element={
              <Suspense fallback={<shared.Skeleton height={600} />}>
                <ProfileInfo />
              </Suspense>
            }
          />
          <Route
            path="articles"
            element={
              <Suspense fallback={<shared.Skeleton height={600} />}>
                <ProfileArticles />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<shared.Skeleton height={600} />}>
                <ProfileSettings />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        path="article-write"
        element={
          <hoc.PrivateRoute>
            <pages.ArticleWrite />
          </hoc.PrivateRoute>
        }
      />
      <Route
        path="auth"
        element={
          <hoc.PublicRoute>
            <widgets.AuthLayout />
          </hoc.PublicRoute>
        }
      >
        <Route path="sign-in" element={<pages.SignInPage />} />
        <Route path="sign-up" element={<pages.SignUpPage />} />
      </Route>
      <Route path="*" element={<pages.NotFoundPage />} />
    </>
  )
);

export default router;
