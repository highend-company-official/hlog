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
            <hocs.SearchContainer>
              <shared.QueryBoundary
                loadingFallback={<shared.Skeleton height={800} />}
              >
                <ProfileInfoContainer />
              </shared.QueryBoundary>
            </hocs.SearchContainer>
          }
        />
        <Route
          path="articles"
          element={
            <hocs.SearchContainer>
              <shared.QueryBoundary
                loadingFallback={<shared.Skeleton height={800} />}
              >
                <ProfileArticlesContainer />
              </shared.QueryBoundary>
            </hocs.SearchContainer>
          }
        />
        <Route
          path="settings"
          element={
            <hocs.PrivateRoute>
              <hocs.SearchContainer>
                <shared.QueryBoundary
                  loadingFallback={<shared.Skeleton height={800} />}
                >
                  <ProfileSettingsContainer />
                </shared.QueryBoundary>
              </hocs.SearchContainer>
            </hocs.PrivateRoute>
          }
        />
      </Route>
      <Route
        path="article-write/:article_id?"
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
