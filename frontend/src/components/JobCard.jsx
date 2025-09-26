import React, { useState } from 'react'
import Modal from "./Modal"
import JobInfo from "./JobInfo";

const JobCard = ({job}) => {

  // Description showing
  let des = job.description;
  const [showFullDescription, setShowFullDescription] = useState(false);
  if (!showFullDescription) { des = des.substring(0, 200) + "..." };

  // Modal hooks
  const [modalOpened, setModalOpened] = useState(false);
  const closeModal = () => setModalOpened(false);
  const openModal = () => setModalOpened(true);

  return (
    <div className="max-w-3xl bg-white p-6 rounded-lg shadow-md transition duration-400 hover:shadow-lg h-fit">
      <h3 className="text-xl font-semibold text-gray-700">{job.title}</h3>
      <p className="mt-2 text-sm text-gray-500">{job.company.name}</p>
      <p className="mt-1 text-sm text-gray-500">{job.location}</p>

      <div className="mt-4 max-w-screen break-words text-sm text-gray-600">{des}</div>

      <button
        onClick={() => setShowFullDescription((pre) => !pre)}
        className="block mb-10 cursor-pointer text-blue-500 hover:text-blue-700 text-sm">
        {showFullDescription ? 'Less' : 'More'}
      </button>

      <button href="#"
        className="w-9/10 text-ellipsis text-nowrap overflow-hidden py-2 px-4 cursor-pointer rounded-md border bg-blue-500 text-white hover:bg-white hover:text-blue-500 transition-colors duration-200 md:w-fit"
        onClick={openModal}
      >
        Show Job Info
      </button>

      <Modal isOpen={modalOpened} closeModal={closeModal} child={<JobInfo key={job.id} job={job}/>} />

    </div>
  )
}

export default JobCard