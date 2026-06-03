import React, { useEffect, useState } from 'react'
import JobListing from './JobListing'
import { BiRefresh } from "react-icons/bi";
import useJobs from '../tool/jobs/useJobs';

const shuffleJobs = (jobs) => {
  const shuffledJobs = [...jobs];

  for (let index = shuffledJobs.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledJobs[index], shuffledJobs[swapIndex]] = [shuffledJobs[swapIndex], shuffledJobs[index]];
  }

  return shuffledJobs;
};

const HomeJobListing = () => {
  const { jobs } = useJobs();
  const [visibleJobs, setVisibleJobs] = useState([]);

  const showOtherJobs = () => {
    setVisibleJobs(shuffleJobs(jobs).slice(0, 3));
  };

  useEffect(() => {
    setVisibleJobs(shuffleJobs(jobs).slice(0, 3));
  }, [jobs]);

  return (
    <>
      <div className="pb-4 mb-4 mt-10 border-b-2 border-gray-300 max-w-lg mx-auto" >
        <h2 className="text-3xl font-extrabold text-gray-600 text-center">Recently Added Jobs</h2>
      </div>

      <JobListing jobsOverride={visibleJobs} />

      <button
        onClick={showOtherJobs}
        disabled={jobs.length <= 3}
        className="block bg-gray-200 p-4 mb-5 text-gray-600 rounded-md max-w-screen mx-auto cursor-pointer hover:bg-gray-300 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60 transition duration-200"
      >
        <BiRefresh style={{display: 'inline-block', scale: '150%', margin: '0 7px 2px 0', }}/>
        Other Jobs
      </button>
    </>
  )
}

export default HomeJobListing
