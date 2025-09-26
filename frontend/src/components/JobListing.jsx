import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'

const JobListing = ({ limit }) => {

  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    fetch('/api/jobFetch')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error on fetching jobs');
        }
        return response.json();
      })
      .then((data) => {
        const listLimit = limit || data.lenght;
        setJobList(data.slice(0, listLimit));
      })
      .catch((error) => {
        setError(error);
      });
  });

  return (
    <div className="max-w-screen mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-3 gap-y-8 justify-around gap-5 mx-auto">
        {jobList.map((jobItem) => (
          <JobCard key={jobItem.id} job={jobItem} />
        ))}
      </div>
    </div>
  )
}

export default JobListing