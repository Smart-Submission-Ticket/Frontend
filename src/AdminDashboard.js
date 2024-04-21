import React, { useState, useEffect } from "react";
import { DownloadIcon } from "@heroicons/react/outline";
import { jsPDF } from "jspdf"; // Import jsPDF
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";
import "jspdf-autotable";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [updatedAssignments, setUpdatedAssignments] = useState([]);
  const [classes, setClasses] = useState({});
  const [loading, setLoading] = useState(false); // Track loading state middle one
  const [loadingtop, setLoadingTop] = useState(false); // Track loading state top one

  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editedRowData, setEditedRowData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Subjects, setSubjects] = useState([]);
  const [
    selectedAssignementUploadSubject,
    setSelectedAssignementUploadSubject,
  ] = useState("");
  const [selectedUnitTestUploadSubject, setSelectedUnitTestUploadSubject] =
    useState("");

  const [showModal, setShowModal] = useState(false);
  const [submissionTicketData, setSubmissionTicketData] = useState({
    academicYear: "",
    attendanceLabAsst: "",
    studentAcheivementCommittee: "",
    attendance: {
      minAttendanceRequired: 75,
      updateAllData: false,
    },
    utmarks: {
      minUTMarksRequired: 12,
      updateAllData: false,
    },
  });

  const yearOptions = ["SE", "TE", "BE"];
  const divisionOptions = ["09", "10", "11"];

  const baseurl = "https://smart-submission-ticket.gopalsaraf.com/api/v2";

  const isSubmitDisabled = !(
    selectedYear &&
    selectedDivision &&
    selectedBatch &&
    selectedSubject
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseurl}/classes`);
        if (response.ok) {
          const data = await response.json();
          setClasses(data);
          console.log("Classes fetched successfully");
        } else {
          console.error("Failed to fetch classes");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${baseurl}/classes/subjects`);
        if (response.ok) {
          const data = await response.json();
          setSubjects(data);
          console.log(data);
          console.log("Subjects fetched successfully");
        } else {
          console.error("Failed to fetch subjects");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [selectedYear]);

  useEffect(() => {
    const fetchSSTData = async () => {
      try {
        const token = localStorage.getItem("SSTToken");
        const response = await fetch(`${baseurl}/records/ticket`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });
        const data = await response.json();
        console.log(data);
        setSubmissionTicketData({
          academicYear: data.academicYear,
          attendanceLabAsst: data.attendanceLabAsst,
          studentAcheivementCommittee: data.studentAcheivementCommittee,
          attendance: {
            minAttendanceRequired: data.minAttendanceRequired,
            updateAllData: false,
          },
          utmarks: {
            minUTMarksRequired: data.minUTMarksRequired,
            updateAllData: false,
          },
        });
      } catch (error) {
        console.error("Error fetching SST data:", error);
      }
    };

    fetchSSTData();
  }, []);

  const generateBatchOptions = () => {
    if (selectedYear && selectedDivision) {
      var yearr;
      if (selectedYear === "SE") {
        yearr = 2;
      } else if (selectedYear === "TE") {
        yearr = 3;
      } else if (selectedYear === "BE") {
        yearr = 4;
      }
      const key = `${selectedYear}${selectedDivision}`;

      return classes[yearr][key];
    } else {
      return [];
    }
  };

  const generateSubjectOptions = () => {
    if (selectedYear && selectedDivision && selectedBatch) {
      var yearr;
      if (selectedYear === "SE") {
        yearr = 2;
      } else if (selectedYear === "TE") {
        yearr = 3;
      } else if (selectedYear === "BE") {
        yearr = 4;
      }
      const key = `${selectedYear}${selectedDivision}`;
      const subjectsData = Subjects[yearr][key];
      const subjects = [];
      for (const batchKey in subjectsData) {
        if (subjectsData.hasOwnProperty(batchKey)) {
          const batch = subjectsData[batchKey];
          const theoryTitles = batch.theory.map((subject) => subject.title);
          const practicalTitles = batch.practical.map(
            (subject) => subject.title
          );

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
            const unitTests = user.unitTests;
            const exUT1 = unitTests ? unitTests.ut1Alternate : false;
            const exUT2 = unitTests ? unitTests.ut2Alternate : false;
            const letter = user.attendanceAlternate || false;
            const overall = exUT1 && exUT2 && letter;

            data.push({
              name: user.name || "NA",
              rollNo: key,
              ut1: unitTests ? unitTests.ut1 : "NA",
              ut1Alternate: exUT1,
              ut2: unitTests ? unitTests.ut2 : "NA",
              ut2Alternate: exUT2,
              attendance: user.attendance || "NA",
              attendanceAlternate: letter,
              overall: overall,
            });
          } else {
            const assignmentsc = user.assignments
              ? user.assignments.allCompleted
              : false;
            const assignmentnmarks = user.assignments
              ? user.assignments.marks
              : [];
            const letter = user.attendanceAlternate || false;

            const overall = assignmentsc && letter;
            data.push({
              name: user.name || "NA",
              rollNo: key,
              assignmentsc: assignmentsc,
              assignmentnmarks: assignmentnmarks,
              attendance: user.attendance || "NA",
              attendanceAlternate: letter,
              overall: overall,
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
    doc.setFont("normal");
    doc.text(
      "PUNE INSTITUTE OF COMPUTER TECHNOLOGY",
      doc.internal.pageSize.getWidth() / 2,
      10,
      { align: "center" }
    );
    doc.text(
      "DHANKAWADI, PUNE – 43",
      doc.internal.pageSize.getWidth() / 2,
      18,
      { align: "center" }
    );
    doc.text("", 10, 26);
    doc.setFont("bold");
    doc.text(
      `Defaulters for subject ${selectedSubject} ${selectedDefaulterList}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      { align: "center" }
    );
    doc.text("", 10, 42);

    doc.text("Academic Year :- 2023-24", 10, 50, { align: "left" });
    doc.text("Semester - 2", doc.internal.pageSize.getWidth() - 10, 50, {
      align: "right",
    });
    doc.text(`Department - Information Technology`, 10, 58, { align: "left" });
    doc.text(
      `Class: ${selectedYear}${selectedDivision} ${selectedBatch}`,
      doc.internal.pageSize.getWidth() - 10,
      58,
      { align: "right" }
    );
    doc.setFont("normal");
    let yOffset = 66;

    let metric;
    if (selectedDefaulterList === "Unit Test 1") {
      metric = "ut1Alternate";
    } else if (selectedDefaulterList === "Unit Test 2") {
      metric = "ut2Alternate";
    } else if (selectedDefaulterList === "Attendance") {
      metric = "attendanceAlternate";
    } else if (selectedDefaulterList === "Overall") {
      metric = "overall";
    } else {
      metric = "overall";
    }

    const defaulters = tableData.filter((data) => !data[metric]);

    doc.autoTable({
      startY: yOffset,
      head: [["Roll No", "Name"]],
      body: defaulters.map((data) => [data.rollNo, data.name]),
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: 200,
        lineWidth: 0.1,
        halign: "center", // Center align the table data
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
      },
      didDrawPage: (data) => {
        // Add a footer at the bottom of each page
        doc.setFontSize(10);
        doc.text(
          `Page ${doc.internal.getNumberOfPages()}`,
          doc.internal.pageSize.getWidth() - 20,
          doc.internal.pageSize.getHeight() - 10,
          { align: "right" }
        );
      },
    });

    doc.save(
      `defaulter_list ${selectedSubject} ${selectedDefaulterList} ${selectedDivision} ${selectedBatch}.pdf`
    );
  };

  const handleSubmit = async () => {
    setShowTable(false);
    setLoading(true);

    const SSTToken = localStorage.getItem("SSTToken");

    try {
      let endpoint = `${baseurl}/records/batch/${selectedBatch}/subject/${selectedSubject}`;

      if (selectedBatch === "Entire Class") {
        endpoint = `${baseurl}/records/class/${selectedYear}${selectedDivision}/subject/${selectedSubject}`;
      }

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": ` ${SSTToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("res", userData);
        setTableData(generateDummyData(userData));
        setLoading(false);
        setShowTable(true);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading back to false after the data is fetched
    }
  };

  const uploadClasses = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      setLoadingTop(true);
      const response = await fetch(`${baseurl}/submit/classes`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload Classes");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading Classes:", error);
      alert("Error uploading Classes:", error);
    }
    setLoadingTop(false);
  };

  const uploadStudents = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/students`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Sailed to upload students");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading Students:", error);
    }
    setLoadingTop(false);
  };

  const uploadAttendance = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    setLoadingTop(true);

    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/attendance`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload attendance");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading attendance:", error);
    }
    setLoadingTop(false);
  };

  const uploadCurriculum = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/curriculum`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload curriculum");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading curriculum:", error);
    }
    setLoadingTop(false);
  };

  const uploadAssignments = async (subject, file) => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("file", file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/assignments`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload assignments");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading assignments:", error);
    }
    setLoadingTop(false);
  };

  const uploadUnitTestMarks = async (subject, file) => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("file", file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/utmarks`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload unit test marks");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading unit test marks:", error);
    }
    setLoadingTop(false);
  };

  const uploadClassCoordinators = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/classcoordinators`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to Class Coordinators");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading Class Coordinators:", error);
    }
    setLoadingTop(false);
  };

  const uploadMentors = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/mentors`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload mentors");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading mentors:", error);
    }
    setLoadingTop(false);
  };

  const uploadhonors = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/honors`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload honors");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading honors:", error);
    }
    setLoadingTop(false);
  };

  const uploadTEseminars = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/seminars`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload TE seminars");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading TE seminars:", error);
    }
    setLoadingTop(false);
  };

  const uploadBEprojects = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/projects`, {
        method: "POST",
        body: formData,
        headers: {
          "x-auth-token": SSTToken,
        },
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
      } else {
        console.error("Failed to upload BE projects");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error uploading BE projects:", error);
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
      [id]: type === "checkbox" ? !prevData?.[id] : value,
    }));
  };

  const handleCheckboxChange = (e, rollNo) => {
    const updatedAssignment = {
      rollNo: rollNo,
      allCompleted: e.target.checked,
    };

    // Find the index of the assignment in updatedAssignments array
    const assignmentIndex = updatedAssignments.findIndex(
      (assignment) => assignment.rollNo === rollNo
    );

    if (assignmentIndex !== -1) {
      // If the assignment is already in updatedAssignments array, update it
      const updatedAssignmentsCopy = [...updatedAssignments];
      updatedAssignmentsCopy[assignmentIndex] = updatedAssignment;
      setUpdatedAssignments(updatedAssignmentsCopy);
    } else {
      // If the assignment is not in updatedAssignments array, add it
      setUpdatedAssignments((prevState) => [...prevState, updatedAssignment]);
    }

    const updatedTableData = tableData.map((item) => {
      if (item.rollNo === rollNo) {
        return { ...item, assignmentsc: e.target.checked };
      }
      return item;
    });
    setTableData(updatedTableData);
  };

  // Function to handle saving the edited data
  const handleSave = async () => {
    setLoadingTop(true);
    try {
      const token = localStorage.getItem("SSTToken");
      const promises = [];

      // First API call to update attendance
      if (editedRowData.attendance || editedRowData.attendanceAlternate) {
        const attendanceData = [
          {
            rollNo: selectedRowData.rollNo,
            ...(editedRowData.attendance && {
              attendance: parseInt(editedRowData.attendance),
            }),
            ...(editedRowData.attendanceAlternate && {
              attendanceAlternate: editedRowData.attendanceAlternate,
            }),
          },
        ];
        const attendancePromise = fetch(
          `${baseurl}/records/update/attendance`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": ` ${token}`,
            },
            body: JSON.stringify({ attendance: attendanceData }),
          }
        );
        promises.push(attendancePromise);
      }

      const hasFieldsToSave = [
        "ut1Alternate",
        "ut2Alternate",
        "ut1",
        "ut2",
      ].some((field) => editedRowData[field]);
      console.log(hasFieldsToSave, editedRowData);
      // Second API call to update other fields
      if (hasFieldsToSave) {
        const utmarksData = {};
        ["ut1Alternate", "ut2Alternate", "ut1", "ut2"].forEach((field) => {
          if (editedRowData[field]) {
            if (field === "ut1Alternate") {
              utmarksData.ut1Alternate = editedRowData[field];
            } else if (field === "ut2Alternate") {
              utmarksData.ut2Alternate = editedRowData[field];
            } else if (field === "ut1") {
              utmarksData.ut1 = parseInt(editedRowData[field]);
            } else if (field === "ut2") {
              utmarksData.ut2 = parseInt(editedRowData[field]);
            }
          }
        });

        const utmarksPromise = fetch(
          `${baseurl}/records/update/utmarks/${selectedSubject}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": ` ${token}`,
            },
            body: JSON.stringify({
              utmarks: [{ rollNo: selectedRowData.rollNo, ...utmarksData }],
            }),
          }
        );
        promises.push(utmarksPromise);
      }

      // Execute both promises in parallel
      const responses = await Promise.all(promises);
      responses.forEach(async (response) => {
        const userData = await response.json();
        var newdata = editedRowData;
        if (response.ok) {
          alert(userData.message);
          console.log(userData);
          if (userData.utmarks) {
            newdata = userData.utmarks[0];
          } else if (userData.attendance) {
            newdata = userData.attendance[0];
          }
          console.log("editedrowdata", editedRowData);
          console.log("newdata", newdata);
          // Update tableData with editedRowData
          setTableData((prevData) => {
            return prevData.map((data) => {
              if (data.rollNo === selectedRowData.rollNo) {
                return {
                  ...data,
                  ...newdata,
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
      console.error("Error updating records:", error);
      // Handle error
    }
    setLoadingTop(false);
  };

  const SubmitUpdatedAssignment = async () => {
    setLoadingTop(true);
    const SSTToken = localStorage.getItem("SSTToken");
    try {
      const response = await fetch(
        `${baseurl}/records/update/assignments/${selectedSubject}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": SSTToken,
          },
          body: JSON.stringify({ assignments: updatedAssignments }),
        }
      );
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
        // Update tableData based on the response
        userData.assignments.forEach((updatedAssignment) => {
          const { rollNo, allCompleted } = updatedAssignment;
          setTableData((prevTableData) =>
            prevTableData.map((data) => {
              if (data.rollNo === rollNo) {
                return { ...data, assignmentsc: allCompleted };
              }
              return data;
            })
          );
        });
        setUpdatedAssignments([]); // Reset the state after saving
      } else {
        console.error("Failed to update assignments");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error updating assignments:", error);
    }
    setLoadingTop(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("SSTToken");
      const urls = [
        `${baseurl}/fetch/classes`,
        `${baseurl}/fetch/students`,
        `${baseurl}/fetch/curriculum`,
        `${baseurl}/fetch/attendance`,
      ];

      const requests = urls.map((url) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        })
      );

      const responses = await Promise.all(requests);
      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      data.forEach((item) => {
        if (Array.isArray(item)) {
          item.forEach((subItem) => {
            alert(subItem.message);
          });
        } else {
          alert(item.message);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    }
    setLoading(false);
  };

  const handleSSTInputChange = (e) => {
    const { name, value } = e.target;
    const parts = name.split(".");
    if (parts.length === 2) {
      setSubmissionTicketData({
        ...submissionTicketData,
        [parts[0]]: {
          ...submissionTicketData[parts[0]],
          [parts[1]]:
            value === "true" ? true : value === "false" ? false : value,
        },
      });
    } else if (parts.length === 3) {
      setSubmissionTicketData({
        ...submissionTicketData,
        [parts[0]]: {
          ...submissionTicketData[parts[0]],
          [parts[1]]: {
            ...submissionTicketData[parts[0]][parts[1]],
            [parts[2]]:
              value === "true" ? true : value === "false" ? false : value,
          },
        },
      });
    } else {
      setSubmissionTicketData({
        ...submissionTicketData,
        [name]: value,
      });
    }
  };

  const handleSSTCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSubmissionTicketData({
      ...submissionTicketData,
      [name]: checked,
    });
  };

  const handleSSTDataSubmit = async (e) => {
    e.preventDefault();
    setLoadingTop(true);

    const token = localStorage.getItem("SSTToken");

    try {
      const response = await fetch(`${baseurl}/submit/ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(submissionTicketData),
      });
      const userData = await response.json();

      if (response.ok) {
        alert(userData.message);
        closeSSTModal();
      } else {
        console.error("Failed to submit ticket");
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
    setLoadingTop(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const openSSTModal = () => {
    setShowModal(true);
  };

  const closeSSTModal = () => {
    setShowModal(false);
  };

  //console.log("edited row", editedRowData);
  //console.log(submissionTicketData);
  console.log(updatedAssignments);
  return (
    <div className="admin-dashboard-container mx-3 p-4 bg-blue-100 min-h-screen rounded-md">
      <div className="flex flex-wrap sm:space-x-4 sm:space-y-0 space-y-4 mb-4">
        {/* Form Section */}
        {/* <div className="flex space-x-6 mb-4"> */}

        <div
          className={`input-container border border-black rounded-lg p-4 flex-none flex items-center ${
            !selectedYear && "border-red-500"
          }`}
        >
          <label className="text-xl font-bold text-gray-800 inline-block mr-4">
            Year:
          </label>
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

        <div
          className={`input-container border border-black rounded-lg p-4 flex-none flex items-center ${
            !selectedDivision && "border-red-500"
          }`}
        >
          <label className="text-xl font-bold text-gray-800 inline-block mr-4">
            Division:
          </label>
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

        <div
          className={`input-container border border-black rounded-lg p-4 flex-none flex items-center ${
            !selectedBatch && "border-red-500"
          }`}
        >
          <label className="text-xl font-bold text-gray-800 inline-block mr-4">
            Batch:
          </label>
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

        <div
          className={`input-container border border-black rounded-lg p-4 flex-none flex items-center ${
            !selectedSubject && "border-red-500"
          }`}
        >
          <label className="text-xl font-bold text-gray-800 inline-block mr-4">
            Subject:
          </label>
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
          className={`bg-blue-500 text-white p-2 rounded-md ${
            isSubmitDisabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          } `}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="relative inline-block">
          <button
            className={`bg-green-500 text-white p-1 rounded-md cursor-pointer ${
              isSubmitDisabled ? "cursor-not-allowed opacity-50" : ""
            } w-full h-full`}
            disabled={isSubmitDisabled}
            onClick={() => setShowMenu(!showMenu)}
          >
            Defaulter <br />
            List
          </button>
          {showMenu && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 py-2 w-32 bg-white border rounded-md shadow-lg">
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleGeneratePDF("Unit Test 1")}
              >
                Unit Test 1
              </button>
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleGeneratePDF("Unit Test 2")}
              >
                Unit Test 2
              </button>
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleGeneratePDF("Attendance")}
              >
                Attendance
              </button>
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleGeneratePDF("Overall")}
              >
                Overall
              </button>
            </div>
          )}
        </div>
        <button
          className={`bg-green-500 text-white p-1 rounded-md cursor-pointer `}
          onClick={fetchData}
        >
          Fetch Data <DownloadIcon className="ml-6 w-5 h-5" />
        </button>
        <button
          className={`bg-green-500 text-white p-1 rounded-md cursor-pointer`}
          onClick={openModal}
        >
          Upload <br />
          Data
        </button>
      </div>
      <div className="flex justify-center items-center h-full">
        {updatedAssignments.length > 0 && (
          <div className="mr-4">
            <button
              className="p-2 bg-green-500 text-white rounded-lg"
              onClick={() => {
                // Add logic here to save the updatedAssignments
                SubmitUpdatedAssignment();
              }}
            >
              Save Changes
            </button>
            <button
              className="p-2 bg-red-500 text-white rounded-lg ml-2"
              onClick={() => {
                setUpdatedAssignments([]); // Reset the state
                handleSubmit(); // Perform any other necessary actions
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <button
          className="p-2 bg-white border border-black rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => navigate("/AdminSearchRollNo")}
        >
          Search Via RollNo
        </button>
      </div>

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
        <div
          className="modal-content max-h-96 overflow-y-auto"
          style={{ paddingRight: "15px" }}
        >
          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Upload Attendance</h2>
            <p className="mb-4">
              Demo File:{" "}
              <a href="/Attendance.xlsx" download className="text-blue-500">
                Attendance.xlsx
              </a>
            </p>
            <div className="flex justify-between items-center mb-4">
              <input
                id="attendanceFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById(
                    "attendanceFileInput"
                  );
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
                  const fileInput = document.getElementById(
                    "attendanceFileInput"
                  );
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadAttendance(file);
                  } else {
                    alert("No file selected");
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
              <a
                href="/Assignments Example - WAD N9.xlsx"
                download
                className="text-blue-500"
              >
                Assignments Example WAD.xlsx
              </a>
            </p>
            <div className="flex justify-between items-center mb-4">
              <input
                id="assignmentsFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />

              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById(
                    "assignmentsFileInput"
                  );
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
                  const fileInput = document.getElementById(
                    "assignmentsFileInput"
                  );
                  if (
                    fileInput &&
                    fileInput.files &&
                    fileInput.files.length > 0
                  ) {
                    if (!selectedAssignementUploadSubject) {
                      alert("Please select a subject");
                      return;
                    }

                    uploadAssignments(
                      selectedAssignementUploadSubject,
                      fileInput.files[0]
                    );
                  } else {
                    alert("No file selected");
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
                className={`bg-white border rounded-lg hover:border-gray-500 py-2 px-4 text-gray-700 leading-tight ${
                  !selectedAssignementUploadSubject && "border-red-500"
                }`}
                value={selectedAssignementUploadSubject}
                onChange={(e) =>
                  setSelectedAssignementUploadSubject(e.target.value)
                }
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
              <a
                href="/Unit Test Marks Example - WAD TE09.xlsx"
                download
                className="text-blue-500"
              >
                Unit Test Marks Example - WAD TE09.xlsx
              </a>
            </p>
            <div className="flex justify-between items-center mb-4">
              <input
                id="unitTestMarksFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById(
                    "unitTestMarksFileInput"
                  );
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
                  const fileInput = document.getElementById(
                    "unitTestMarksFileInput"
                  );
                  const selectedFile = fileInput?.files[0];
                  if (!selectedFile) {
                    alert("Please select a file");
                    return;
                  }

                  if (!selectedUnitTestUploadSubject) {
                    alert("Please select a subject");
                    return;
                  }

                  uploadUnitTestMarks(
                    selectedUnitTestUploadSubject,
                    selectedFile
                  );
                }}
              >
                Upload
              </button>
            </div>
            <div className="relative">
              <label className="mr-2">Select Subject:</label>
              <select
                name="upload-utmarks-subject"
                className={`bg-white border rounded-lg hover:border-gray-500 py-2 px-4 text-gray-700 leading-tight ${
                  !selectedUnitTestUploadSubject && "border-red-500"
                }`}
                value={selectedUnitTestUploadSubject}
                onChange={(e) =>
                  setSelectedUnitTestUploadSubject(e.target.value)
                }
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
              <input
                id="classesFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById("classesFileInput");
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
                  const fileInput = document.getElementById("classesFileInput");
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadClasses(file);
                  } else {
                    alert("No file selected");
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
              <input
                id="studentsFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput =
                    document.getElementById("studentsFileInput");
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
                  const fileInput =
                    document.getElementById("studentsFileInput");
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadStudents(file);
                  } else {
                    alert("No file selected");
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
              <input
                id="CurriculumFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById(
                    "CurriculumFileInput"
                  );
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
                  const fileInput = document.getElementById(
                    "CurriculumFileInput"
                  );
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadCurriculum(file);
                  } else {
                    alert("No file selected");
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-xl font-bold mb-4">
              Upload Submission Ticket Details
            </h2>

            <div className="flex justify-between items-center mb-4">
              <div></div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={openSSTModal}
              >
                Select
              </button>
            </div>
          </div>
          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-xl font-bold mb-4">
              Upload Class Coordinators
            </h2>
            <p className="mb-4">
              Demo File:{" "}
              <a
                href="/Class Coordinators.xlsx"
                download
                className="text-blue-500"
              >
                Class Coordinators.xlsx
              </a>
            </p>
            <div className="flex justify-between items-center mb-4">
              <input
                id="ClassCoordinatorsFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById(
                    "ClassCoordinatorsFileInput"
                  );
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
                  const fileInput = document.getElementById(
                    "ClassCoordinatorsFileInput"
                  );
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadClassCoordinators(file);
                  } else {
                    alert("No file selected");
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Upload Mentors</h2>
            <p className="mb-4">
              Demo File:{" "}
              <a href="/Mentors.xlsx" download className="text-blue-500">
                Mentors.xlsx
              </a>
            </p>
            <div className="flex justify-between items-center mb-4">
              <input
                id="MentorsFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById("MentorsFileInput");
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
                  const fileInput = document.getElementById("MentorsFileInput");
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadMentors(file);
                  } else {
                    alert("No file selected");
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Upload Honors</h2>
            <p className="mb-4">
              Demo File:{" "}
              <a href="/Honors.xlsx" download className="text-blue-500">
                Honors.xlsx
              </a>
            </p>
            <div className="flex justify-between items-center mb-4">
              <input
                id="HonorsFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById("HonorsFileInput");
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
                  const fileInput = document.getElementById("HonorsFileInput");
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadhonors(file);
                  } else {
                    alert("No file selected");
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Upload TE seminars</h2>
            <p className="mb-4">
              Demo File:{" "}
              <a href="/TE Seminars.xlsx" download className="text-blue-500">
                TE Seminars.xlsx
              </a>
            </p>
            <div className="flex justify-between items-center mb-4">
              <input
                id="TEseminarFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput =
                    document.getElementById("TEseminarFileInput");
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
                  const fileInput =
                    document.getElementById("TEseminarFileInput");
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadTEseminars(file);
                  } else {
                    alert("No file selected");
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Upload BE projects</h2>
            <p className="mb-4">
              Demo File:{" "}
              <a href="/BE Projects.xlsx" download className="text-blue-500">
                BE Projects.xlsx
              </a>
            </p>
            <div className="flex justify-between items-center mb-4">
              <input
                id="BEprojectsFileInput"
                type="file"
                accept=".xlsx"
                className="mr-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  const fileInput = document.getElementById(
                    "BEprojectsFileInput"
                  );
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
                  const fileInput = document.getElementById(
                    "BEprojectsFileInput"
                  );
                  if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    uploadBEprojects(file);
                  } else {
                    alert("No file selected");
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Display message when table is not showing */}
      {!showTable && !loading && (
        <div className="flex justify-center items-center h-full">
          <div
            className="p-4 bg-white rounded-md"
            style={{ marginTop: "30vh" }}
          >
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
                <label htmlFor="ut1" className="mr-4">
                  Unit Test 1 :
                </label>
                <input
                  type="text"
                  id="ut1"
                  value={
                    editedRowData?.ut1 === ""
                      ? ""
                      : editedRowData?.ut1 || selectedRowData.ut1
                  }
                  className="border rounded-md p-1"
                  onChange={handleInputChange}
                />
                <label htmlFor="exUt1" className="ml-6 mr-2">
                  UT1 Alternate :
                </label>
                <input
                  type="checkbox"
                  id="ut1Alternate"
                  checked={
                    editedRowData
                      ? editedRowData.ut1Alternate
                      : selectedRowData.ut1Alternate
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="ut2" className="mr-4">
                  Unit Test 2 :
                </label>
                <input
                  type="text"
                  id="ut2"
                  value={
                    editedRowData?.ut2 === ""
                      ? ""
                      : editedRowData?.ut2 || selectedRowData.ut2
                  }
                  className="border rounded-md p-1"
                  onChange={handleInputChange}
                />
                <label htmlFor="exUt2" className="ml-6 mr-2">
                  UT2 Alternate :
                </label>
                <input
                  type="checkbox"
                  id="ut2Alternate"
                  checked={
                    editedRowData
                      ? editedRowData.ut2Alternate
                      : selectedRowData.ut2Alternate
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="attendance" className="mr-4">
                  Attendance :
                </label>
                <input
                  type="text"
                  id="attendance"
                  value={
                    editedRowData?.attendance === ""
                      ? ""
                      : editedRowData?.attendance || selectedRowData.attendance
                  }
                  className="border rounded-md p-1"
                  onChange={handleInputChange}
                />
                <label htmlFor="attendanceAlternate" className="ml-6 mr-2">
                  Justification :
                </label>
                <input
                  type="checkbox"
                  id="attendanceAlternate"
                  checked={
                    editedRowData?.attendanceAlternate ||
                    selectedRowData.attendanceAlternate
                  }
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditedRowData(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 ml-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold">Submission Ticket Data</h2>
            <form onSubmit={handleSSTDataSubmit}>
              <div className="mb-2">
                <label htmlFor="academicYear">Academic Year</label>
                <input
                  type="text"
                  id="academicYear"
                  name="academicYear"
                  value={submissionTicketData.academicYear}
                  onChange={handleSSTInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="attendanceLabAsst">
                  Attendance Lab Assistant Name
                </label>
                <input
                  type="text"
                  id="attendanceLabAsst"
                  name="attendanceLabAsst"
                  value={submissionTicketData.attendanceLabAsst}
                  onChange={handleSSTInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="studentAcheivementCommittee">
                  Student Achievement Committee Madam Name
                </label>
                <input
                  type="text"
                  id="studentAcheivementCommittee"
                  name="studentAcheivementCommittee"
                  value={submissionTicketData.studentAcheivementCommittee}
                  onChange={handleSSTInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="attendance.minAttendanceRequired">
                  Minimum Attendance Required
                </label>
                <input
                  type="number"
                  id="minAttendanceRequired"
                  name="attendance.minAttendanceRequired"
                  value={submissionTicketData.attendance.minAttendanceRequired}
                  onChange={handleSSTInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="attendance.updateAllData">
                  Update All Attendance Data
                </label>
                <select
                  id="updateAllData"
                  name="attendance.updateAllData"
                  value={submissionTicketData.attendance.updateAllData}
                  onChange={handleSSTInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                >
                  <option value={true}>Fully</option>
                  <option value={false}>Partially</option>
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="utmarks.minUTMarksRequired">
                  Minimum UT Marks Required
                </label>
                <input
                  type="number"
                  id="minUTMarksRequired"
                  name="utmarks.minUTMarksRequired"
                  value={submissionTicketData.utmarks.minUTMarksRequired}
                  onChange={handleSSTInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="utmarks.updateAllData">
                  Update All UT Marks Data
                </label>
                <select
                  id="updateAllData"
                  name="utmarks.updateAllData"
                  value={submissionTicketData.utmarks.updateAllData}
                  onChange={handleSSTInputChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                >
                  <option value={true}>Fully</option>
                  <option value={false}>Partially</option>
                </select>
              </div>
              <div className="mb-2">
                <button
                  type="submit"
                  onClick={handleSSTDataSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeSSTModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Cancel
                </button>
              </div>
              <div className="text-red-500">
                <strong>NOTE:</strong>
                <br />
                <span>
                  Partially : Changes will only be applied on those students
                  having current
                </span>
                <br />
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  data as false. All allowed students will not be affected.
                </span>
                <br />
                <br />
                <span>
                  Fully &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Changes will be applied
                  on all students irrespective of their
                </span>
                <br />
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  current data. This can overwrite teacher's changes as well.
                </span>
              </div>
            </form>
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
                  {Array.from(
                    { length: tableData[0]?.assignmentnmarks.length || 0 },
                    (_, i) => (
                      <th key={i} className="py-2 px-4">
                        A{i + 1}
                      </th>
                    )
                  )}
                </>
              )}

              {tableData[0]?.ut1 && (
                <>
                  <th className="py-2 px-4" colSpan="12">
                    Unit Test 1
                  </th>
                  <th className="py-2 px-4" colSpan="12">
                    UT1 Alternate
                  </th>
                </>
              )}

              {tableData[0]?.ut2 && (
                <>
                  <th className="py-2 px-4" colSpan="12">
                    Unit Test 2
                  </th>
                  <th className="py-2 px-4" colSpan="12">
                    UT2 Alternate
                  </th>
                </>
              )}
              <th className="py-2 px-4" colSpan="2">
                Attendance
              </th>
              <th className="py-2 px-4" colSpan="2">
                Justification
              </th>
              {tableData[0]?.ut1 && (
                <>
                  <th className="py-2 px-4" colSpan="2">
                    Edit
                  </th>
                </>
              )}

              <th className="py-2 px-4" colSpan="2">
                Overall
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4 text-center">{data.rollNo}</td>
                <td className="py-2 px-4 text-center">{data.name}</td>

                {data.assignmentnmarks && (
                  <>
                    <td className="py-2 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={data.assignmentsc}
                        onChange={(e) => handleCheckboxChange(e, data.rollNo)}
                      />
                    </td>
                    {data.assignmentnmarks.map((mark, i) => (
                      <td key={i} className="py-2 px-4 text-center">
                        {mark}
                      </td>
                    ))}
                  </>
                )}
                {data.ut1 !== undefined && (
                  <>
                    <td className="py-2 px-4 text-center" colSpan="12">
                      <span>{data.ut1}</span>
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="12">
                      <input type="checkbox" checked={data.ut1Alternate} />
                    </td>
                  </>
                )}
                {data.ut2 !== undefined && (
                  <>
                    <td className="py-2 px-4 text-center" colSpan="12">
                      <span>{data.ut2}</span>
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="12">
                      <input type="checkbox" checked={data.ut2Alternate} />
                    </td>
                  </>
                )}
                <td className="py-2 px-4 text-center" colSpan="2">
                  <span>{data.attendance}</span>
                </td>
                <td className="py-2 px-4 text-center" colSpan="2">
                  <input type="checkbox" checked={data.attendanceAlternate} />
                </td>
                {data.ut1 && (
                  <td
                    className="py-2 px-4 text-center text-indigo-600"
                    colSpan="2"
                  >
                    <button onClick={() => handleEdit(data)}>Edit</button>
                  </td>
                )}

                <td className="py-2 px-4 text-center" colSpan="2">
                  <input type="checkbox" checked={data.overall} />
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
