import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Suspense } from "react";

import { ProfileInfo } from "@/entities/profile";

import * as shared from "@/shared";
import * as pages from "@/pages";

import { AuthLayout, HeaderLayout } from "@/widgets/layout";
import { ProfileArticles } from "@/widgets/profile/profile-articles";
import { ProfileSettings } from "@/widgets/profile/profile-settings";

import * as hocs from "./hocs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<HeaderLayout />}>
        <Route index element={<pages.HomePage />} />
        <Route
          path="article-read/:article_id"
          element={
            <Suspense
              fallback={
                <>
                  <shared.ImageSkeleton />

                  <div className="mt-14" />

                  <shared.TextSkeleton repeat={5} />
                </>
              }
            >
              <pages.ArticleRead />
            </Suspense>
          }
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
                <hocs.PrivateRoute>
                  <ProfileSettings />
                </hocs.PrivateRoute>
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        path="article-write"
        element={
          <Suspense fallback={<shared.Skeleton height={600} />}>
            <hocs.PrivateRoute>
              <pages.ArticleWrite />
            </hocs.PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="auth"
        element={
          <hocs.PublicRoute>
            <AuthLayout />
          </hocs.PublicRoute>
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
