import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'

const JobListing = ({ limit }) => {

  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/job-fetch');
        if (!response.ok) {
          throw new Error('Error on fetching jobs');
        }
        const data = await response.json();
        const listLimit = limit || data.length;
        setJobList(data.slice(0, listLimit));
      } catch (error) {
        console.error(error);
      }
    }
    fetchJobs();
  
  }, []);

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