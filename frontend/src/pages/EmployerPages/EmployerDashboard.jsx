import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdDashboard,
  MdDeleteOutline,
  MdEvent,
  MdLocationOn,
  MdOutlineBusinessCenter,
  MdPeopleAlt,
  MdPostAdd,
  MdLogout,
  MdRefresh,
  MdWork,
} from 'react-icons/md';
import useJobs from '../../tool/jobs/useJobs';
import LoggingContext from '../../tool/logging/LoggingContext';
import UserDataContext from '../../tool/userData/UserDataContext';

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
  { label: 'Overview', path: '/employer', view: 'overview', icon: MdDashboard },
  { label: 'Post Job', path: '/employer/post-job', view: 'post', icon: MdPostAdd },
  { label: 'Manage Jobs', path: '/employer/jobs', view: 'jobs', icon: MdWork },
  { label: 'View Requests', path: '/employer/view-request', view: 'requests', icon: MdPeopleAlt },
];

const requestNames = ['Jamie Chan', 'Alex Morgan', 'Taylor Lee', 'Chris Wong', 'Sam Rivera', 'Morgan Yu'];
const requestStatuses = ['New', 'Reviewing', 'Interview', 'New', 'Shortlisted', 'Reviewing'];

const statusStyles = {
  New: 'bg-blue-50 text-blue-700 ring-blue-100',
  Reviewing: 'bg-amber-50 text-amber-700 ring-amber-100',
  Interview: 'bg-purple-50 text-purple-700 ring-purple-100',
  Shortlisted: 'bg-green-50 text-green-700 ring-green-100',
};

