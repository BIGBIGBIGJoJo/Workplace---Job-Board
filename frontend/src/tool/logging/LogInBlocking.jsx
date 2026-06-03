import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoggingContext from "./LoggingContext"

import { MdLockOutline, MdLogin, MdPersonAddAlt1 } from "react-icons/md";

const LogInBlocking = ({ children }) => {

  const { logged } = useContext(LoggingContext);

  return (
    <div className="relative">
      {!logged && (
        <div className="absolute inset-0 z-40 grid place-items-center bg-gray-950/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-white/70 bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-blue-700">
              <MdLockOutline className="text-3xl" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-gray-950">Sign in to continue</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              This section uses your Workplace account to keep profile, application, and hiring actions connected to the right user.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                to="/login"
                className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                <MdLogin className="text-lg" />
                Sign in
              </Link>
              <Link
                to="/signing"
                className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-700"
              >
                <MdPersonAddAlt1 className="text-lg" />
                Create account
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className={!logged ? "pointer-events-none select-none" : ""}>
        {children}
      </div>
    </div>
  )
}

export default LogInBlocking
