import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  const subjectOptions = ['WAD', 'CN', 'DSBDA', 'CC', 'WADL', 'CNL', 'DSBDAL', 'CC L'];

  // Dummy data for the table
  const generateDummyData = () => {
    const data = [];
    for (let i = 0; i <= 5; i++) {
      const assignmentMarks = Array(10).fill(0).map(() => Math.floor(Math.random() * 10) + 1);
      const unitTest1Marks = Math.floor(Math.random() * 31); // Random value between 0 and 30
      const unitTest2Marks = Math.floor(Math.random() * 31); // Random value between 0 and 30
      const attendancePercentage = Math.floor(Math.random() * 51) + 50; // Random value between 50 and 100


      data.push({
        name: ` ${subjectOptions[i]}`,
        assignment: true,
        assignmentDetailsVisible: false,
        assignmentMarks,
        unitTest1Marks,
        exAssmt1:unitTest1Marks >= 12,
        unitTest2Marks,
        exAssmt2:unitTest2Marks >= 12,
        attendancePercentage,
        letter: attendancePercentage >= 75,
        overall: (data.assignment && data.exAssmt1 && data.exAssmt2 && data.letter),
        
      });
      // if(data.assignment===true &&data.exAssmt1===true && data.exAssmt2===true && data.letter===true ){
      //   data.overall=true;
      // }
      // console.log(data.overall);
    }
    return data;
  };

  const handleLogout = () => {
    // Clear the JWT token from local storage
    AuthService.logout();
    // Redirect to Home after logout
    navigate('/');
  };

  const handleToggleAssignmentDetails = (index) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index].assignmentDetailsVisible = !newData[index].assignmentDetailsVisible;
      return newData;
    });
  };

  useEffect(() => {
    const data = generateDummyData();
    setTableData(data);
  }, []); 

  return (
    <div className="admin-dashboard-container mx-5 p-4 bg-blue-100 rounded-md">
      <h1 className="text-3xl font-semibold mb-4 text-center">Submission status table</h1>

      {/* Table Section */}
       
        <table className="border-collapse w-full mt-8 bg-white rounded-md overflow-hidden">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Subject</th>
              <th className="py-2 px-4">Assignment</th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} className="py-2 px-4">As{i + 1}</th>
              ))}
              <th className="py-2 px-4" colSpan="12">Unit Test 1</th>
              <th className="py-2 px-4" colSpan="12">Ex.As1</th>
              <th className="py-2 px-4" colSpan="12">Unit Test 2</th>
              <th className="py-2 px-4" colSpan="12">Ex.As2</th>
              <th className="py-2 px-4" colSpan="2">Attendance</th>
              <th className="py-2 px-4" colSpan="2">Letter</th>
              <th className="py-2 px-4">Overall</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-4 px-4">{data.name}</td>
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={data.assignment}
                  />
                </td>
                {data.assignmentMarks.map((mark, i) => (
                  <td key={i} className="py-2 px-4">{` ${mark}`}</td>
                ))}
                <td className="py-2 px-4" colSpan="12">
                  <span>{data.unitTest1Marks}</span>
                </td>
                <td className="py-2 px-4" colSpan="12">
                  
                    <input
                      type="checkbox"
                      checked={data.exAssmt1}
                    />
                  
                </td>
                <td className="py-2 px-4" colSpan="12">
                  <span>{data.unitTest2Marks}</span>
                </td>
                <td className="py-2 px-4" colSpan="12">
                 
                    
                    <input
                      type="checkbox"
                      checked={data.exAssmt2}
                      
                    />
                  
                </td>
                <td className="py-2 px-4" colSpan="2">
                  <span>{data.attendancePercentage}</span>
                </td>
                <td className="py-2 px-4" colSpan="2">
                  
                    <input
                      type="checkbox"
                      checked={data.letter}
                      
                    />
                  
                </td>
                <td className="py-2 px-4"colSpan="2" >
                  <input
                    type="checkbox"
                    checked={data.overall}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mb-4">
        <button className="bg-green-500 my-10 mx-10 text-white py-2 px-4 rounded">
          Export as PDF
        </button>
      </div>

     
    </div>
  );
};

export default AdminDashboard;
