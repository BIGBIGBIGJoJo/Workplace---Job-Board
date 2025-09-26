import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoggingStateProvider from "./tool/logging/LoggingStateProvider"
import EmployeeLayout from "./layout/EmployeeLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import Test from "./components/test";
import LogInPage from "./pages/authentication/LogInPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import UserDataProvider from "./tool/userData/UserDataProvider";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<EmployeeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signing" element={<SignUpPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <LoggingStateProvider>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </LoggingStateProvider>
  );
};

export default App;