import React from 'react'

const JobInfo = ({ job }) => {
  return (
    <>
      <div className="max-w-5xl mx-auto p-10">
        <div className="text-center font-mono mb-12">
          <img src="../images/company icon.png" alt="Company Logo" className="mx-auto mb-6 h-28 " />
          <h1 className="text-5xl font-extrabold text-blue-600 tracking-wide">{job.company.name}</h1>
          <p className="text-2xl text-gray-600 mt-3 font-bold">{job.title}</p>
          <div className="mt-8 text-sm text-black bg-blue-100 px-5 py-2 rounded-full inline-block shadow-sm">
            <p>Posting Date: <span className="font-semibold text-gray-600 italic">{job.postDate}</span></p>
          </div>
        </div>

        <div className="block bg-gray-300 h-1 mb-12"></div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 border-l-3 border-blue-500 pl-6 py-3"
            style={{ background: "linear-gradient(135deg, #dbeafe, #ffffff 60% )" }}>
            About Us
          </h2>

          <p className="text-gray-700 text-lg leading-loose text-justify px-6 py-4 bg-gray-50 rounded-2xl shadow-sm">
            {job.company.profile}
          </p>
        </section>


        <section className="mb-20">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 border-l-3 border-blue-500 pl-6 py-3"
            style={{ background: "linear-gradient(135deg, #dbeafe, #ffffff 60% )" }}>
            Job Description
          </h2>

          <p className="text-gray-700 text-lg leading-loose text-justify px-6 py-4 bg-gray-50 rounded-2xl shadow-sm">
            {job.description}
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-blue-700 mb-6 border-l-3 border-blue-500 pl-6 py-3"
            style={{ background: "linear-gradient(135deg, #dbeafe, #ffffff 60% )" }}>
            Requirements
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-700">
            {
              job.requirement.map((requirement, index) => (
                <div className="p-5 bg-blue-50 rounded-2xl shadow-md hover:bg-blue-100 transition" key={index}>
                  <span className="text-blue-500 text-2xl mr-4">✔</span> {requirement}
                </div>
              ))}
          </div>
        </section>

        <footer className="font-mono text-center text-gray-700 bg-blue-50 p-8 rounded-t-xl mt-10 shadow-sm">
          <p className="mb-4 text-xl font-extralight">
            Job Type: <span className="font-bold text-blue-700">{job.type}</span>
          </p>

          <p className="mb-6 text-xl font-extralight">
            Nature of Business: <span className="font-bold text-blue-700">{job.nature}</span>
          </p>

          <button className="cursor-pointer w-[90%] py-2 mb-6 border-transparent text-lg font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 hover:scale-110 transition-all duration-100">
            Apply Now
          </button>
        </footer>

      </div >
    </>
  )
}

export default JobInfo