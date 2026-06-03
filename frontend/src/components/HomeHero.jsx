import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomeHero = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedKeyword = keyword.trim();
    const searchPath = trimmedKeyword
      ? `/jobs?keyword=${encodeURIComponent(trimmedKeyword)}`
      : "/jobs";

    navigate(searchPath);
  };

  return (
    <>
      <section className="bg-blue-700 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Welcome to Workplace
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
            Connect with top employers and discover exciting career opportunities
          </p>
          <form className="mt-10 max-w-2xl mx-auto" onSubmit={handleSearch}>
            <div className="flex flex-col gap-3 rounded-lg bg-white/10 p-2 shadow-sm sm:flex-row">
              <input
                type="search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search job title, company, or location"
                className="min-h-12 flex-1 rounded-md border border-white/20 bg-white px-4 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="submit"
                className="min-h-12 cursor-pointer rounded-md bg-gray-950 px-6 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default HomeHero
