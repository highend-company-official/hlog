import { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import * as pages from "@/pages";

import { AuthLayout } from "@/widgets/auth-layout";
import { ProfileSettingsContainer } from "@/widgets/profile-settings";
import { ProfileInfoContainer } from "@/widgets/profile-info";
import * as shared from "@/shared";

import * as hocs from "./hocs";
import { ProfileArticlesContainer } from "@/widgets/profile-articles";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<hocs.OverlayContainer />}>
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
          <hocs.SearchContainer>
            <pages.ArticleRead />
          </hocs.SearchContainer>
        }
      />
      <Route path="profile/:user_id" element={<pages.ProfilePage />}>
        <Route
          index
          element={
            <Suspense fallback={<shared.Skeleton height={800} />}>
              <hocs.SearchContainer>
                <ProfileInfoContainer />
              </hocs.SearchContainer>
            </Suspense>
          }
        />
        <Route
          path="articles"
          element={
            <Suspense fallback={<shared.Skeleton height={800} />}>
              <hocs.SearchContainer>
                <ProfileArticlesContainer />
              </hocs.SearchContainer>
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<shared.Skeleton height={800} />}>
              <hocs.PrivateRoute>
                <hocs.SearchContainer>
                  <ProfileSettingsContainer />
                </hocs.SearchContainer>
              </hocs.PrivateRoute>
            </Suspense>
          }
        />
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
    </Route>
  )
);

export default router;
