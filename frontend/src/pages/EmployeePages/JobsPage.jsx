import React, { useState } from 'react'
import JobListing from '../../components/JobListing'

const JobsPage = () => {
  const [type, setType] = useState("All");
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <nav>
        {/* need further design */}
        <div className="flex justify-center max-w-6/10 my-6 mx-auto">
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="flex-1 bg-gray-50 rounded-l-lg font-bold py-3 pl-2 border-r-2 border-r-gray-300 z-10"
          >
            <option className="bg-gray-50 font-bold" value="All">All</option>
            <option className="bg-gray-50 font-bold" value="part-time">Part-time</option>
            <option className="bg-gray-50 font-bold" value="full-time">Full-time</option>
            <option className="bg-gray-50 font-bold" value="internship">Internship</option>
            <option className="bg-gray-50 font-bold " value="temporary">Temporary</option>
          </select>

          <input
            className="bg-gray-50 pl-2 flex-4"
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Enter Keywords"
          />
          <button className="flex-1 cursor-pointer px-4 py-2 border-transparent text-sm font-medium rounded-r-lg text-white bg-blue-800 hover:bg-blue-900">Search</button>
        </div>
      </nav>
      <JobListing keyword={keyword} type={type} />
    </>
  )
}

export default JobsPage
