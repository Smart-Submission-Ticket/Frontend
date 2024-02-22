import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    // Clear the JWT token from local storage
    logout();
    // Redirect to Home after logout
    window.location.href = '/'; // Use window.location.href to force a full page reload
  };

  return (
    <nav className="bg-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="https://pict.edu/">
            <img
              src="https://img.collegepravesh.com/2017/02/PICT-Logo.jpg"
              alt="PICT Logo"
              className="h-10 w-auto"
            />
          </a>
        </div>
        <div className="flex space-x-4 items-center"> {/* Updated to include items-center */}
          <Link to="/" className="text-indigo-600 text-lg font-semibold ml-4">
            Home
          </Link>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdFn9ZeutXPa7dRvq9vbYqkFqkxn4k6ojv0x7RUVzL0tZttXw/viewform" className="text-indigo-600 ml-4">
            Website Feedback
          </a>
          <a href="https://pict.edu/about_us/" className="text-indigo-600 ml-4">
            About Us
          </a>
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-indigo-600 ml-4 cursor-pointer">
              Logout
            </button>
          )}
          {/*  Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
  