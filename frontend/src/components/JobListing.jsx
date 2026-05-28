import React, { useMemo } from 'react'
import JobCard from './JobCard'
import useJobs from '../tool/jobs/useJobs'

const JobListing = ({ limit, keyword = "", type = "All" }) => {
  const { jobs, loading, error } = useJobs();

  const jobList = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const normalizedType = type.toLowerCase();

    const filteredJobs = jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const description = job.description?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";
      const company = job.company?.name?.toLowerCase() || "";
      const matchesKeyword =
        !normalizedKeyword ||
        title.includes(normalizedKeyword) ||
        description.includes(normalizedKeyword) ||
        location.includes(normalizedKeyword) ||
        company.includes(normalizedKeyword);
      const matchesType =
        normalizedType === "all" || job.type?.toLowerCase() === normalizedType;

      return matchesKeyword && matchesType;
    });

    return filteredJobs.slice(0, limit || filteredJobs.length);
  }, [jobs, keyword, limit, type]);

  return (
    <div className="max-w-screen mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {loading && (
        <p className="text-center text-gray-500 font-semibold">Loading jobs...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}
      {!loading && !error && jobList.length === 0 && (
        <p className="text-center text-gray-500 font-semibold">No jobs found.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8 justify-around gap-5 mx-auto">
        {jobList.map((jobItem) => (
          <JobCard key={jobItem._id || jobItem.id} job={jobItem} />
        ))}
      </div>
    </div>
  )
}

export default JobListing
