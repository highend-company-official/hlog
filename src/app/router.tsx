import { Suspense } from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import * as pages from "@/pages";

import { Header } from "@/widgets/header";
import { AuthLayout } from "@/widgets/auth-layout";
import { ProfileArticles } from "@/widgets/profile-articles";
import { ProfileSettings } from "@/widgets/profile-settings";

import { ProfileInfo } from "@/entities/profile/ui";
import * as shared from "@/shared";

import * as hocs from "./hocs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <>
            <Header />

            <div className="w-full min-h-screen bg-white">
              <div className="md:w-[600px] lg:w-[800px] xl:w-[1200px] mx-auto pt-[100px]">
                <Outlet />
              </div>
            </div>
          </>
        }
      >
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
              <Suspense>
                <hocs.SearchContainer>
                  <ProfileArticles />
                </hocs.SearchContainer>
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense>
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
