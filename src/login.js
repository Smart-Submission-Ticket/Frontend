import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Student');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    const baseurl = 'https://smart-submission-ticket.gopalsaraf.com';
    // Determine the URL based on the user type
    const url = userType === 'Student' ? `${baseurl}/api/login/student` : `${baseurl}/api/login/teacher`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const token = response.headers.get('X-Auth-Token'); // Get the token from the response headers
        localStorage.setItem('SSTToken', token); // Save the token to local storage with the key 'SSTToken'
        console.log(token);
        login();
        console.log('Login successful');
        console.log('User Type:', userType);

        if (userType === 'Teacher') {
          navigate('/AdminPage');
        } else if (userType === 'Student') {
          navigate('/UserPage');
        }
      } else {
        throw new Error('Login failed');
      }
      console.log(response);
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Login failed. Please check your credentials.');
    }
  };



  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://pict.edu/images/slider/home1/College%20Photo%2023%20Feb%202023.jpg')`,
      }}
    >
      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center ">
        <div className="max-w-md w-full p-6  rounded-md shadow-lg bg-blue-100">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 ">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${error && 'border-red-500'
                  }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                User Type
              </label>
              <select
                id="userType"
                className="mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <button
                  type="button"
                  className="text-indigo-600 hover:underline"
                  onClick={() => navigate('/Register')}
                >
                  Register
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
