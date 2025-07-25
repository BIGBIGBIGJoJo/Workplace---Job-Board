import React, { useState } from 'react'

const JobCard = () => {
  const job = {
    title: "Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra rutrum ligula, quis fringilla odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque interdum pellentesque purus, ut scelerisque erat mattis non. Phasellus nec ante vulputate, semper sapien nec, mattis sem. Sed rutrum dolor vel mauris malesuada, et aliquet odio tempor. Nunc nisl justo, luctus quis scelerisque aliquam, semper sit amet ex. Duis varius sagittis diam, id laoreet tortor molestie sagittis. Donec a leo sed est euismod tempor. Morbi ex quam, ullamcorper vel finibus eu, laoreet lobortis." //100 words des
  }

  let des = job.description;
  
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!showFullDescription) { des = des.substring(0, 200) + "..." };

  return (
    <div className="max-w-3xl bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition h-fit">
      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
      <p className="mt-2 text-sm text-gray-500">{job.company}</p>
      <p className="mt-1 text-sm text-gray-500">{job.location}</p>

      <div className="mt-4 max-w-screen break-words text-sm text-gray-600">{des}</div>

      <button
        onClick={() => setShowFullDescription((pre) => !pre)}
        className="block mb-10 cursor-pointer text-blue-500 hover:text-blue-700 text-sm">
        {showFullDescription ? 'Less' : 'More'}
      </button>

      <button href="#" className="py-2 px-4 cursor-pointer rounded-md border bg-blue-500 text-white hover:bg-white hover:text-blue-500 transition-colors duration-200">Apply Now</button>
    </div>
  )
}

export default JobCard