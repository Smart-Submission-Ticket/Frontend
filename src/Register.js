import React, { useState,useEffect } from 'react';
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
  const [userType, setUserType] = useState('Student');
  const [loadingtop, setLoadingTop] = useState(false); // Track loading state top one

  const [registrationInfo, setRegistrationInfo] = useState({
    email: '',   //
    password: '',
    name: '',
    rollNo: '', //
    batch: '',  //
    class: '',  //
    year: '',   //
    abcId: '',
    token: '',  //
    mobile: '' 
  });

  const [registrationInfoTeacher, setRegistrationInfoTeacher] = useState({
    email: '',   //
    password: '',
    name: '',
    token: '',  //
  });

  const baseurl = 'https://smart-submission-ticket.gopalsaraf.com/api/v2';

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const checkAuthentication = () => {
      if (AuthService.isAuthenticated()) {
        const userType = localStorage.getItem('SSTusertype')
        if (userType==='Teacher') {
          navigate('/AdminPage');
        } else if(userType==='Student'){
          navigate('/UserPage');
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  const setRegistrationData = (data) => {
    if (userType === 'Student') {
      setRegistrationInfo(prevInfo => ({
        ...prevInfo,
        rollNo: data.rollNo,
        class: data.class,
        email: data.email,
        year: data.year,
        batch: data.batch,
      }));
    }
    else if (userType === 'Teacher') {
      console.log(email);
      setRegistrationInfoTeacher(prevInfo => ({
        ...prevInfo,
        email: email,
      }));
    }
    else {
      console.log('Select one user type');
    }

  };

  const setRegistrationDataToken = (data) => {
    if (userType === 'Student') {
      setRegistrationInfo(prevInfo => ({
        ...prevInfo,
        token: data.token,
      }));
    }
    else if (userType === 'Teacher') {
      setRegistrationInfoTeacher(prevInfo => ({
        ...prevInfo,
        token: data.token,
      }));
    }
    else {
      console.log('Select one user type');
    }

  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    console.log(userType);
    setLoadingTop(true);
    try {
      let url = '';
      if (userType === 'Student') {
        url = `${baseurl}/register/student/verify-email`;
      } else if (userType === 'Teacher') {
        url = `${baseurl}/register/teacher/verify-email`;
      }
      console.log(url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      var data = await response.json();
      if (response.status === 200) {
        setIsOtpSent(true);
        setIsEmailSubmitted(true);
        setError('');
        console.log('Email sent successfully');

        // Update registrationInfo with rollNo and classDiv from data.student
        console.log(data.message);
        console.log(data.student);
        console.log(userType);
        // Update registrationInfo with rollNo and classDiv from data.student
        if (userType === 'Student') {
          setRegistrationData(data.student);
        }
        else if (userType === 'Teacher') {
          setRegistrationData(data);
        }
        else {
          console.log('Select one user type')
        }
      } else {
        throw new Error('This email is not in our database.');
      }
    } catch (error) {
      setError(data.message);
      console.error('Error sending email:', error);
    }
    setLoadingTop(false);

  };


  const handleOTP = async (e) => {
    e.preventDefault();
    setLoadingTop(true);

    try {
      setError('');
      let url = '';
      if (userType === 'Student') {
        url = `${baseurl}/register/student/verify-otp`;
      } else if (userType === 'Teacher') {
        url = `${baseurl}/register/teacher/verify-otp`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.status === 200) {
        setError('');
        setIsOtpCorrect(true);

        const data = await response.json();
        console.log(data.message);
        console.log(data.token);
        setRegistrationDataToken(data);
        // AuthService.login(jwt_token);
        // login(jwt_token);

      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error('Error verifying OTP:', error);
    }
    setLoadingTop(false);

  };


  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setLoadingTop(true);
    console.log(registrationInfoTeacher);
    try {
      let url = '';
      if (userType === 'Student') {
        url = `${baseurl}/register/student`;
        if (registrationInfo.mobile.length !== 10 || isNaN(registrationInfo.mobile)) {
          alert('Mobile number must be exactly 10 digits long and contain only numbers.');
          return; 
        }
      } else if (userType === 'Teacher') {
        url = `${baseurl}/register/teacher`;
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userType === 'Student' ? registrationInfo : registrationInfoTeacher),
      });
      console.log(response);
      if (response.status === 201) {
        // Registration successful, redirect to AdminPage

        // Assuming the backend sends a JWT token upon successful registration

        // Store the JWT token

        const token = response.headers.get('X-Auth-Token'); // Get the token from the response headers
        localStorage.setItem('SSTToken', token); // Save the token to local storage with the key 'SSTToken'
        console.log(token);
        login();
        console.log('Registration successful!');
        console.log(userType);
        if (userType === 'Student') {
          localStorage.setItem('SSTusertype', 'Student'); 
          navigate('/UserPage');
        }
        else if (userType === 'Teacher') {
          localStorage.setItem('SSTusertype', 'Teacher'); 
          navigate('/AdminPage');
        }
        else {
          console.log("nope");
        }


      } else {
        // Handle errors from the backend
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
    console.log(userType === 'Student' ? registrationInfo : registrationInfoTeacher);
    setLoadingTop(false);
  };



  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/College-Photo-23-Feb-2023.webp)`,
      }}
    >
      {/* Email Form */}
      {!isOtpSent && !isEmailSubmitted && (
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full p-6 rounded-md shadow-lg bg-blue-100">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
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

              <div className="mb-4">
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                  Are you a student or a teacher?
                </label>
                <select
                  id="userType"
                  name="userType"
                  className="mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={userType}
                  onChange={handleUserTypeChange}
                  required
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
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
              {userType === 'Teacher' ? (
                <>
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
                      value={registrationInfoTeacher.name}
                      onChange={(e) =>
                        setRegistrationInfoTeacher((prevInfo) => ({ ...prevInfo, name: e.target.value }))
                      }
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
                      value={registrationInfoTeacher.password}
                      onChange={(e) =>
                        setRegistrationInfoTeacher((prevInfo) => ({ ...prevInfo, password: e.target.value }))
                      }
                      required
                    />
                  </div>
                </>
              ) : (
                <>
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
                      readOnly
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
                      value={registrationInfo.class}
                      onChange={handleRegistrationChange}
                      required
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
                      Batch:
                    </label>
                    <input
                      type="text"
                      id="batch"
                      name="batch"
                      className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                      placeholder="Enter Batch"
                      value={registrationInfo.batch}
                      readOnly
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                      Mobile No:
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      className={`mt-1 block w-full rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                      placeholder="Enter Mobile No"
                      value={registrationInfo.mobile}
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
                </>
              )}
               {loadingtop && (
                <div className="fixed top-0 left-0 w-full flex justify-center items-center z-50 mt-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
               )}
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

export default Register; 
