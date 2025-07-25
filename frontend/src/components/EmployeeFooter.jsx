import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeFooter = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-20 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Workplace</h3>
              <p className="mt-4 text-sm">Connecting talent with opportunity.</p>
            </div>
            <div>
              <div className='w-4/6'>
                <h3 className="text-sm font-semibold uppercase border-white border-b tracking-wider">Explore</h3>
              </div>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    Career Advice
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className='w-4/6'>
                <h3 className="text-sm font-semibold uppercase border-white border-b tracking-wider">Support</h3>
              </div>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className='w-4/6'>
                <h3 className="text-sm font-semibold uppercase border-white border-b tracking-wider">Connect</h3>
              </div>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/BIGBIGBIGJoJo" target="_blank"
                    className="text-sm hover:text-gray-300 transition duration-300">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t-2 border-gray-700 pt-8 text-center">
            <p className="text-sm">&copy; Workplace by JoJo 2025 </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default EmployeeFooter