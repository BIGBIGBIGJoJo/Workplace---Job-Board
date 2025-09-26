import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoggingContext from "../tool/logging/LoggingContext";
import UserDataContext from "../tool/userData/UserDataContext";

const EmployeeNavbar = () => {
  const location = useLocation();
  const [selectedText, setSelectedText] = useState();

  const { logged } = useContext(LoggingContext);
  const { user } = useContext(UserDataContext);

  const selectedStyle = "link border-blue-500 cursor-pointer text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition duration-100";
  const defaultStyle = "link text-gray-500 cursor-pointer hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-bold transition duration-100";

  useEffect(() => {
    switch (location.pathname) {
      case '/jobs':
        setSelectedText("Jobs");
        break;
      case '/profile':
        setSelectedText("Profile");
        break;
      case '/about':
        setSelectedText("About");
        break;
      default:
        setSelectedText("");
    }
  }, [location.pathname]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="flex justify-between h-16">
        <div id="navLinks" className="flex">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/"
              className="text-2xl font-bold text-blue-600">
              Workplace
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/"
              className={(selectedText === "Home") ? selectedStyle : defaultStyle}>
              Home
            </Link>
            <Link to="/jobs"
              className={(selectedText === "Jobs") ? selectedStyle : defaultStyle}>
              Jobs
            </Link>
            <Link to="/profile"
              className={(selectedText === "Profile") ? selectedStyle : defaultStyle}>
              Profile
            </Link>
            <Link to="/about"
              className={(selectedText === "About") ? selectedStyle : defaultStyle}>
              About
            </Link>
          </div>
        </div>
        <div className="ml-6 flex items-center justify-center">
          {!logged ?
            (
              <Link to="/login"
                className="bg-blue-600 shadow-sm cursor-pointer text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-700 hover:shadow-md hover:scale-110 transition-all">
                Sign in
              </Link>
            ) : (
              <p className="text-gray-800 text-shadow-2xs text-lg font-semibold font-mono">Wellcome, {user.firstName}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeNavbar;