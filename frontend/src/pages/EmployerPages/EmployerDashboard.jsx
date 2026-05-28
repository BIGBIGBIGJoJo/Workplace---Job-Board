import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useJobs from '../../tool/jobs/useJobs';

const emptyJobForm = {
  title: '',
  description: '',
  location: '',
  salary: '',
  type: 'full-time',
  companyName: '',
  companyProfile: '',
  nature: '',
  requirementText: '',
};

const navigationItems = [
  { label: 'Overview', path: '/employer' },
  { label: 'Post Job', path: '/employer/post-job' },
  { label: 'Manage Jobs', path: '/employer/jobs' },
  { label: 'View Requests', path: '/employer/view-request' },
];

const EmployerDashboard = () => {
  const { jobs, loading, error, addJob, removeJob, refreshJobs } = useJobs();
  const location = useLocation();
  const [jobData, setJobData] = useState(emptyJobForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [jobActionError, setJobActionError] = useState("");

  const currentView = useMemo(() => {
    if (location.pathname.endsWith('/post-job')) return 'post';
    if (location.pathname.endsWith('/jobs')) return 'jobs';
    if (location.pathname.endsWith('/view-request')) return 'requests';
    return 'overview';
  }, [location.pathname]);

  const stats = useMemo(() => {
    const totalSalary = jobs.reduce((sum, job) => sum + Number(job.salary || 0), 0);
    const averageSalary = jobs.length ? Math.round(totalSalary / jobs.length) : 0;
    const fullTimeCount = jobs.filter((job) => job.type === 'full-time').length;

    return [
      { label: 'Active Jobs', value: jobs.length },
      { label: 'Full-Time Roles', value: fullTimeCount },
      { label: 'Avg. Salary', value: averageSalary ? `$${averageSalary.toLocaleString()}` : '$0' },
    ];
  }, [jobs]);

  const requestRows = useMemo(
    () =>
      jobs.slice(0, 5).map((job, index) => ({
        id: job._id || job.id || index,
        candidate: ['Jamie Chan', 'Alex Morgan', 'Taylor Lee', 'Chris Wong', 'Sam Rivera'][index] || 'New Applicant',
        jobTitle: job.title,
        status: ['New', 'Reviewing', 'Interview', 'New', 'Shortlisted'][index] || 'New',
      })),
    [jobs]
  );

  const validateForm = () => {
    const newErrors = {};
    if (!jobData.title.trim()) newErrors.title = 'Job title is required';
    if (!jobData.description.trim()) newErrors.description = 'Job description is required';
    if (!jobData.location.trim()) newErrors.location = 'Location is required';
    if (!jobData.salary.trim() || isNaN(jobData.salary) || Number(jobData.salary) <= 0) {
      newErrors.salary = 'Please enter a valid salary';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      await addJob({
        ...jobData,
        requirement: jobData.requirementText
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
      });
      setJobData(emptyJobForm);
      setErrors({ success: 'Job posted successfully!' });
    } catch (error) {
      setErrors(error.data?.errors || { api: error.data?.error || 'Failed to post job' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData((currentData) => ({ ...currentData, [name]: value }));
  };

  const navClass = (path) => {
    const selected = location.pathname === path;
    return `block py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
      selected ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-65 bg-white shadow-xl flex flex-col space-y-4">
        <div className="grid place-items-center w-full h-20 bg-blue-300">
          <h2 className="text-2xl font-bold text-gray-900 m-auto">Employer Dashboard</h2>
        </div>

        <nav className="space-y-2 px-2">
          {navigationItems.map((item) => (
            <Link key={item.path} to={item.path} className={navClass(item.path)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        {currentView === 'overview' && (
          <section className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Hiring Overview</h1>
              <p className="mt-2 text-sm text-gray-600">Track your job posts and applicant activity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {stats.map((item) => (
                <div key={item.label} className="bg-white p-6 rounded-xl shadow-lg">
                  <p className="text-sm font-semibold text-gray-500">{item.label}</p>
                  <p className="mt-3 text-3xl font-extrabold text-blue-700">{item.value}</p>
                </div>
              ))}
            </div>

            <DashboardPanel title="Recent Jobs" action={<button onClick={refreshJobs} className="text-sm text-blue-600 font-semibold">Refresh</button>}>
              <JobsTable jobs={jobs.slice(0, 5)} loading={loading} error={error} />
            </DashboardPanel>
          </section>
        )}

        {currentView === 'post' && (
          <section className="flex items-center justify-center">
            <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-xl">
              <div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Post a New Job</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Fill in the details to create a job listing</p>
              </div>

              <JobForm
                jobData={jobData}
                errors={errors}
                submitting={submitting}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </section>
        )}

        {currentView === 'jobs' && (
          <section className="max-w-6xl mx-auto">
            <DashboardPanel title="Manage Jobs" action={<Link to="/employer/post-job" className="text-sm text-blue-600 font-semibold">Post New</Link>}>
              {jobActionError && <p className="mb-4 text-sm text-red-600">{jobActionError}</p>}
              <JobsTable
                jobs={jobs}
                loading={loading}
                error={error}
                onDelete={async (jobId) => {
                  setJobActionError("");
                  try {
                    await removeJob(jobId);
                  } catch (error) {
                    setJobActionError(error.data?.error || "Failed to delete job");
                  }
                }}
              />
            </DashboardPanel>
          </section>
        )}

        {currentView === 'requests' && (
          <section className="max-w-6xl mx-auto">
            <DashboardPanel title="Applicant Requests">
              {requestRows.length === 0 ? (
                <p className="text-sm text-gray-500">No applicant requests yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        <th className="py-3 pr-4">Candidate</th>
                        <th className="py-3 pr-4">Job</th>
                        <th className="py-3 pr-4">Status</th>
                        <th className="py-3 pr-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {requestRows.map((request) => (
                        <tr key={request.id} className="text-sm text-gray-700">
                          <td className="py-4 pr-4 font-semibold">{request.candidate}</td>
                          <td className="py-4 pr-4">{request.jobTitle}</td>
                          <td className="py-4 pr-4">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{request.status}</span>
                          </td>
                          <td className="py-4 pr-4">
                            <button className="text-blue-600 font-semibold hover:text-blue-800">Review</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </DashboardPanel>
          </section>
        )}
      </main>
    </div>
  );
};

const DashboardPanel = ({ title, action, children }) => (
  <div className="bg-white p-8 rounded-xl shadow-2xl">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

const JobsTable = ({ jobs, loading, error, onDelete }) => {
  if (loading) return <p className="text-sm text-gray-500">Loading jobs...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (jobs.length === 0) return <p className="text-sm text-gray-500">No jobs posted yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-500">
            <th className="py-3 pr-4">Title</th>
            <th className="py-3 pr-4">Location</th>
            <th className="py-3 pr-4">Type</th>
            <th className="py-3 pr-4">Salary</th>
            <th className="py-3 pr-4">Posted</th>
            {onDelete && <th className="py-3 pr-4">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr key={job._id || job.id} className="text-sm text-gray-700">
              <td className="py-4 pr-4 font-semibold text-gray-900">{job.title}</td>
              <td className="py-4 pr-4">{job.location}</td>
              <td className="py-4 pr-4">{job.type}</td>
              <td className="py-4 pr-4">${Number(job.salary || 0).toLocaleString()}</td>
              <td className="py-4 pr-4">{job.postDate || 'Recently'}</td>
              {onDelete && (
                <td className="py-4 pr-4">
                  <button
                    onClick={() => onDelete(job._id || job.id)}
                    className="text-red-600 font-semibold hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const JobForm = ({ jobData, errors, submitting, onChange, onSubmit }) => (
  <form className="mt-8 space-y-6" onSubmit={onSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput label="Job Title" name="title" value={jobData.title} onChange={onChange} error={errors.title} placeholder="Software Engineer" />
      <FormInput label="Location" name="location" value={jobData.location} onChange={onChange} error={errors.location} placeholder="New York, NY" />
      <FormInput label="Salary" name="salary" type="number" value={jobData.salary} onChange={onChange} error={errors.salary} placeholder="50000" />
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Type</label>
        <select
          name="type"
          value={jobData.type}
          onChange={onChange}
          className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
          <option value="temporary">Temporary</option>
        </select>
      </div>
      <FormInput label="Company Name" name="companyName" value={jobData.companyName} onChange={onChange} placeholder="Workplace Employer" />
      <FormInput label="Nature of Business" name="nature" value={jobData.nature} onChange={onChange} placeholder="Technology" />
    </div>

    <FormTextarea label="Job Description" name="description" value={jobData.description} onChange={onChange} error={errors.description} placeholder="Describe the job responsibilities..." />
    <FormTextarea label="Company Profile" name="companyProfile" value={jobData.companyProfile} onChange={onChange} placeholder="Describe your company..." rows="3" />
    <FormTextarea label="Requirements" name="requirementText" value={jobData.requirementText} onChange={onChange} placeholder="Add one requirement per line" rows="3" />

    {errors.api && <p className="text-sm text-red-600 text-center">{errors.api}</p>}
    {errors.success && <p className="text-sm text-green-600 text-center">{errors.success}</p>}

    <button
      type="submit"
      disabled={submitting}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {submitting ? 'Posting...' : 'Post Job'}
    </button>
  </form>
);

const FormInput = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const FormTextarea = ({ label, name, value, onChange, error, placeholder, rows = '4' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 px-2 py-1 block w-full rounded-lg outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
      placeholder={placeholder}
      rows={rows}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default EmployerDashboard;
