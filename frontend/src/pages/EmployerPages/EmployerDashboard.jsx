import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    type: 'full-time',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate form inputs
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('/api/post-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        alert('Job posted successfully!');
        setJobData({
          title: '',
          description: '',
          location: '',
          salary: '',
          type: 'full-time',
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        setErrors({ api: errorData.error || 'Failed to post job' });
      }
    } catch (error) {
      console.error('Error posting job:', error);
      setErrors({ api: 'Network error. Please try again.' });
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-65 bg-white shadow-xl flex flex-col space-y-4">

        <div className="grid place-items-center w-full h-20 bg-blue-300">
          <h2 className="text-2xl font-bold text-gray-900 m-auto">Employer Dashboard</h2>
        </div>

        <nav className="space-y-2">
          <Link
            to="/employer/post-job"
            className="block py-2 px-4 text-sm font-medium text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            Post Job
          </Link>
          <Link
            to="/employer/view-request"
            className="block py-2 px-4 text-sm font-medium text-gray-700 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            View Requests
          </Link>
        </nav>
      </div>

      {/* Main Content: Job Posting Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-xl">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Post a New Job
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Fill in the details to create a job listing
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Job Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={jobData.title}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
                  placeholder="Software Engineer"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Job Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 block w-full rounded-lg outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
                  placeholder="Describe the job responsibilities..."
                  rows="4"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={jobData.location}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
                  placeholder="New York, NY"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  id="salary"
                  name="salary"
                  type="number"
                  value={jobData.salary}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
                  placeholder="50000"
                />
                {errors.salary && (
                  <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
                )}
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <div className="mt-2 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="full-time"
                      checked={jobData.type === 'full-time'}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Full-Time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="part-time"
                      checked={jobData.type === 'part-time'}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Part-Time</span>
                  </label>
                </div>
              </div>
            </div>

            {/* API Error */}
            {errors.api && (
              <p className="text-sm text-red-600 text-center">{errors.api}</p>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;