import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import EmployeeLayout from "./layout/EmployeeLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import Test from "./components/test";
import LogInPage from "./pages/authentication/LogInPage";

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
          <Route path="/authentication" element={<LogInPage />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;