import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoggingContext from "./LoggingContext"

import { MdOutlineStarPurple500 } from "react-icons/md";

const LogInBlocking = ({ children }) => {

  const { logged } = useContext(LoggingContext);

  return (
    <div className="relative">
      {!logged && (
        <div className="absolute inset-0 backdrop-blur-md flex justify-center items-center z-40">
          <div className="flex flex-col justify-center items-center bg-white max-w-md p-8 rounded-xl shadow-2xl opacity-[85%]">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800">Unlock Premium Features</h2>
              <div className="flex justify-center items-center my-4">
                <MdOutlineStarPurple500 className="scale-175 mx-2 text-bg-indigo-300" />
                <MdOutlineStarPurple500 className="scale-175 mx-2 text-bg-indigo-300" />
                <MdOutlineStarPurple500 className="scale-175 mx-2 text-bg-indigo-300" />
              </div>
              <p className="mt-2 text-gray-600 text-sm">Sign in to access exclusive tools and content tailored for you.</p>
            </div>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-base hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-bg-indigo-500 focus:ring-offset-2"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default LogInBlocking