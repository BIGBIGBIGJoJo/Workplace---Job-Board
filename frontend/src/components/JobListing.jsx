import React from 'react'
import JobCard from './JobCard'
import jobs from '../../../backend/jobs.json'

const JobListing = () => {
  
  return (
    <div className="max-w-screen mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-3 gap-y-8 justify-around gap-5 mx-auto">
        {jobs.map((jobItem) => (
          <JobCard key={jobItem.id} job={jobItem}/>
        ))}
      </div>
    </div>
  )
}

export default JobListing