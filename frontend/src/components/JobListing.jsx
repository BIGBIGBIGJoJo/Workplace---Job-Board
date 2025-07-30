import React from 'react'
import JobCard from './JobCard'

const JobListing = (title) => {
  
  return (
    <div className="max-w-screen mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-3 gap-y-8 justify-around gap-5 mx-auto">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  )
}

export default JobListing