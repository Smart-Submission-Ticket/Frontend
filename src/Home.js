import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

function Home() {
  const navigate = useNavigate();

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


  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/College-Photo-23-Feb-2023.webp)`,
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
