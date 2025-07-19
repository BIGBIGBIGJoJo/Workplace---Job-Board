import React from 'react'
import JobCard from './JobCard'

const JobListing = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">Featured Jobs</h2>
      <JobCard />
      <JobCard />
      <JobCard />
    </section>
  )
}

export default JobListing