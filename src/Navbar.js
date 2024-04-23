import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const baseurl = "https://smart-submission-ticket.gopalsaraf.com/api/v2";
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("i am here");
    const token = localStorage.getItem("SSTToken");

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    
    fetch(`${baseurl}/login`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    console.log(requestOptions);
    // console.log(result);
    // console.log(error);
      // try {
      //   const response =  fetch(`${baseurl}/login`, {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-auth-token": token,
      //     },
      //   });

      //  if(response.ok){
      //   console.log("yes");
      //  }
      //  else{
      //   console.log("No");
      //  }
    
      // } catch (error) {
      //   console.error("Error deleting login:", error);
      // }
    
    // deleteLogin();
        // Clear the JWT token from local storage

    logout();
    
    // Redirect to Home after logout
    //window.location.href = '/'; // Use window.location.href to force a full page reload
    navigate('/Home');

  };

  return (
    <nav className="bg-white p-2 print:hidden">
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
