import React from 'react'
import { Link } from "react-router-dom"

const WelcomeNav = () => {
  return (
    <section className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold">Ready to Take the Next Step?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl">
          Join thousands of professionals finding their perfect job match
        </p>
        <div className="mt-8">
          <Link to="/jobs" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 hover:scale-105 transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WelcomeNav