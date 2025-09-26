import React from 'react'
import JobListing from './JobListing'
import { BiRefresh } from "react-icons/bi";

const HomeJobListing = () => {
  return (
    <>
      <div className="pb-4 mb-4 mt-10 border-b-2 border-gray-300 max-w-lg mx-auto" >
        <h2 className="text-3xl font-extrabold text-gray-600 text-center">Recently Added Jobs</h2>
      </div>

      <JobListing limit={3} />

      <button
        className="block bg-gray-200 p-4 mb-5 text-gray-500 rounded-md max-w-screen mx-auto cursor-pointer hover:bg-gray-300 hover:text-gray-100 transition duration-200"
      >
        <BiRefresh style={{display: 'inline-block', scale: '150%', margin: '0 7px 2px 0', }}/>
        Other Jobs
      </button>
    </>
  )
}

export default HomeJobListing