import React, { useState, useEffect } from 'react';
import { DownloadIcon } from "@heroicons/react/outline";
import { jsPDF } from "jspdf"; // Import jsPDF
import Modal from 'react-modal';
import 'jspdf-autotable';

const AdminDashboard = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [tableData, setTableData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [classes, setClasses] = useState({});
    const [loading, setLoading] = useState(false); // Track loading state middle one
    const [loadingtop, setLoadingTop] = useState(false); // Track loading state top one

    const [showMenu, setShowMenu] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [editedRowData, setEditedRowData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Subjects, setSubjects] = useState([]);
    const [selectedAssignementUploadSubject, setSelectedAssignementUploadSubject] = useState('');
    const [selectedUnitTestUploadSubject, setSelectedUnitTestUploadSubject] = useState('');

    const yearOptions = ['SE', 'TE', 'BE'];
    const divisionOptions = ['09', '10', '11'];

    const baseurl = 'https://smart-submission-ticket.gopalsaraf.com';

    const isSubmitDisabled = !(selectedYear && selectedDivision && selectedBatch && selectedSubject);

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${baseurl}/api/classes`);
                    if (response.ok) {
                        const data = await response.json();
                        setClasses(data);
                        console.log('Classes fetched successfully')
                    } else {
                        console.error('Failed to fetch classes');
                    }
                } catch (error) {
                    console.error('Error fetching classes:', error);
                }
            };
            fetchData();
        
    }, [selectedYear]);

    useEffect(() => {
            const fetchSubjects = async () => {
                try {
                    const response = await fetch(`${baseurl}/api/classes/subjects`);
                    if (response.ok) {
                        const data = await response.json();
                        setSubjects(data);
                        console.log(data);
                        console.log('Subjects fetched successfully');
                    } else {
                        console.error('Failed to fetch subjects');
                    }
                } catch (error) {
                    console.error('Error fetching subjects:', error);
                }
            };
            fetchSubjects();
        
    }, [selectedYear]);


    const generateBatchOptions = () => {
        if (selectedYear && selectedDivision) {
            var yearr;
            if (selectedYear === 'SE') {
                yearr = 2;
            }
            else if (selectedYear === 'TE') {
                yearr = 3;
            }
            else if (selectedYear === 'BE') {
                yearr = 4;
            }
            const key = `${selectedYear}${selectedDivision}`;

            return classes[yearr][key];
        }
        else {
            return [];
        }

    };

    const generateSubjectOptions = () => {
        if (selectedYear && selectedDivision && selectedBatch) {
            var yearr;
            if (selectedYear === 'SE') {
                yearr = 2;
            } else if (selectedYear === 'TE') {
                yearr = 3;
            } else if (selectedYear === 'BE') {
                yearr = 4;
            }
            const key = `${selectedYear}${selectedDivision}`;
            const subjectsData = Subjects[yearr][key];
            const subjects = [];
            for (const batchKey in subjectsData) {
                if (subjectsData.hasOwnProperty(batchKey)) {
                    const batch = subjectsData[batchKey];
                    const theoryTitles = batch.theory.map((subject) => subject.title);
                    const practicalTitles = batch.practical.map((subject) => subject.title);

                    const subjectOptions = {
                        theory: theoryTitles,
                        practical: practicalTitles,
                    };

                    if (theoryTitles.length > 0 || practicalTitles.length > 0) {
                        subjects.push({
                            options: subjectOptions,
                        });
                    }
                }
                break;
            }
            return subjects;
        } else {
            return [];
        }
    };



    const generateDummyData = (userData) => {
        const data = [];
        if (userData && userData.students) {
            for (const key in userData.students) {
                if (userData.students.hasOwnProperty(key)) {
                    const user = userData.students[key];
                    if (user.unitTests) {
                        const unitTests = user.unitTests[selectedSubject];
                        const exUT1 = unitTests ? unitTests.ut1Alternate : false;
                        const exUT2 = unitTests ? unitTests.ut2Alternate : false;
                        const letter = user.attendanceAlternate || false;
                        const overall = exUT1 && exUT2 && letter;

                        data.push({
                            name: user.name || 'NA',
                            rollNo: key,
                            unitTest1Marks: unitTests ? unitTests.ut1 : 'NA',
                            exAssmt1: exUT1,
                            unitTest2Marks: unitTests ? unitTests.ut2 : 'NA',
                            exAssmt2: exUT2,
                            attendancePercentage: user.attendance || 'NA',
                            letter: letter,
                            overall: overall,
                        });
                    }
                    else {
                        const assignmentsc = user.assignments[selectedSubject] ? user.assignments[selectedSubject].allCompleted : false;
                        const assignmentnmarks = user.assignments[selectedSubject] ? user.assignments[selectedSubject].marks : [];
                        const letter = user.attendanceAlternate || false;

                        const overall = assignmentsc && letter;
                        data.push({
                            name: user.name || 'NA',
                            rollNo: key,
                            assignmentsc: assignmentsc,
                            assignmentnmarks: assignmentnmarks,
                            attendancePercentage: user.attendance || 'NA',
                            letter: letter,
                            overall: overall

                        });

                    }

                }
            }
        }
        console.log(data);
        return data;
    };

    const handleGeneratePDF = (selectedDefaulterList) => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        // Add heading
        doc.setFont('normal');
        doc.text('PUNE INSTITUTE OF COMPUTER TECHNOLOGY', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
        doc.text('DHANKAWADI, PUNE – 43', doc.internal.pageSize.getWidth() / 2, 18, { align: 'center' });
        doc.text('', 10, 26);
        doc.setFont('bold');
        doc.text(`Defaulters for subject ${selectedSubject} ${selectedDefaulterList}`, doc.internal.pageSize.getWidth() / 2, 34, { align: 'center' });
        doc.text('', 10, 42);

        doc.text('Academic Year :- 2023-24', 10, 50, { align: 'left' });
        doc.text('Semester - 2', doc.internal.pageSize.getWidth() - 10, 50, { align: 'right' });
        doc.text(`Department - Information Technology`, 10, 58, { align: 'left' });
        doc.text(`Class: ${selectedYear}${selectedDivision} ${selectedBatch}`, doc.internal.pageSize.getWidth() - 10, 58, { align: 'right' });
        doc.setFont('normal');
        let yOffset = 66;

        let metric;
        if (selectedDefaulterList === 'Unit Test 1') {
            metric = 'exAssmt1';
        } else if (selectedDefaulterList === 'Unit Test 2') {
            metric = 'exAssmt2';
        } else if (selectedDefaulterList === 'Attendance') {
            metric = 'letter';
        } else if (selectedDefaulterList === 'Overall') {
            metric = 'overall';
        } else {
            metric = 'overall';
        }

        const defaulters = tableData.filter((data) => !data[metric]);

        doc.autoTable({
            startY: yOffset,
            head: [['Roll No', 'Name']],
            body: defaulters.map((data) => [data.rollNo, data.name]),
            theme: 'plain',
            styles: {
                fontSize: 10,
                cellPadding: 3,
                lineColor: 200,
                lineWidth: 0.1,
                halign: 'center', // Center align the table data
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
            },
            didDrawPage: (data) => {
                // Add a footer at the bottom of each page
                doc.setFontSize(10);
                doc.text(`Page ${doc.internal.getNumberOfPages()}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
            },
        });

        doc.save(`defaulter_list ${selectedSubject} ${selectedDefaulterList} ${selectedDivision} ${selectedBatch}.pdf`);
    };

    const handleSubmit = async () => {
        setShowTable(false);
        setLoading(true);

        const SSTToken = localStorage.getItem('SSTToken');

        try {
            let endpoint = `${baseurl}/api/records/batch/${selectedBatch}/subject/${selectedSubject}`;

            if (selectedBatch === 'Entire Class') {
                endpoint = `${baseurl}/api/records/class/${selectedYear}${selectedDivision}/subject/${selectedSubject}`;
            }

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': ` ${SSTToken}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                setTableData(generateDummyData(userData));
                setLoading(false);
                setShowTable(true);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading back to false after the data is fetched
        }
    };

    const uploadClasses = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        try {
            setLoadingTop(true);
            const response = await fetch(`${baseurl}/api/submit/classes`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Classes uploaded successfully');
                alert('Classes uploaded successfully');
            } else {
                console.error('Failed to upload Classes');
                alert('Failed to upload Classes');

            }
        } catch (error) {
            console.error('Error uploading Classes:', error);
            alert('Error uploading Classes:', error);
        }
        setLoadingTop(false);
    };

    const uploadStudents = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        setLoadingTop(true);
        try {
            const response = await fetch(`${baseurl}/api/submit/students`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Students uploaded successfully');
                alert('Students uploaded successfully');
            } else {
                console.error('Sailed to upload students');
                alert('Sailed to upload students');

            }
        } catch (error) {
            console.error('Error uploading Students:', error);
        }
        setLoadingTop(false);
    };

    const uploadAttendance = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        setLoadingTop(true);

        try {
            
            const response = await fetch(`${baseurl}/api/submit/attendance`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Attendance uploaded successfully');
                alert('Attendance uploaded successfully');
            } else {
                console.error('Failed to upload attendance');
                alert('Failed to upload attendance');

            }
        } catch (error) {
            console.error('Error uploading attendance:', error);
        }
        setLoadingTop(false);
    };

    const uploadCurriculum = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        setLoadingTop(true);

        try {
            const response = await fetch(`${baseurl}/api/submit/curriculum`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Curriculum uploaded successfully');
                alert('Curriculum uploaded successfully');
            } else {
                console.error('Failed to upload curriculum');
                alert('Failed to upload curriculum');
            }
        } catch (error) {
            console.error('Error uploading curriculum:', error);
        }
        setLoadingTop(false);

    };

    const uploadAssignments = async (subject, file) => {
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('file', file);
        setLoadingTop(true);

        try {
            const response = await fetch(`${baseurl}/api/submit/assignments`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Assignments uploaded successfully');
                alert('Assignments uploaded successfully');
            } else {
                console.error('Failed to upload assignments');
                alert('Failed to upload assignments');
            }
        } catch (error) {
            console.error('Error uploading assignments:', error);
        }
        setLoadingTop(false);

    };

    const uploadUnitTestMarks = async (subject, file) => {
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('file', file);
        setLoadingTop(true);

        try {
            const response = await fetch(`${baseurl}/api/submit/utmarks`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Unit test marks uploaded successfully');
                alert('Unit test marks uploaded successfully');
            } else {
                console.error('Failed to upload unit test marks');
                alert('Failed to upload unit test marks');
            }
        } catch (error) {
            console.error('Error uploading unit test marks:', error);
        }
        setLoadingTop(false);

    };

    const handleEdit = (data) => {
        setSelectedRowData(data);
        setIsEditModalOpen(true);
    };

    // Function to handle changes in the input fields
    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setEditedRowData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? !prevData?.[id] : value,
        }));
    };



    // Function to handle saving the edited data
    const handleSave = async () => {
        setLoadingTop(true);
        try {
            const token = localStorage.getItem('SSTToken');
            const promises = [];

            // First API call to update attendance
            if (editedRowData.attendancePercentage || editedRowData.letter) {
                const attendanceData = [
                    {
                        rollNo: selectedRowData.rollNo,
                        ...(editedRowData.attendancePercentage && { attendance: parseInt(editedRowData.attendancePercentage) }),
                        ...(editedRowData.letter && { attendanceAlternate: editedRowData.letter }),
                    },
                ];
                const attendancePromise = fetch(`${baseurl}/api/records/update/attendance`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': ` ${token}`,
                    },
                    body: JSON.stringify({ attendance: attendanceData }),
                });
                promises.push(attendancePromise);
            }

            const hasFieldsToSave = ['exAssmt1', 'exAssmt2', 'unitTest1Marks', 'unitTest2Marks'].some((field) => editedRowData[field]);
            console.log(hasFieldsToSave, editedRowData);
            // Second API call to update other fields
            if (hasFieldsToSave) {
                const utmarksData = {};
                ['exAssmt1', 'exAssmt2', 'unitTest1Marks', 'unitTest2Marks'].forEach((field) => {
                    if (editedRowData[field]) {
                        if (field === 'exAssmt1') {
                            utmarksData.ut1Alternate = editedRowData[field];
                        } else if (field === 'exAssmt2') {
                            utmarksData.ut2Alternate = editedRowData[field];
                        } else if (field === 'unitTest1Marks') {
                            utmarksData.ut1 = parseInt(editedRowData[field]);
                        } else if (field === 'unitTest2Marks') {
                            utmarksData.ut2 = parseInt(editedRowData[field]);
                        }
                    }
                });

                const utmarksPromise = fetch(`${baseurl}/api/records/update/utmarks/${selectedSubject}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': ` ${token}`,
                    },
                    body: JSON.stringify({ utmarks: [{ rollNo: selectedRowData.rollNo, ...utmarksData }] }),
                });
                promises.push(utmarksPromise);
            }

            // Execute both promises in parallel
            const responses = await Promise.all(promises);
            responses.forEach(async (response) => {
                const userData = await response.json();
                if (response.ok) {
                    alert(userData.message);
                    // Update tableData with editedRowData
                    setTableData((prevData) => {
                        return prevData.map((data) => {
                            if (data.rollNo === selectedRowData.rollNo) {
                                return {
                                    ...data,
                                    ...editedRowData,
                                };
                            }
                            return data;
                        });
                    });
                } else {
                    alert(userData.message);
                }
            });

            // Reset editedRowData and close modal
            setEditedRowData(null);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating records:', error);
            // Handle error
        }
        setLoadingTop(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('SSTToken');
            const urls = [
                `${baseurl}/api/fetch/classes`,
                `${baseurl}/api/fetch/students`,
                `${baseurl}/api/fetch/curriculum`,
                `${baseurl}/api/fetch/attendance`
            ];

            const requests = urls.map(url => fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            }));

            const responses = await Promise.all(requests);
            const data = await Promise.all(responses.map(response => response.json()));
            data.forEach(item => {
                if (Array.isArray(item)) {
                    item.forEach(subItem => {
                        alert(subItem.message);
                    });
                } else {
                    alert(item.message);
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
        }
        setLoading(false);
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
    };

    console.log("edited row", editedRowData);
    return (
        <div className="admin-dashboard-container mx-3 p-4 bg-blue-100 min-h-screen rounded-md">
            <div className="flex space-x-6 mb-4">
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
                            <option key={division} value={division}>
                                {division}
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
                        <option value="Entire Class">Entire Class</option>
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
                        {generateSubjectOptions().map((subject) => (
                            <optgroup key={subject.subject} label={subject.subject}>
                                {subject.options.theory.map((theoryTitle) => (
                                    <option key={theoryTitle} value={theoryTitle}>
                                        {theoryTitle}
                                    </option>
                                ))}
                                {subject.options.practical.map((practicalTitle) => (
                                    <option key={practicalTitle} value={practicalTitle}>
                                        {practicalTitle}
                                    </option>
                                ))}
                            </optgroup>
                        ))}

                    </select>

                </div>
                <button
                    className={`bg-blue-500 text-white p-2 rounded-md ${isSubmitDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    disabled={isSubmitDisabled}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <div className="relative inline-block">
                    <button
                        className={`bg-green-500 text-white p-1 rounded-md cursor-pointer ${isSubmitDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={isSubmitDisabled}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        Defaulter List
                    </button>
                    {showMenu && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 py-2 w-32 bg-white border rounded-md shadow-lg">
                            <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleGeneratePDF('Unit Test 1')}>
                                Unit Test 1
                            </button>
                            <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleGeneratePDF('Unit Test 2')}>
                                Unit Test 2
                            </button>
                            <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleGeneratePDF('Attendance')}>
                                Attendance
                            </button>
                            <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleGeneratePDF('Overall')}>
                                Overall
                            </button>
                        </div>
                    )}

                </div>
                <button
                    className={`bg-green-500 text-white p-1 rounded-md cursor-pointer`}
                    onClick={fetchData}
                >
                    Fetch Data <DownloadIcon className="ml-3 w-5 h-5" />
                </button>
                <button
                    className={`bg-green-500 text-white p-1 rounded-md cursor-pointer`}
                    onClick={openModal}
                >
                    Upload Data
                </button>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg"
                    overlayClassName="fixed inset-0 backdrop-blur-sm" // Use the backdrop-blur utility
                >
                    <div className="flex justify-end">
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={closeModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="modal-content max-h-96 overflow-y-auto" style={{ paddingRight: '15px' }}>
                        <div className="border-b-2 border-black pb-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">Upload Attendance</h2>
                            <p className="mb-4">
                                Demo File:{" "}
                                <a href="/Attendance.xlsx" download className="text-blue-500">
                                    Attendance.xlsx
                                </a>
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <input id="attendanceFileInput" type="file" accept=".xlsx" className="mr-2" />
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => {
                                        const fileInput = document.getElementById('attendanceFileInput');
                                        if (fileInput) {
                                            fileInput.value = null;
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={async () => {
                                        const fileInput = document.getElementById('attendanceFileInput');
                                        if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                                            uploadAttendance(file);
                                        } else {
                                            alert('No file selected');
                                        }
                                    }}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>

                        <div className="border-b-2 border-black pb-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">Upload Assignments</h2>
                            <p className="mb-4">
                                Demo File:{" "}
                                <a href="/Assignments Example - WAD N9.xlsx" download className="text-blue-500">
                                    Assignments Example WAD.xlsx
                                </a>
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <input id="assignmentsFileInput" type="file" accept=".xlsx" className="mr-2" />

                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => {
                                        const fileInput = document.getElementById('assignmentsFileInput');
                                        if (fileInput) {
                                            fileInput.value = null;
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => {
                                        const fileInput = document.getElementById('assignmentsFileInput');
                                        if (fileInput && fileInput.files && fileInput.files.length > 0) {
                                            if (!selectedAssignementUploadSubject) {
                                                alert('Please select a subject');
                                                return;
                                            }

                                            uploadAssignments(selectedAssignementUploadSubject, fileInput.files[0]);
                                        } else {
                                            alert('No file selected');
                                        }
                                    }}
                                >
                                    Upload
                                </button>
                            </div>
                            <div className="relative">
                                <label className="mr-2">Select Subject:</label>
                                <select
                                    name="upload-assignement-subject"
                                    className={`bg-white border rounded-lg hover:border-gray-500 py-2 px-4 text-gray-700 leading-tight ${!selectedAssignementUploadSubject && 'border-red-500'
                                        }`}
                                    value={selectedAssignementUploadSubject}
                                    onChange={(e) => setSelectedAssignementUploadSubject(e.target.value)}
                                >
                                    <option value="">Select Subject</option>
                                    {generateSubjectOptions().flatMap((subject) =>
                                        subject.options.practical.map((practicalTitle) => (
                                            <option key={practicalTitle} value={practicalTitle}>
                                                {practicalTitle}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="border-b-2 border-black pb-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">Upload Unit Test Marks</h2>
                            <p className="mb-4">
                                Demo File:{" "}
                                <a href="/Unit Test Marks Example - WAD TE09.xlsx" download className="text-blue-500">
                                    Unit Test Marks Example - WAD TE09.xlsx
                                </a>
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <input id="unitTestMarksFileInput" type="file" accept=".xlsx" className="mr-2" />
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => {
                                        const fileInput = document.getElementById('unitTestMarksFileInput');
                                        if (fileInput) {
                                            fileInput.value = null;
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => {
                                        const fileInput = document.getElementById('unitTestMarksFileInput');
                                        const selectedFile = fileInput?.files[0];
                                        if (!selectedFile) {
                                            alert('Please select a file');
                                            return;
                                        }

                                        if (!selectedUnitTestUploadSubject) {
                                            alert('Please select a subject');
                                            return;
                                        }

                                        uploadUnitTestMarks(selectedUnitTestUploadSubject, selectedFile);
                                    }}
                                >
                                    Upload
                                </button>
                            </div>
                            <div className="relative">
                                <label className="mr-2">Select Subject:</label>
                                <select
                                    name="upload-utmarks-subject"
                                    className={`bg-white border rounded-lg hover:border-gray-500 py-2 px-4 text-gray-700 leading-tight ${!selectedUnitTestUploadSubject && 'border-red-500'
                                        }`}
                                    value={selectedUnitTestUploadSubject}
                                    onChange={(e) => setSelectedUnitTestUploadSubject(e.target.value)}
                                >
                                    <option value="">Select Subject</option>
                                    {generateSubjectOptions().flatMap((subject) =>
                                        subject.options.theory.map((theoryTitles) => (
                                            <option key={theoryTitles} value={theoryTitles}>
                                                {theoryTitles}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="border-b-2 border-black pb-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">Upload Classes</h2>
                            <p className="mb-4">
                                Demo File:{" "}
                                <a href="/Classes.xlsx" download className="text-blue-500">
                                    Classes.xlsx
                                </a>
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <input id="classesFileInput" type="file" accept=".xlsx" className="mr-2" />
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => {
                                        const fileInput = document.getElementById('classesFileInput');
                                        if (fileInput) {
                                            fileInput.value = null;
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={async () => {
                                        const fileInput = document.getElementById('classesFileInput');
                                        if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                                            uploadClasses(file);
                                        } else {
                                            alert('No file selected');
                                        }
                                    }}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>

                        <div className="border-b-2 border-black pb-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">Upload Students</h2>
                            <p className="mb-4">
                                Demo File:{" "}
                                <a href="/Students.xlsx" download className="text-blue-500">
                                    Students.xlsx
                                </a>
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <input id="studentsFileInput" type="file" accept=".xlsx" className="mr-2" />
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => {
                                        const fileInput = document.getElementById('studentsFileInput');
                                        if (fileInput) {
                                            fileInput.value = null;
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={async () => {
                                        const fileInput = document.getElementById('studentsFileInput');
                                        if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                                            uploadStudents(file);
                                        } else {
                                            alert('No file selected');
                                        }
                                    }}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>

                        <div className="border-b-2 border-black pb-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">Upload Curriculum</h2>
                            <p className="mb-4">
                                Demo File:{" "}
                                <a href="/Curriculum.xlsx" download className="text-blue-500">
                                    Curriculum.xlsx
                                </a>
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <input id="CurriculumFileInput" type="file" accept=".xlsx" className="mr-2" />
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => {
                                        const fileInput = document.getElementById('CurriculumFileInput');
                                        if (fileInput) {
                                            fileInput.value = null;
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={async () => {
                                        const fileInput = document.getElementById('CurriculumFileInput');
                                        if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                                            uploadCurriculum(file);
                                        } else {
                                            alert('No file selected');
                                        }
                                    }}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

            {/* Display message when table is not showing */}
            {!showTable && !loading && (
                <div className="flex justify-center items-center h-full">
                    <div className="p-4 bg-white rounded-md" style={{ marginTop: '30vh' }}>
                        <p className="text-gray-500">Please select the input fields</p>
                    </div>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            
            {loadingtop && (
                <div className="fixed top-0 left-0 w-full flex justify-center items-center z-50 mt-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
)}
            {/* Modal for editing */}
            {isEditModalOpen && selectedRowData && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 space-y-4">
                        <h2 className="text-lg font-bold">{`${selectedRowData.name} - ${selectedRowData.rollNo}`}</h2>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <label htmlFor="ut1" className="mr-4">Unit Test 1 :</label>
                                <input
                                    type="text"
                                    id="unitTest1Marks"
                                    value={editedRowData?.unitTest1Marks === '' ? '' : editedRowData?.unitTest1Marks || selectedRowData.unitTest1Marks}
                                    className="border rounded-md p-1"
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="exUt1" className="ml-6 mr-2">Ex.UT1 :</label>
                                <input
                                    type="checkbox"
                                    id="exAssmt1"
                                    checked={editedRowData ? editedRowData.exAssmt1 : selectedRowData.exAssmt1}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="ut2" className="mr-4">Unit Test 2 :</label>
                                <input
                                    type="text"
                                    id="unitTest2Marks"
                                    value={editedRowData?.unitTest2Marks === '' ? '' : editedRowData?.unitTest2Marks || selectedRowData.unitTest2Marks}
                                    className="border rounded-md p-1"
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="exUt2" className="ml-6 mr-2">Ex.UT2 :</label>
                                <input
                                    type="checkbox"
                                    id="exAssmt2"
                                    checked={editedRowData ? editedRowData.exAssmt2 : selectedRowData.exAssmt2}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="attendance" className="mr-4">Attendance :</label>
                                <input
                                    type="text"
                                    id="attendancePercentage"
                                    value={editedRowData?.attendancePercentage === '' ? '' : editedRowData?.attendancePercentage || selectedRowData.attendancePercentage}
                                    className="border rounded-md p-1"
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="letter" className="ml-6 mr-2">Letter :</label>
                                <input
                                    type="checkbox"
                                    id="letter"
                                    checked={editedRowData?.letter || selectedRowData.letter}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => {
                                setIsEditModalOpen(false);
                                setEditedRowData(null);
                            }} className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2">Cancel</button>
                            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 ml-2">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Section */}
            {showTable && (
                <table className="border-collapse w-full mt-8 bg-white rounded-md overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">Roll no</th>
                            <th className="py-2 px-4">Name</th>

                            {tableData[0]?.assignmentnmarks && (
                                <>
                                    <th className="py-2 px-4">Assignment</th>
                                    {Array.from({ length: tableData[0]?.assignmentnmarks.length || 0 }, (_, i) => (
                                        <th key={i} className="py-2 px-4">A{i + 1}</th>
                                    ))}
                                </>
                            )}

                            {tableData[0]?.unitTest1Marks && (
                                <>
                                    <th className="py-2 px-4" colSpan="12">Unit Test 1</th>
                                    <th className="py-2 px-4" colSpan="12">Ex.UT1</th>
                                </>
                            )}

                            {tableData[0]?.unitTest2Marks && (
                                <>
                                    <th className="py-2 px-4" colSpan="12">Unit Test 2</th>
                                    <th className="py-2 px-4" colSpan="12">Ex.UT2</th>
                                </>
                            )}
                            <th className="py-2 px-4" colSpan="2">Attendance</th>
                            <th className="py-2 px-4" colSpan="2">Justification</th>
                            <th className="py-2 px-4" colSpan="2">Edit</th>
                            <th className="py-2 px-4" colSpan="2">Overall</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-2 px-4 text-center">{data.rollNo}</td>
                                <td className="py-2 px-4 text-center">{data.name}</td>

                                {data.assignmentnmarks && (
                                    <>
                                        <td className="py-2 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={data.assignmentsc}
                                            />
                                        </td>
                                        {data.assignmentnmarks.map((mark, i) => (
                                            <td key={i} className="py-2 px-4 text-center">{mark}</td>
                                        ))}
                                    </>
                                )}
                                {data.unitTest1Marks !== undefined && (
                                    <>
                                        <td className="py-2 px-4 text-center" colSpan="12">
                                            <span>{data.unitTest1Marks}</span>
                                        </td>
                                        <td className="py-2 px-4 text-center" colSpan="12">
                                            <input
                                                type="checkbox"
                                                checked={data.exAssmt1}
                                            />
                                        </td>
                                    </>
                                )}
                                {data.unitTest2Marks !== undefined && (
                                    <>
                                        <td className="py-2 px-4 text-center" colSpan="12">
                                            <span>{data.unitTest2Marks}</span>
                                        </td>
                                        <td className="py-2 px-4 text-center" colSpan="12">
                                            <input
                                                type="checkbox"
                                                checked={data.exAssmt2}
                                            />
                                        </td>
                                    </>
                                )}
                                <td className="py-2 px-4 text-center" colSpan="2">
                                    <span>{data.attendancePercentage}</span>
                                </td>
                                <td className="py-2 px-4 text-center" colSpan="2">
                                    {data.attendancePercentage >= 75 ? (
                                        <input
                                            type="checkbox"
                                            checked={true}
                                        />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            checked={data.letter}
                                        />
                                    )}
                                </td>
                                <td className="py-2 px-4 text-center text-indigo-600" colSpan="2">
                                    <button onClick={() => handleEdit(data)}>Edit</button>
                                </td>
                                <td className="py-2 px-4 text-center" colSpan="2">
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

