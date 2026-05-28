import React, { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import JobsContext from "./JobsContext";

const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshJobs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.data?.error || err.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  const addJob = useCallback(async (jobData) => {
    const createdJob = await api.postJob(jobData);
    setJobs((currentJobs) => [createdJob, ...currentJobs]);
    return createdJob;
  }, []);

  const removeJob = useCallback(async (jobId) => {
    await api.deleteJob(jobId);
    setJobs((currentJobs) =>
      currentJobs.filter((job) => (job._id || job.id) !== jobId)
    );
  }, []);

  useEffect(() => {
    refreshJobs();
  }, [refreshJobs]);

  const value = useMemo(
    () => ({
      jobs,
      loading,
      error,
      addJob,
      removeJob,
      refreshJobs,
    }),
    [jobs, loading, error, addJob, removeJob, refreshJobs]
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export default JobsProvider;
