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
import CompaniesPage from "./pages/CompaniesPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<EmployeeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;