import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { MdBusinessCenter, MdOutlinePersonSearch } from "react-icons/md";
import LoggingContext from '../../tool/logging/LoggingContext';
import UserDataContext from '../../tool/userData/UserDataContext';

const SignUpPage = () => {
  const nav = useNavigate();
  const { setLogged } = useContext(LoggingContext);
  const { setUser } = useContext(UserDataContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'jobseeker',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    // Signing API call
    try {
      const data = await api.signup(formData);
      setErrors({});
      setUser(data.user);
      setLogged(true);
      data.user?.role === "employer" ? nav("/employer") : nav("/");
    } catch (error) {
      setErrors(error.data?.errors || { form: "Unexpected error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl lg:grid-cols-[1.1fr_0.9fr]">
        <section className="p-6 sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Create account</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-950">
              Join Workplace
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Tell us who you are so the app can start you on the right workflow.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Joe"
              />
              <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Mok"
              />
            </div>

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="At least 8 characters"
            />

            <fieldset>
              <legend className="block text-sm font-semibold text-gray-800">Account type</legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <label className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition ${
                  formData.role === 'jobseeker' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
                }`}>
                  <input
                    required
                    type="radio"
                    name="role"
                    value="jobseeker"
                    checked={formData.role === 'jobseeker'}
                    onChange={handleChange}
                    className="mt-1 text-blue-600"
                  />
                  <span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <MdOutlinePersonSearch className="text-lg text-blue-700" />
                      Job Seeker
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-gray-600">Search roles and apply from job details.</span>
                  </span>
                </label>
                <label className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition ${
                  formData.role === 'employer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
                }`}>
                  <input
                    required
                    type="radio"
                    name="role"
                    value="employer"
                    checked={formData.role === 'employer'}
                    onChange={handleChange}
                    className="mt-1 text-blue-600"
                  />
                  <span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <MdBusinessCenter className="text-lg text-blue-700" />
                      Employer
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-gray-600">Post jobs and manage applicant requests.</span>
                  </span>
                </label>
              </div>
            </fieldset>

            {errors.form && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex min-h-12 w-full justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {submitting ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-700 hover:text-blue-900">
                Sign in
              </Link>
            </p>
          </form>
        </section>

        <aside className="hidden bg-gray-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">Built for both sides</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight">Start with the account that matches your goal.</h1>
            <p className="mt-4 text-base leading-7 text-gray-300">
              Workplace keeps job seeker and employer flows separate, so each user lands on the tools they actually need.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-gray-300">
            <div className="rounded-lg border border-white/10 p-4">
              <p className="font-semibold text-white">Clear profile setup</p>
              <p className="mt-1">Job seekers can protect and complete their profile before applying.</p>
            </div>
            <div className="rounded-lg border border-white/10 p-4">
              <p className="font-semibold text-white">Employer dashboard</p>
              <p className="mt-1">Employers get posting and management tools immediately after registration.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const FormInput = ({ label, name, type = "text", value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-800">
      {label}
    </label>
    <input
      required
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="mt-2 min-h-12 block w-full rounded-md border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      placeholder={placeholder}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default SignUpPage;
