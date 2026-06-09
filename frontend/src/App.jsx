import React from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoggingStateProvider from "./tool/logging/LoggingStateProvider"
import EmployeeLayout from "./layout/EmployeeLayout";
import HomePage from "./pages/EmployeePages/HomePage";
import JobsPage from "./pages/EmployeePages/JobsPage";
import ProfilePage from "./pages/EmployeePages/ProfilePage";
import AboutPage from "./pages/EmployeePages/AboutPage";
import LogInPage from "./pages/authentication/LogInPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import ForgotPasswordPage from "./pages/authentication/ForgotPasswordPage";
import UserDataProvider from "./tool/userData/UserDataProvider";
import EmployerDashboard from "./pages/EmployerPages/EmployerDashboard";
import JobsProvider from "./tool/jobs/JobsProvider";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<EmployeeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signing" element={<SignUpPage />} />
          <Route path="/forget_password" element={<ForgotPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
        <Route>
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/employer/post-job" element={<EmployerDashboard />} />
          <Route path="/employer/jobs" element={<EmployerDashboard />} />
          <Route path="/employer/view-request" element={<EmployerDashboard />} />
        </Route>
      </Route>
    )
  );

  return (
    <LoggingStateProvider>
      <UserDataProvider>
        <JobsProvider>
          <RouterProvider router={router} />
        </JobsProvider>
      </UserDataProvider>
    </LoggingStateProvider>
  );
};

export default App;
