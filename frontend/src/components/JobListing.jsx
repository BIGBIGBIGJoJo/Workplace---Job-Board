import React, { useMemo } from 'react'
import JobCard from './JobCard'
import useJobs from '../tool/jobs/useJobs'

const JobListing = ({ limit, keyword = "", type = "All", jobsOverride }) => {
  const { jobs, loading, error } = useJobs();
  const sourceJobs = jobsOverride || jobs;
  const shouldShowProviderState = !jobsOverride;

  const jobList = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const normalizedType = type.toLowerCase();

    const filteredJobs = sourceJobs.filter((job) => {
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
  }, [sourceJobs, keyword, limit, type]);

  return (
    <div className="max-w-screen mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {shouldShowProviderState && loading && (
        <p className="text-center text-gray-500 font-semibold">Loading jobs...</p>
      )}
      {shouldShowProviderState && error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}
      {(!shouldShowProviderState || (!loading && !error)) && jobList.length === 0 && (
        <p className="text-center text-gray-500 font-semibold">No jobs found.</p>
      )}
      <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
        {jobList.map((jobItem) => (
          <JobCard key={jobItem._id || jobItem.id} job={jobItem} />
        ))}
      </div>
    </div>
  )
}

export default JobListing
