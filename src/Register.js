import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import { useAuth } from './AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [registrationInfo, setRegistrationInfo] = useState({
    rollNo: '', 
    name: '',
    classDiv: '',
    mobileNo: '',
    abcId: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('backend_url/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response === 200) {
        setIsOtpSent(true);
        setIsEmailSubmitted(true);
        setError('');
        console.log('Email sent successfully');
      } else {
        throw new Error('This email is not in our database.');
      }
    } catch (error) {
      setError('Failed to send email');
      console.error('Error sending email:', error);
    }

  };


  const handleOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('backend_url/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response === 200) {
        setError('');
        setIsOtpCorrect(true);
        // Proceed to the registration form 
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error('Error verifying OTP:', error);
    }
  };


  const handleCompleteRegistration = async (e) => {
    e.preventDefault();

    // Backend API call to store registration data
    try {
      const response = await fetch('backend_url/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationInfo),
      });

      if (response.ok) {
        // Registration successful, redirect to AdminPage

        // Assuming the backend sends a JWT token upon successful registration
        const token = 'your_generated_jwt_token';

        // Store the JWT token
        AuthService.login(token);
        login(token);
        console.log('Registration successful!');
        navigate('/AdminPage');
      } else {
        // Handle errors from the backend
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };


  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://pict.edu/images/slider/home1/College%20Photo%2023%20Feb%202023.jpg')`,
      }}
    >
      {/* Email Form */}
      {!isOtpSent && !isEmailSubmitted && (
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 rounded-md shadow-lg bg-blue-100">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register - Email</h2>
            <form onSubmit={handleSubmitEmail}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email id:
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

              <div className="text-center">
                <button
                  type="submit"
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Form */}
      {isOtpSent && !isOtpCorrect && (
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 rounded-md shadow-lg bg-blue-100">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Enter OTP</h2>
            <form onSubmit={handleOTP}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP:
                </label>
                <input
                  type="text"
                  id="otp"
                  className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${error && 'border-red-500'
                    }`}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {isOtpCorrect && (
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 rounded-md shadow-lg bg-blue-100">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Registration</h2>
            <form onSubmit={handleCompleteRegistration}>
              <div className="mb-4">
                <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">
                  Roll No:
                </label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  placeholder="Enter Roll No"
                  value={registrationInfo.rollNo}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  placeholder="Enter Name"
                  value={registrationInfo.name}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="classDiv" className="block text-sm font-medium text-gray-700">
                  Class/Div:
                </label>
                <input
                  type="text"
                  id="classDiv"
                  name="classDiv"
                  className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  placeholder="Enter Class/Div"
                  value={registrationInfo.classDiv}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                  Mobile No:
                </label>
                <input
                  type="mobileNo"
                  name="mobileNo"
                  className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  placeholder="Enter Mobile No"
                  value={registrationInfo.mobileNo}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="abcId" className="block text-sm font-medium text-gray-700">
                  ABC ID:
                </label>
                <input
                  type="text"
                  id="abcId"
                  name="abcId"
                  className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  placeholder="Enter ABC ID"
                  value={registrationInfo.abcId}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter Password"
                  value={registrationInfo.password} 
                  onChange={handleRegistrationChange}
                  required
                />
              </div>


              <div className="text-center">
                <button
                  type="submit"
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200 text-white rounded-md"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
//
export default Register;
