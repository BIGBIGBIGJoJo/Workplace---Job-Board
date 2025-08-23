import React, { useContext, useState } from 'react';

const LogInPage = () => {
  const [activeTab, setActiveTab] = useState('employee');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [logged, setLogged] = useState(false);


  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      setError('Please fill in your email or Password.');
      return;
    }

    //Login API call
    const userType = activeTab;
    const email = userEmail;
    const password = userPassword;
    const res = await fetch("/api/authentication", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userType, email, password })
    })
      .then(req => req.json())
      .then(data => {

        if (data.matched) {
          setLogged(true);
          console.log(logged);
        } else {
          setLogged(false);
        }
        console.log(logged);
      })
  };

  const handleForgotuserPassword = (userType) => {
  };

  const handleSignUp = (userType) => {
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center font-semibold ${activeTab === 'employee' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } rounded-l-lg focus:outline-none`}
            onClick={() => handleTabSwitch('employee')}
          >
            Employee
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold ${activeTab === 'employer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } rounded-r-lg focus:outline-none`}
            onClick={() => handleTabSwitch('employer')}
          >
            Employer
          </button>
        </div>
        <div>

          {
            activeTab === 'employee' ?
              (<h2 className="text-xl font-bold mb-4 text-center">Employee Login</h2>) :
              (<h2 className="text-xl font-bold mb-4 text-center">Employer Login</h2>)
          }

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 active:bg-blue-700"
            >
              Login
            </button>

            {/* login by google etc. */}
            <button
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center gap-2"
            >
              Login with Google
            </button>

            <div className="flex justify-between text-sm">
              <button
                onClick={() => handleForgotuserPassword('Employee')}
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
              <button
                onClick={() => handleSignUp('Employee')}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {message && <p className="text-green-500 mt-2">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
