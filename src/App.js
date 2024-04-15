import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 
import Login from './login';
import AdminPage from './AdminDashboard';
import UserPage from './UserDashboard';
import Navbar from './Navbar';
import Home from './Home';
import Register from './Register';
import SubmisstionT from './SubmissionT';
import { useAuth } from './AuthContext';
// authentic one 
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/AdminPage' element={<AdminPage />} />
            <Route path="/UserPage" element={<UserPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SubmissionT"  element={<SubmisstionT />} />
            <Route render={() => <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
