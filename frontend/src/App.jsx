import React from "react";
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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<EmployeeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/test" element={<Test />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;