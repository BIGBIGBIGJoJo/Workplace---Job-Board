import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdLockReset, MdOutlineMail } from 'react-icons/md';
import { api } from '../../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setSubmitted(false);
    setSubmitting(true);

    try {
      await api.forgotPassword({ email });
      setSubmitted(true);
    } catch (error) {
      setErrors(error.data?.errors || { form: 'Reset request failed. Try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden bg-gray-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">Account recovery</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight">Get back into your Workplace account.</h1>
            <p className="mt-4 text-base leading-7 text-gray-300">
              Use the email tied to your job seeker or employer account. The reset flow keeps account access separate from public job browsing.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Security note</p>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              The response stays generic so the page does not reveal whether an email is registered.
            </p>
          </div>
        </aside>

        <section className="p-6 sm:p-10">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            <MdArrowBack className="text-lg" />
            Back to sign in
          </Link>

          <div className="mt-8">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-blue-700">
              <MdLockReset className="text-3xl" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-700">Forgot password</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-950">Request a reset link</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Enter your account email. If it matches a Workplace account, reset instructions can be sent once email delivery is connected.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="reset-email" className="block text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <div className="mt-2 flex min-h-12 items-center rounded-md border border-gray-300 bg-white px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <MdOutlineMail className="mr-2 text-xl text-gray-400" />
                <input
                  required
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-w-0 flex-1 text-sm outline-none"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {errors.form && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errors.form}</p>
            )}

            {submitted && (
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
                Reset request received. The account recovery email service still needs to be connected for real delivery.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex min-h-12 w-full items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {submitting ? 'Sending request...' : 'Send reset instructions'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
