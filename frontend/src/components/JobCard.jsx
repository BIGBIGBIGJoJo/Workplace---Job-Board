import React, { useState } from 'react'
import Modal from "./Modal"
import JobInfo from "./JobInfo";

const JobCard = ({job}) => {

  // Description showing
  let des = job.description || "";
  const companyName = job.company?.name || "Workplace Employer";
  const [showFullDescription, setShowFullDescription] = useState(false);
  if (!showFullDescription && des.length > 200) { des = des.substring(0, 200) + "..." };

  // Modal hooks
  const [modalOpened, setModalOpened] = useState(false);
  const closeModal = () => setModalOpened(false);
  const openModal = () => setModalOpened(true);

  return (
    <div className="flex h-full min-h-80 w-full flex-col bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700">{job.title}</h3>
      <p className="mt-2 text-sm text-gray-500">{companyName}</p>
      <p className="mt-1 text-sm text-gray-500">{job.location}</p>

      <div className="mt-4 max-w-screen flex-1 break-words text-sm leading-6 text-gray-600">{des}</div>

      <button
        onClick={() => setShowFullDescription((pre) => !pre)}
        className="mt-4 block cursor-pointer self-start text-sm font-semibold text-blue-600 hover:text-blue-800">
        {showFullDescription ? 'Less' : 'More'}
      </button>

      <button
        type="button"
        className="mt-6 w-full cursor-pointer rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-blue-600"
        onClick={openModal}
      >
        Show Job Info
      </button>

      <Modal isOpen={modalOpened} closeModal={closeModal} child={<JobInfo key={job._id || job.id} job={job}/>} />

    </div>
  )
}

export default JobCard
