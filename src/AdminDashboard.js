// src/AdminDashboard.js
import React, { useState } from 'react';
import { DownloadIcon } from "@heroicons/react/outline";

const AdminDashboard = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [tableData, setTableData] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const generateBatchOptions = () => {
        if (selectedDivision) {
            const divisionNumber = selectedDivision.slice(-1);
            const batchOptions = ['K', 'L', 'M', 'N'].map((batch) => `${batch}${divisionNumber}`);
            return batchOptions;
        }
        return [];
    };

    const yearOptions = ['FE', 'SE', 'TE', 'BE'];
    const divisionOptions = Array.from({ length: 13 }, (_, i) => i + 1);
    const subjectOptions = ['WAD', 'CN', 'DSBDA', 'CC', 'WADL', 'CNL', 'DSBDAL', 'CC L'];

    const isSubmitDisabled = !(selectedYear && selectedDivision && selectedBatch && selectedSubject);

    // Dummy data for the table
    const generateDummyData = () => {
        const data = [];
        var curr =33101;
        for (let i = 1; i <= 81; i++) {
            const assignmentMarks = Array(10).fill(0).map(() => Math.floor(Math.random() * 10) + 1);
            const unitTest1Marks = Math.floor(Math.random() * 31); // Random value between 0 and 30
            const unitTest2Marks = Math.floor(Math.random() * 31); // Random value between 0 and 30
            const attendancePercentage = Math.floor(Math.random() * 51) + 50; // Random value between 50 and 100

            data.push({
                name: `Student ${i}`,
                rollNo: curr,
                assignment: true,
                assignmentDetailsVisible: false,
                assignmentMarks,
                unitTest1Marks,
                exAssmt1: unitTest1Marks >= 12, 
                unitTest2Marks,
                exAssmt2: unitTest2Marks >= 12, 
                attendancePercentage,
                letter: attendancePercentage >= 75, 
                overall: true,
              });
              curr++;
        }
        return data;
    };

    const handleToggleAssignmentDetails = (index) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[index].assignmentDetailsVisible = !newData[index].assignmentDetailsVisible;
            return newData;
        });
    };

    const handleTableVisibility = () => {
        setShowTable(true);
        // dummy data setting , get the data from backend
        setTableData(generateDummyData());
    };

    return (
        <div className="admin-dashboard-container mx-5 p-4 bg-blue-100 rounded-md">
        <div className="flex space-x-10 mb-4">
          {/* Form Section */}
          <div className={`input-container border border-black rounded-lg p-4 flex-none flex items-center ${!selectedYear && 'border-red-500'}`}>
            <label className="text-xl font-bold text-gray-800 inline-block mr-4">Year:</label>
            <select
              className=" bg-white border  rounded-lg hover:border-gray-500 w-full py-2 px-4 text-gray-700 leading-tight"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
  
          <div className={`input-container border border-black rounded-lg p-4 flex-none flex items-center ${!selectedDivision && 'border-red-500'}`}>
            <label className="text-xl font-bold text-gray-800 inline-block mr-4">Division:</label>
            <select
              className=" bg-white border  rounded-lg hover:border-gray-500 w-full py-2 px-4 text-gray-700 leading-tight"
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
            >
              <option value="">Select Division</option>
              {divisionOptions.map((division) => (
                <option key={division} value={`D${division}`}>
                  {`D${division}`}
                </option>
              ))}
            </select>
          </div>
  
          <div className={`input-container border border-black rounded-lg p-4 flex-none flex items-center ${!selectedBatch && 'border-red-500'}`}>
            <label className="text-xl font-bold text-gray-800 inline-block mr-4">Batch:</label>
            <select
              className=" bg-white border rounded-lg hover:border-gray-500 w-full py-2 px-4 text-gray-700 leading-tight"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">Select Batch</option>
              {generateBatchOptions().map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
  
          <div className={`input-container border border-black rounded-lg p-4 flex-none flex items-center ${!selectedSubject && 'border-red-500'}`}>
            <label className="text-xl font-bold text-gray-800 inline-block mr-4">Subject:</label>
            <select
              className="bg-white border rounded-lg hover:border-gray-500 w-full py-2 px-4 text-gray-700 leading-tight"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <button
            className={`bg-blue-500 text-white p-2 rounded-md ${isSubmitDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            disabled={isSubmitDisabled}
            onClick={handleTableVisibility}
          >
            Submit
          </button>
          <button
            className={`bg-green-500 text-white p-2 rounded-md ${isSubmitDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
            Fetch Data <DownloadIcon className="ml-7 w-5 h-5" />
            
          </button>
        </div>
  

            {/* Table Section */}
            {showTable && (
                <table className="border-collapse w-full mt-8 bg-white rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Roll no</th>
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
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-2 px-4">{data.name}</td>
                                <td className="py-2 px-4">{data.rollNo}</td>
                                <td className="py-2 px-4">
                                    <input
                                        type="checkbox"
                                        checked={data.assignment}
                                        onChange={() => setTableData((prevData) => {
                                            const newData = [...prevData];
                                            newData[index].assignment = !data.assignment;
                                            return newData;
                                        })}
                                    />
                                </td>
                                {data.assignmentMarks.map((mark, i) => (
                                    <td key={i} className="py-2 px-4">{` ${mark}`}</td>
                                ))}
                                <td className="py-2 px-4" colSpan="12">
                                    
                                    <span>{data.unitTest1Marks}</span>
                                    
                                </td>

                                <td className="py-2 px-4" colSpan="12">
                                    {data.unitTest1Marks >= 12 ? (
                                        <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                    />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            checked={data.exAssmt1}
                                           
                                        />
                                    )}
                                </td>


                                <td className="py-2 px-4" colSpan="12">
                                    
                                        <span>{data.unitTest2Marks}</span>
                                    
                                </td>

                                <td className="py-2 px-4" colSpan="12">
                                {data.unitTest2Marks >= 12 ? (
                                        <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                    />
                                    ) : (
                                        <input
                                        type="checkbox"
                                        checked={data.exAssmt2}
                                    />
                                    )}
                                </td>
                                <td className="py-2 px-4" colSpan="2">
                                    
                                        <span>{data.attendancePercentage}</span>
                                    
                                </td>

                                <td className="py-2 px-4" colSpan="2">
                                    {data.attendancePercentage >= 75 ? (
                                        <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                        
                                    />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            checked={data.letter}
                                            
                                        />
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <input
                                        type="checkbox"
                                        checked={data.overall}
                                        
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
