// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated on component mount
    const token = localStorage.getItem("SSTToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    const token = localStorage.getItem("SSTToken");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("SSTToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
