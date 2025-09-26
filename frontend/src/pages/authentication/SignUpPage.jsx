import React, { useState } from 'react';
import { data, Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'jobseeker',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Signing API call
    console.log('Form submitted:', formData);
    try {
      const res = await fetch('/api/signing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json();

      console.log('Res: ', data);
      if (!res.ok) {                        // failed signing
        setErrors(data.errors);
      } else {                              // successful signing
        setErrors({});
        formData.role === "jobseeker" ? nav("/home") : nav("/employer");
      }

    } catch (error) {
      setErrors(error);
      console.log("Unexpected error occured:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Join Our Job Board
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account to start your job search or post opportunities
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  required
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
                  placeholder="Joe"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  required
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
                  placeholder="Mama"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                required
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 px-2 py-1 block w-full rounded-full outline-gray-200 shadow-sm hover:outline-1 sm:text-sm transition-all duration-200"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                I am a:
              </label>
              <div className="mt-2 flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    required
                    type="radio"
                    name="role"
                    value="jobseeker"
                    checked={formData.role === 'jobseeker'}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Job Seeker</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    required
                    type="radio"
                    name="role"
                    value="employer"
                    checked={formData.role === 'employer'}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Employer</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;