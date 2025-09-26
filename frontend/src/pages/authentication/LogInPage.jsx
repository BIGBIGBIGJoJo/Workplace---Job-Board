import React, { useContext, useState } from 'react';
import LoggingContext from '../../tool/logging/LoggingContext';
import { Link, useNavigate } from 'react-router-dom';
import UserDataContext from "../../tool/userData/UserDataContext";

const LogInPage = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    tab: 'employee',
  });
  const [errors, setErrors] = useState({});

  const { setLogged } = useContext(LoggingContext);
  const { setUser } = useContext(UserDataContext);

  const handleTabSwitch = (selectedTab) => {
    setErrors({});
    setFormData({ email: '', password: '', tab: selectedTab });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Login API call
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setUser(data.user);
      console.log(data.user);

      if (data.matched) {
        setLogged(true);
        formData.tab === 'employee' ? nav("/") : nav('/employer');
      } else {
        setLogged(false);
        setErrors(data.errors)
      }
    } catch (error) {
      console.log("Error: ", error)
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
            {formData.tab === 'employee' ? 'Employee' : 'Employer'} Log In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your {formData.tab === 'employee' ? 'job opportunities' : 'hiring dashboard'}
          </p>
        </div>

        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-3 text-sm font-semibold ${formData.tab === 'employee'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-500'
              } focus:outline-none`}
            onClick={() => handleTabSwitch('employee')}
          >
            Employee
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold ${formData.tab === 'employer'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-500'
              } focus:outline-none`}
            onClick={() => handleTabSwitch('employer')}
          >
            Employer
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700">
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
              <label htmlFor="password" className="block text-sm text-gray-700">
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
            </div>
          </div>
          {errors.form && (
            <p className="mt-1 text-sm text-center text-red-600">{errors.form}</p>
          )}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <Link
              to="/forget_password"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Log In
            </button>
          </div>

          <div>
            <button
              type="button"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12 0C5.372 0 0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12 24 5.373 18.627 0 12 0z"
                  clipRule="evenodd"
                />
              </svg>
              Log in with Google
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signing"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;