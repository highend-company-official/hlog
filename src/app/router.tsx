import { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import * as pages from "@/pages";

import { AuthLayout, Layout, LayoutSkeleton } from "@/widgets/layout";
import { ProfileArticles } from "@/widgets/profile-articles";
import { ProfileSettings } from "@/widgets/profile-settings";

import { ProfileInfo } from "@/entities/profile/ui";
import * as shared from "@/shared";

import * as hocs from "./hocs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <hocs.SearchContainer>
              <pages.HomePage />
            </hocs.SearchContainer>
          }
        />
        <Route
          path="article-read/:article_id"
          element={
            <Suspense
              fallback={
                <>
                  <shared.Skeleton.Image />
                  <div className="mt-14" />
                  <shared.Skeleton.Text repeat={5} />
                </>
              }
            >
              <hocs.SearchContainer>
                <pages.ArticleRead />
              </hocs.SearchContainer>
            </Suspense>
          }
        />
        <Route path="profile/:user_id" element={<pages.ProfilePage />}>
          <Route
            index
            element={
              <hocs.SearchContainer>
                <ProfileInfo />
              </hocs.SearchContainer>
            }
          />
          <Route
            path="articles"
            element={
              <Suspense fallback={<LayoutSkeleton />}>
                <hocs.SearchContainer>
                  <ProfileArticles />
                </hocs.SearchContainer>
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<LayoutSkeleton />}>
                <hocs.PrivateRoute>
                  <hocs.SearchContainer>
                    <ProfileSettings />
                  </hocs.SearchContainer>
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
            <AuthLayout />
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
