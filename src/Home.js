import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

function Home() {
  const [isAdmin, setAdmin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      if (AuthService.isAuthenticated()) {
        if (isAdmin) {
          navigate('/AdminPage');
        } else {
          navigate('/UserPage');
        }
      }
    };

    checkAuthentication();
  }, [isAdmin, navigate]);

  const adminChange = () => {
    setAdmin(!isAdmin);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://pict.edu/images/slider/home1/College%20Photo%2023%20Feb%202023.jpg')`,
      }}
    >
      {/* Transparent Logo */}
      <div className="absolute top-0 mt-8">
        <img
          src="https://pict.edu/images/pic.jpg"
          alt="PICT Logo"
          className="rounded-full"
        />
      </div>

      <div className="bg-white bg-opacity-75 p-8 max-w-md mx-auto rounded-md shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-6">
          Welcome to the automated submission ticket system of PICT!
        </h1>

        <div className="flex justify-between mb-4">
          <button
            className={`py-2 px-4 rounded ${'bg-indigo-500 text-white'}`}
            onClick={() => navigate('/Register')}
          >
            Register
          </button>
          <button
            className={`py-2 px-4 rounded ${'bg-indigo-500 text-white'}`}
            onClick={() => navigate('/Login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
