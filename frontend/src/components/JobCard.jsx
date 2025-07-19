import React, { useState } from 'react'

const JobCard = () => {
  const job = {
    title: "Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description: "Join our innovative team to build cutting-edge applications test test test test test test test test test test test test test test test test test test testdsaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  }

  let des = job.description;

  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!showFullDescription) { des = des.substring(0, 90) + "..." };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
      <p className="mt-2 text-sm text-gray-500">{job.company}</p>
      <p className="mt-1 text-sm text-gray-500">{job.location}</p>

      <div className="mt-4 text-sm text-gray-600 mr-1">{des}</div>

      <button onClick={() => setShowFullDescription((pre) => !pre)} className="block cursor-pointer text-blue-500 mb-7 hover:text-blue-700 text-sm">{showFullDescription ? 'Less' : 'More'}</button>

      <button href="#" className="py-2 px-4 cursor-pointer rounded-md border bg-blue-500 text-white hover:bg-white hover:text-blue-500 transition-colors duration-300">Apply Now</button>
    </div>
  )
}

export default JobCard