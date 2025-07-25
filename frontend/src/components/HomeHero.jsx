import React from 'react'

const HomeHero = () => {
  return (
    <>
      <section className="bg-blue-700 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Welcome to Workplace
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
            Connect with top employers and discover exciting career opportunities
          </p>
          <div className="mt-10 max-w-md mx-auto">
            <div className="flex rounded-md shadow-sm">
              <input type="text" placeholder="Job title, keywords..." className="flex-1 w-full rounded-l-md sm:text-sm border-transparent bg-white mr-1 pl-2 text-black" />
              <button className="inline-flex items-center cursor-pointer scale-110 px-4 py-2 border-transparent text-sm font-medium rounded-r-md text-white bg-blue-800 hover:bg-blue-900 hover:scale-120 hover:rounded-md transition-all duration-100">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeHero