import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Suspense } from "react";

import { ProfileInfo, ProfileArticles } from "@/entities/profile";

import * as shared from "@/shared";
import * as pages from "@/pages";
import * as widgets from "@/widgets";
import * as provider from "./providers";

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
                <provider.PrivateRoute>
                  <widgets.ProfileSettings />
                </provider.PrivateRoute>
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        path="article-write"
        element={
          <Suspense fallback={<shared.Skeleton height={600} />}>
            <provider.PrivateRoute>
              <pages.ArticleWrite />
            </provider.PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="auth"
        element={
          <provider.PublicRoute>
            <widgets.AuthLayout />
          </provider.PublicRoute>
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
