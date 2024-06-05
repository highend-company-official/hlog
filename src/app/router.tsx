import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import * as pages from "@/pages";

import { AuthLayout, HeaderLayout } from "@/widgets/layout";
import { ProfileArticles } from "@/widgets/profile/profile-articles";
import { ProfileSettings } from "@/widgets/profile/profile-settings";

import { ProfileInfo } from "@/entities/profile/ui";
import * as shared from "@/shared";

import * as hocs from "./hocs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<HeaderLayout />}>
        <Route
          index
          element={
            <hocs.SearchArea>
              <pages.HomePage />
            </hocs.SearchArea>
          }
        />
        <Route
          path="article-read/:article_id"
          element={
            <hocs.SearchArea>
              <Suspense
                fallback={
                  <>
                    <shared.Skeleton.Image />

                    <div className="mt-14" />

                    <shared.Skeleton.Text repeat={5} />
                  </>
                }
              >
                <pages.ArticleRead />
              </Suspense>
            </hocs.SearchArea>
          }
        />
        <Route path="profile/:user_id" element={<pages.ProfilePage />}>
          <Route
            index
            element={
              <Suspense fallback={<shared.Skeleton height={600} />}>
                <hocs.SearchArea>
                  <ProfileInfo />
                </hocs.SearchArea>
              </Suspense>
            }
          />
          <Route
            path="articles"
            element={
              <Suspense fallback={<shared.Skeleton height={600} />}>
                <hocs.SearchArea>
                  <ProfileArticles />
                </hocs.SearchArea>
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<shared.Skeleton height={600} />}>
                <hocs.PrivateRoute>
                  <hocs.SearchArea>
                    <ProfileSettings />
                  </hocs.SearchArea>
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
          <Suspense>
            <hocs.PublicRoute>
              <AuthLayout />
            </hocs.PublicRoute>
          </Suspense>
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
