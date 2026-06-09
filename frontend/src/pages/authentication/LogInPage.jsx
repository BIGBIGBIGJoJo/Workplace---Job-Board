import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import LoggingContext from '../../tool/logging/LoggingContext';
import { Link, useNavigate } from 'react-router-dom';
import UserDataContext from "../../tool/userData/UserDataContext";
import { api } from "../../services/api";
import { loadGoogleIdentity } from '../../services/googleIdentity';
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdOutlineMailLock, MdWorkOutline } from "react-icons/md";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const getDashboardPath = (role) => (role === "employer" ? "/employer" : "/");

const LogInPage = () => {
  const nav = useNavigate();
  const googleButtonRef = useRef(null);
  
  const [rememberMe, setRememberMe] = useState(() => {
    const storedValue = localStorage.getItem('rememberMe');
    return storedValue === 'true';
  });

  const [formData, setFormData] = useState({
    email: rememberMe ? localStorage.getItem('rememberedEmail') : '',
    password: '',
    tab: rememberMe ? localStorage.getItem('rememberedTab') : 'employee',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [googleState, setGoogleState] = useState({
    loading: Boolean(googleClientId),
    ready: false,
    error: "",
  });

  const { setLogged } = useContext(LoggingContext);
  const { setUser } = useContext(UserDataContext);

  const handleTabSwitch = (selectedTab) => {
    setErrors({});
    setFormData({...formData, tab: selectedTab });
  };

  const rememberSession = useCallback((user, tab) => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', user?.email || formData.email);
      localStorage.setItem('rememberedTab', tab);
      localStorage.setItem('rememberMe', 'true');
      return;
    }

    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedTab');
    localStorage.setItem('rememberMe', 'false');
  }, [formData.email, rememberMe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    // Login API call
    try {
      const data = await api.login(formData);

      if (data.matched) {
        setUser(data.user);
        rememberSession(data.user, data.user?.role || formData.tab);
        setLogged(true);
        nav(getDashboardPath(data.user?.role || formData.tab));
      } else {
        setLogged(false);
        setErrors(data.errors)
      }
    } catch (error) {
      setLogged(false);
      setErrors(error.data?.errors || { form: "Server error. Try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleCredential = useCallback(async (response) => {
    setErrors({});
    setGoogleState((currentState) => ({ ...currentState, error: "" }));

    try {
      const data = await api.googleLogin({
        credential: response.credential,
        role: formData.tab === "employer" ? "employer" : "jobseeker",
      });

      if (!data.matched) {
        setLogged(false);
        setErrors(data.errors || { form: "Google login failed." });
        return;
      }

      setUser(data.user);
      rememberSession(data.user, data.user?.role || formData.tab);
      setLogged(true);
      nav(getDashboardPath(data.user?.role || formData.tab));
    } catch (error) {
      setLogged(false);
      setErrors(error.data?.errors || { form: "Google login failed. Try again later." });
    }
  }, [formData.tab, nav, rememberSession, setLogged, setUser]);

  useEffect(() => {
    if (!googleClientId) {
      setGoogleState({
        loading: false,
        ready: false,
        error: "Google login needs VITE_GOOGLE_CLIENT_ID.",
      });
      return undefined;
    }

    let cancelled = false;

    loadGoogleIdentity()
      .then((google) => {
        if (cancelled || !googleButtonRef.current) return;

        googleButtonRef.current.innerHTML = "";
        google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredential,
        });
        google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "rectangular",
          text: "signin_with",
          width: 400,
        });
        setGoogleState({ loading: false, ready: true, error: "" });
      })
      .catch(() => {
        if (cancelled) return;
        setGoogleState({
          loading: false,
          ready: false,
          error: "Google login could not load.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [handleGoogleCredential]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden bg-blue-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">Workplace Access</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight">Sign in and keep your hiring work moving.</h1>
            <p className="mt-4 text-base leading-7 text-blue-50">
              Job seekers can manage profiles and applications. Employers can post roles, review listings, and track requests.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-blue-50">
            <div className="rounded-lg bg-white/10 p-4">
              <p className="font-semibold text-white">Job seekers</p>
              <p className="mt-1">Search listings, save profile details, and apply from protected job pages.</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="font-semibold text-white">Employers</p>
              <p className="mt-1">Manage job posts and monitor applicant activity from one dashboard.</p>
            </div>
          </div>
        </aside>

        <section className="p-6 sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Sign in</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-950">
              {formData.tab === 'employee' ? 'Employee account' : 'Employer account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose your account type before signing in so Workplace sends you to the right dashboard.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              className={`flex min-h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold transition ${
                formData.tab === 'employee'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => handleTabSwitch('employee')}
            >
              <MdOutlineMailLock className="text-lg" />
              Employee
            </button>
            <button
              type="button"
              className={`flex min-h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold transition ${
                formData.tab === 'employer'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => handleTabSwitch('employer')}
            >
              <MdWorkOutline className="text-lg" />
              Employer
            </button>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 min-h-12 block w-full rounded-md border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                required
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 min-h-12 block w-full rounded-md border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your password"
              />
            </div>

            {errors.form && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errors.form}</p>
            )}

            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center text-gray-700">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2">Remember me</span>
              </label>
              <Link
                to="/forget_password"
                className="font-semibold text-blue-700 hover:text-blue-900"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              <MdLockOutline className="text-lg" />
              {submitting ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">or</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="flex items-start gap-3 border-b border-gray-200 pb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm">
                  <FcGoogle className="text-xl" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Continue with Google</p>
                  <p className="mt-1 text-sm leading-5 text-gray-600">
                    We'll use your selected account type to send you to the right Workplace dashboard.
                  </p>
                </div>
              </div>

              {googleClientId ? (
                <div className="mt-4">
                  <div className="flex min-h-12 items-center justify-center">
                    {googleState.loading && (
                      <div className="flex min-h-11 w-full max-w-md items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600">
                        <FcGoogle className="text-xl" />
                        Loading Google sign in...
                      </div>
                    )}
                    <div
                      className={googleState.ready ? "block w-full max-w-md [&>div]:mx-auto" : "hidden"}
                      ref={googleButtonRef}
                    />
                  </div>
                  {googleState.error && (
                    <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                      {googleState.error}
                    </p>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-4 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-500"
                >
                  <FcGoogle className="text-xl" />
                  Google login needs setup
                </button>
              )}
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signing"
              className="font-semibold text-blue-700 hover:text-blue-900"
            >
              Create one
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default LogInPage;
