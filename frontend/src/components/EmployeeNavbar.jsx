import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const EmployeeNavbar = () => {
  const [selectedText, setSelectedText] = useState("Home");

  const selectedStyle = "link border-blue-500 cursor-pointer text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold";
  const defaultStyle = "link text-gray-500 cursor-pointer hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-bold";

  useEffect(() => {
    const links = document.querySelectorAll('#navLinks .link');

    links.forEach((item) => {
      item.className = (selectedText === item.id) ? selectedStyle : defaultStyle;
    });

  }, [selectedText]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div id="navLinks" className="flex">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" id="Home"
              onClick={() => { setSelectedText("Home") }}
              className="text-2xl font-bold text-blue-600">
              Workplace
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">

            <Link to="/" id="Home"
              onClick={() => { setSelectedText("Home") }}
              className="link border-blue-500 cursor-pointer text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold">
              Home
            </Link>
            <Link to="/jobs" id="Jobs"
              onClick={() => { setSelectedText("Jobs") }}
              className="link text-gray-500 cursor-pointer hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-bold">
              Jobs
            </Link>
            <Link to="/companies" id="Companies"
              onClick={() => { setSelectedText("Companies") }}
              className="link text-gray-500 cursor-pointer hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-bold">
              Companies
            </Link>
            <Link to="/about" id="About"
              onClick={() => { setSelectedText("About") }}
              className="link text-gray-500 cursor-pointer hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-bold">
              About
            </Link>
          </div>
        </div>
        <div className="ml-6 flex items-center justify-center">
          <Link to="/authorisation"
            className="bg-blue-600 shadow-sm cursor-pointer text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-700 hover:shadow-md hover:scale-110 transition-all">
            I am Employer
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmployeeNavbar