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
            <shared.QueryBoundary
              loadingFallback={<shared.Skeleton height={800} />}
            >
              <hocs.SearchContainer>
                <ProfileInfoContainer />
              </hocs.SearchContainer>
            </shared.QueryBoundary>
          }
        />
        <Route
          path="articles"
          element={
            <shared.QueryBoundary
              loadingFallback={<shared.Skeleton height={800} />}
            >
              <hocs.SearchContainer>
                <ProfileArticlesContainer />
              </hocs.SearchContainer>
            </shared.QueryBoundary>
          }
        />
        <Route
          path="settings"
          element={
            <shared.QueryBoundary
              loadingFallback={<shared.Skeleton height={800} />}
            >
              <hocs.PrivateRoute>
                <hocs.SearchContainer>
                  <ProfileSettingsContainer />
                </hocs.SearchContainer>
              </hocs.PrivateRoute>
            </shared.QueryBoundary>
          }
        />
      </Route>
      <Route
        path="article-write"
        element={
          <hocs.PrivateRoute>
            <pages.ArticleWrite />
          </hocs.PrivateRoute>
        }
      />
      <Route
        path="auth"
        element={
          <shared.QueryBoundary>
            <AuthLayout />
          </shared.QueryBoundary>
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
