import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const EmployeeNavbar = () => {
  const [selectedText, setSelectedText] = useState("Home");


  return (
    <nav className="bg-white shadow-lg shadow-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">Workplace</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-blue-500 cursor-pointer text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</Link>
              <Link to="/jobs" className="text-gray-500 cursor-pointer hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">Jobs</Link>
              <Link to="/companies" className="text-gray-500 cursor-pointer hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">Companies</Link>
              <Link to="/about" className="text-gray-500 cursor-pointer hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">About</Link>
            </div>
          </div>
          <div className="ml-6 flex items-center justify-center">
            <Link to="/authorisation"
              className="bg-blue-600 shadow-sm cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:shadow-md transition">
              I am Employer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default EmployeeNavbar