const EmployerDashboard = () => {
  const { jobs, loading, error, addJob, removeJob, refreshJobs } = useJobs();
  const location = useLocation();
  const navigate = useNavigate();
  const { setLogged } = useContext(LoggingContext);
  const { setUser } = useContext(UserDataContext);
  const [jobData, setJobData] = useState(emptyJobForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [jobActionError, setJobActionError] = useState('');

  const currentView = useMemo(() => {
    if (location.pathname.endsWith('/post-job')) return 'post';
    if (location.pathname.endsWith('/jobs')) return 'jobs';
    if (location.pathname.endsWith('/view-request')) return 'requests';
    return 'overview';
  }, [location.pathname]);

  const pageTitle = navigationItems.find((item) => item.view === currentView)?.label || 'Overview';

  const stats = useMemo(() => {
    const totalSalary = jobs.reduce((sum, job) => sum + Number(job.salary || 0), 0);
    const averageSalary = jobs.length ? Math.round(totalSalary / jobs.length) : 0;
    const fullTimeCount = jobs.filter((job) => job.type === 'full-time').length;
    const applicantCount = Math.max(jobs.length * 2, requestNames.length);

    return [
      { label: 'Active jobs', value: jobs.length, helper: 'Live listings', icon: MdWork },
      { label: 'Applicants', value: applicantCount, helper: 'Demo pipeline', icon: MdPeopleAlt },
      { label: 'Full-time roles', value: fullTimeCount, helper: 'Primary hiring type', icon: MdOutlineBusinessCenter },
      { label: 'Avg. salary', value: averageSalary ? `$${averageSalary.toLocaleString()}` : '$0', helper: 'Across active jobs', icon: MdDashboard },
    ];
  }, [jobs]);

  const requestRows = useMemo(
    () =>
      jobs.slice(0, 6).map((job, index) => ({
        id: job._id || job.id || index,
        candidate: requestNames[index] || 'New Applicant',
        email: `${(requestNames[index] || 'applicant').toLowerCase().replaceAll(' ', '.')}@example.com`,
        jobTitle: job.title,
        status: requestStatuses[index] || 'New',
        submitted: `${index + 1}d ago`,
        fit: `${88 - index * 4}%`,
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
      setErrors({ success: 'Job posted successfully.' });
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

  const handleLogout = () => {
    setLogged(false);
    setUser({});
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedTab');
    localStorage.setItem('rememberMe', 'false');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-950 lg:flex">
      <aside className="bg-gray-950 text-white lg:sticky lg:top-0 lg:h-screen lg:w-72">
        <div className="flex h-full flex-col p-5">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Workplace</p>
            <h1 className="mt-2 text-2xl font-extrabold">Employer Console</h1>
            <p className="mt-2 text-sm leading-6 text-gray-300">Operate job posts, requests, and pipeline activity.</p>
          </div>

          <nav className="mt-5 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const selected = currentView === item.view;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
                    selected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="text-xl" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3">
            <div className="hidden rounded-lg border border-white/10 bg-white/5 p-4 lg:block">
              <p className="text-sm font-semibold text-white">Hiring health</p>
              <p className="mt-2 text-3xl font-extrabold text-blue-200">{jobs.length}</p>
              <p className="mt-1 text-xs leading-5 text-gray-300">active job posts available to candidates.</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 text-sm font-semibold text-gray-200 transition hover:border-red-300/40 hover:bg-red-500/10 hover:text-white"
            >
              <MdLogout className="text-xl" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Employer workspace</p>
              <h2 className="mt-1 text-3xl font-extrabold text-gray-950">{pageTitle}</h2>
              <p className="mt-1 text-sm text-gray-600">Manage the commercial side of the Workplace job board.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={refreshJobs}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-700"
              >
                <MdRefresh className="text-lg" />
                Refresh
              </button>
              <Link
                to="/employer/post-job"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                <MdAdd className="text-lg" />
                Post job
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {currentView === 'overview' && (
            <section className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <MetricCard key={item.label} {...item} />
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <DashboardPanel
                  title="Recent jobs"
                  description="Latest active roles visible to candidates."
                  action={<Link to="/employer/jobs" className="text-sm font-semibold text-blue-700 hover:text-blue-900">Manage all</Link>}
                >
                  <JobsTable jobs={jobs.slice(0, 6)} loading={loading} error={error} />
                </DashboardPanel>

                <DashboardPanel
                  title="Applicant pipeline"
                  description="Demo request activity generated from active roles."
                  action={<Link to="/employer/view-request" className="text-sm font-semibold text-blue-700 hover:text-blue-900">View requests</Link>}
                >
                  <RequestList requests={requestRows.slice(0, 4)} />
                </DashboardPanel>
              </div>
            </section>
          )}

          {currentView === 'post' && (
            <section className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Create listing</p>
                <h3 className="mt-2 text-2xl font-extrabold">Post a new job</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Use concise titles, clear locations, and one requirement per line so candidates can scan the listing quickly.
                </p>
              </div>
              <DashboardPanel title="Job details" description="Required fields are validated before the listing is created.">
                <JobForm
                  jobData={jobData}
                  errors={errors}
                  submitting={submitting}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              </DashboardPanel>
            </section>
          )}

          {currentView === 'jobs' && (
            <DashboardPanel
              title="Manage jobs"
              description="Review active job posts and remove listings that are no longer open."
              action={<Link to="/employer/post-job" className="text-sm font-semibold text-blue-700 hover:text-blue-900">Post new</Link>}
            >
              {jobActionError && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{jobActionError}</p>}
              <JobsTable
                jobs={jobs}
                loading={loading}
                error={error}
                onDelete={async (jobId) => {
                  setJobActionError('');
                  try {
                    await removeJob(jobId);
                  } catch (error) {
                    setJobActionError(error.data?.error || 'Failed to delete job');
                  }
                }}
              />
            </DashboardPanel>
          )}

          {currentView === 'requests' && (
            <section className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <PipelineCard label="New" value={requestRows.filter((request) => request.status === 'New').length} />
                <PipelineCard label="Reviewing" value={requestRows.filter((request) => request.status === 'Reviewing').length} />
                <PipelineCard label="Interview ready" value={requestRows.filter((request) => request.status === 'Interview' || request.status === 'Shortlisted').length} />
              </div>

              <DashboardPanel
                title="Applicant requests"
                description="Prioritize candidates and track where each request sits in the demo pipeline."
              >
                {requestRows.length === 0 ? (
                  <p className="text-sm text-gray-500">No applicant requests yet.</p>
                ) : (
                  <RequestsTable requests={requestRows} />
                )}
              </DashboardPanel>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ label, value, helper, icon }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="mt-3 text-3xl font-extrabold text-gray-950">{value}</p>
      </div>
      <div className="grid h-11 w-11 place-items-center rounded-md bg-blue-50 text-blue-700">
        {React.createElement(icon, { className: 'text-2xl' })}
      </div>
    </div>
    <p className="mt-3 text-sm text-gray-500">{helper}</p>
  </div>
);

const PipelineCard = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-semibold text-gray-500">{label}</p>
    <p className="mt-2 text-3xl font-extrabold text-blue-700">{value}</p>
  </div>
);

const DashboardPanel = ({ title, description, action, children }) => (
  <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
    <div className="mb-5 flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="text-xl font-extrabold text-gray-950">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {action}
    </div>
    {children}
  </section>
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
            <th className="py-3 pr-4">Role</th>
            <th className="py-3 pr-4">Location</th>
            <th className="w-28 py-3 pr-4 whitespace-nowrap">Type</th>
            <th className="py-3 pr-4 whitespace-nowrap">Salary</th>
            <th className="py-3 pr-4 whitespace-nowrap">Posted</th>
            {onDelete && <th className="py-3 pr-4 text-right">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr key={job._id || job.id} className="text-sm text-gray-700">
              <td className="py-4 pr-4">
                <p className="font-semibold text-gray-950">{job.title}</p>
                <p className="mt-1 text-xs text-gray-500">{job.company?.name || 'Workplace Employer'}</p>
              </td>
              <td className="py-4 pr-4">
                <span className="inline-flex items-center gap-1">
                  <MdLocationOn className="text-base text-gray-400" />
                  {job.location}
                </span>
              </td>
              <td className="w-28 py-4 pr-4">
                <span className="inline-flex min-w-20 justify-center whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold leading-5 text-gray-700">
                  {job.type}
                </span>
              </td>
              <td className="py-4 pr-4 font-semibold whitespace-nowrap text-gray-900">${Number(job.salary || 0).toLocaleString()}</td>
              <td className="py-4 pr-4">
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <MdEvent className="text-base text-gray-400" />
                  {job.postDate || 'Recently'}
                </span>
              </td>
              {onDelete && (
                <td className="py-4 pr-4 text-right">
                  <button
                    type="button"
                    onClick={() => onDelete(job._id || job.id)}
                    className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-red-200 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                  >
                    <MdDeleteOutline className="text-lg" />
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

const RequestList = ({ requests }) => {
  if (requests.length === 0) return <p className="text-sm text-gray-500">No applicant requests yet.</p>;

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <div key={request.id} className="rounded-md border border-gray-200 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-950">{request.candidate}</p>
              <p className="mt-1 text-xs text-gray-500">{request.jobTitle}</p>
            </div>
            <StatusBadge status={request.status} />
          </div>
        </div>
      ))}
    </div>
  );
};

const RequestsTable = ({ requests }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-500">
          <th className="py-3 pr-4">Candidate</th>
          <th className="py-3 pr-4">Job</th>
          <th className="py-3 pr-4">Fit</th>
          <th className="py-3 pr-4">Submitted</th>
          <th className="py-3 pr-4">Status</th>
          <th className="py-3 pr-4 text-right">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {requests.map((request) => (
          <tr key={request.id} className="text-sm text-gray-700">
            <td className="py-4 pr-4">
              <p className="font-semibold text-gray-950">{request.candidate}</p>
              <p className="mt-1 text-xs text-gray-500">{request.email}</p>
            </td>
            <td className="py-4 pr-4">{request.jobTitle}</td>
            <td className="py-4 pr-4 font-semibold text-gray-900">{request.fit}</td>
            <td className="py-4 pr-4">{request.submitted}</td>
            <td className="py-4 pr-4">
              <StatusBadge status={request.status} />
            </td>
            <td className="py-4 pr-4 text-right">
              <button type="button" className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-800">
                Review
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusStyles[status] || statusStyles.New}`}>
    {status}
  </span>
);

const JobForm = ({ jobData, errors, submitting, onChange, onSubmit }) => (
  <form className="space-y-5" onSubmit={onSubmit}>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormInput label="Job Title" name="title" value={jobData.title} onChange={onChange} error={errors.title} placeholder="Software Engineer" />
      <FormInput label="Location" name="location" value={jobData.location} onChange={onChange} error={errors.location} placeholder="Hong Kong" />
      <FormInput label="Salary" name="salary" type="number" value={jobData.salary} onChange={onChange} error={errors.salary} placeholder="50000" />
      <div>
        <label htmlFor="type" className="block text-sm font-semibold text-gray-800">Job Type</label>
        <select
          id="type"
          name="type"
          value={jobData.type}
          onChange={onChange}
          className="mt-2 min-h-11 block w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

    {errors.api && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errors.api}</p>}
    {errors.success && <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{errors.success}</p>}

    <button
      type="submit"
      disabled={submitting}
      className="flex min-h-11 w-full justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
    >
      {submitting ? 'Posting...' : 'Post job'}
    </button>
  </form>
);

const FormInput = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-800">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="mt-2 min-h-11 block w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      placeholder={placeholder}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

const FormTextarea = ({ label, name, value, onChange, error, placeholder, rows = '4' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-800">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      placeholder={placeholder}
      rows={rows}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default EmployerDashboard;
