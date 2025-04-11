import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "./backend";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [SSTToken, setSSTToken] = useState("");
  const [tableData, setTableData] = useState([]);
  const [practicalData, setPracticalData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [userD, setuserD] = useState();
  const [TicketDetails, setTicketDetails] = useState(null);

  // Get SSTToken from local storage and set it in state
  useEffect(() => {
    const token = localStorage.getItem("SSTToken");
    if (token) {
      setSSTToken(token);
    }
  }, []);

  // Fetch ticket details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseurl}/records/ticket`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTicketDetails(data);
        console.log("Ticket details fetched successfully");
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchData();
  }, []); // No need to add TicketDetails as a dependency

  // Fetch user data from the backend
  const fetchDataFromBackend = useCallback(async () => {
    try {
      console.log("Fetching data from backend...");
      const response = await fetch(`${baseurl}/records`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": ` ${SSTToken}`,
        },
      });
      console.log("Response status:", response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log("User data fetched successfully:", userData);

        // Mock assignments data for testing
        if (!userData.assignments) {
          userData.assignments = {};
          userData.subjects.practical.forEach((subject) => {
            userData.assignments[subject.title] = {
              marks: Array(subject.noOfAssignments).fill("NA"),
              allCompleted: false,
            };
          });
        }

        setuserD(userData);
        setTableData(generateDummyData(userData));
        setPracticalData(generatePracticalData(userData));
        setLoading(false); // Ensure loading is set to false
      } else {
        console.error("Failed to fetch data. Response status:", response.status);
        setLoading(false); // Set loading to false even if the response is not OK
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  }, [SSTToken]);

  // Call fetchDataFromBackend when SSTToken changes
  useEffect(() => {
    if (SSTToken) {
      fetchDataFromBackend();
    }
  }, [SSTToken, fetchDataFromBackend]); // Add fetchDataFromBackend to the dependency array

  // Generate dummy data for the table based on user data
  const generateDummyData = (userData) => {
    try {
      return userData.subjects.theory.map((subject) => {
        const noofassignments = userData.assignment;
        const lett = userData.attendanceAlternate;
        const ut2alt = userData.unitTests[subject.title]?.ut2Alternate ?? false;
        const ut1alt = userData.unitTests[subject.title]?.ut1Alternate ?? false;
        const ov = lett && ut2alt && ut1alt;
        return {
          name: subject.title,
          assignment: noofassignments ? noofassignments : 0,
          assignmentMarks: noofassignments ? noofassignments.marks : [],
          unitTest1Marks: userData.unitTests[subject.title]?.ut1 ?? "NA",
          exAssmt1: userData.unitTests[subject.title]?.ut1Alternate ?? false,
          unitTest2Marks: userData.unitTests[subject.title]?.ut2 ?? "NA",
          exAssmt2: userData.unitTests[subject.title]?.ut2Alternate ?? false,
          attendancePercentage: userData.attendance,
          letter: lett,
          overall: ov,
        };
      });
    } catch (error) {
      console.error("Error generating dummy data:", error);
      return []; // Return an empty array in case of an error
    }
  };

  const generatePracticalData = (userData) => {
    try {
      const practicalSubjects = userData.subjects.practical;

      // Find the maximum number of assignments for practical subjects
      const maxAssignments = Math.max(
        ...practicalSubjects.map((subject) => subject.noOfAssignments),
        0
      );

      // Generate assignment labels (A1, A2, ...)
      const assignmentLabels = Array.from(
        { length: maxAssignments },
        (_, i) => `A${i + 1}`
      );

      // Map practical subjects to table rows
      const practicalTableData = practicalSubjects.map((subject) => {
        // Default to an empty array if assignments data is missing
        const assignmentMarks = userData.assignments?.[subject.title]?.marks ?? Array(subject.noOfAssignments).fill("NA");
        const remainingAssignments = maxAssignments - assignmentMarks.length;
        const remainingAssignmentMarks = Array.from(
          { length: remainingAssignments },
          (_, i) => "NA"
        );
        const allAssignmentMarks = [
          ...assignmentMarks,
          ...remainingAssignmentMarks,
        ];
        const letter = userData.attendanceAlternate ?? false;
        const assignmentsCompleted =
          userData.assignments?.[subject.title]?.allCompleted ?? false;

        let overall = false;
        if (assignmentsCompleted && letter) {
          overall = true;
        }
        return {
          name: subject.title,
          assignments: subject.noOfAssignments,
          assignmentLabels: assignmentLabels.slice(0, subject.noOfAssignments),
          assignmentMarks: allAssignmentMarks,
          allCompleted: assignmentsCompleted,
          attendance: userData.attendance,
          letter: letter,
          overall: overall,
        };
      });

      return practicalTableData;
    } catch (error) {
      console.error("Error generating practical data:", error);
      return []; // Return an empty array in case of an error
    }
  };

  const calculateTermWorkMarks = (userData) => {
    let assignmentMarks = 0;
    let unitTestMarks = 0;
    let attendanceMarks = 0;

    // Calculate assignment marks
    let totalassignments = 0;
    userData.subjects.practical.forEach((subject) => {
      const marks = userData.assignments?.[subject.title]?.marks ?? [];
      console.log(marks, subject);
      totalassignments += subject.noOfAssignments;
      assignmentMarks += marks.reduce(
        (acc, mark) => acc + (mark === "NA" ? 0 : mark),
        0
      );
    });
    console.log("total Assignment marks :", assignmentMarks);
    const assignmentAverage = assignmentMarks / (totalassignments * 10);

    // Calculate unit test marks
    Object.keys(userData.unitTests).forEach((subject) => {
      const ut1Mark = userData.unitTests[subject]?.ut1 ?? "NA";
      const ut2Mark = userData.unitTests[subject]?.ut2 ?? "NA";
      unitTestMarks +=
        (ut1Mark === "NA" ? 0 : ut1Mark) + (ut2Mark === "NA" ? 0 : ut2Mark);
    });

    console.log("ut marks", unitTestMarks);
    const unitTestAverage =
      unitTestMarks / (userData.subjects.theory.length * 60);

    // Calculate attendance marks
    const attendancePercentage = userData.attendance;
    if (attendancePercentage < 75) {
      attendanceMarks = 0;
    } else if (attendancePercentage >= 75 && attendancePercentage < 80) {
      attendanceMarks = 4;
    } else if (attendancePercentage >= 80 && attendancePercentage < 85) {
      attendanceMarks = 8;
    } else if (attendancePercentage >= 85 && attendancePercentage < 90) {
      attendanceMarks = 12;
    } else if (attendancePercentage >= 90 && attendancePercentage < 95) {
      attendanceMarks = 16;
    } else {
      attendanceMarks = 20;
    }

    // Calculate total term work marks
    const termWorkMarks = Math.floor(
      assignmentAverage * 60 + unitTestAverage * 20 + attendanceMarks
    );
    return termWorkMarks;
  };

  const termWorkMarks = userD ? calculateTermWorkMarks(userD) : 0;

  return (
    <div className="admin-dashboard-container mx-5 p-4 bg-blue-100 rounded-md">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Submission status table
      </h1>

      {loading ? ( // Show loading animation if loading is true
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Theory Subjects</h2>
            <table className="border-collapse w-full mt-8 bg-white rounded-md overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Subject</th>
                  {tableData[0]?.assignments > 0 && (
                    <>
                      <th className="py-2 px-4">Assignment</th>
                      {Array.from(
                        { length: tableData[0]?.assignmentMarks.length || 0 },
                        (_, i) => (
                          <th key={i} className="py-2 px-4">
                            A{i + 1}
                          </th>
                        )
                      )}
                    </>
                  )}
                  <th className="py-2 px-4" colSpan="12">
                    Unit Test 1
                  </th>
                  <th className="py-2 px-4" colSpan="12">
                    UT1 Alternate
                  </th>
                  <th className="py-2 px-4" colSpan="12">
                    Unit Test 2
                  </th>
                  <th className="py-2 px-4" colSpan="12">
                    UT2 Alternate
                  </th>
                  <th className="py-2 px-4" colSpan="2">
                    Attendance
                  </th>
                  <th className="py-2 px-4" colSpan="2">
                    Justification
                  </th>
                  <th className="py-2 px-4">Overall</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-4 px-4 text-center">{data.name}</td>
                    {data.assignments > 0 && (
                      <>
                        <td className="py-2 px-4 text-center">
                          <input type="checkbox" checked={data.assignment} />
                        </td>
                        {data.assignmentMarks.map((mark, i) => (
                          <td
                            key={i}
                            className="py-2 px-4 text-center"
                          >{` ${mark}`}</td>
                        ))}
                      </>
                    )}
                    <td className="py-2 px-4 text-center" colSpan="12">
                      <span>{data.unitTest1Marks}</span>
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="12">
                      <input type="checkbox" checked={data.exAssmt1} />
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="12">
                      <span>{data.unitTest2Marks}</span>
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="12">
                      <input type="checkbox" checked={data.exAssmt2} />
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="2">
                      <span>{data.attendancePercentage}</span>
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="2">
                      <input type="checkbox" checked={data.letter} />
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="2">
                      <input type="checkbox" checked={data.overall} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col mt-8">
            <h2 className="text-xl font-semibold mb-2">Practical Subjects</h2>
            <table className="border-collapse w-full mt-8 bg-white rounded-md overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Subject</th>
                  {Array.from(
                    {
                      length: Math.max(
                        ...practicalData.map((data) => data.assignments || 0)
                      ),
                    },
                    (_, i) => (
                      <th key={i} className="py-2 px-4">
                        A{i + 1}
                      </th>
                    )
                  )}
                  <th className="py-2 px-4">Assignments Completed</th>
                  <th className="py-2 px-4" colSpan="2">
                    Attendance
                  </th>
                  <th className="py-2 px-4" colSpan="2">
                    Justification
                  </th>
                  <th className="py-2 px-4">Overall</th>
                </tr>
              </thead>
              <tbody>
                {practicalData.map((data, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-4 px-4 text-center">{data.name}</td>
                    {Array.from(
                      {
                        length: Math.max(
                          ...practicalData.map((data) => data.assignments || 0)
                        ),
                      },
                      (_, i) => (
                        <td key={i} className="py-2 px-4 text-center">
                          {data.assignments > i && data.assignmentMarks[i]}
                        </td>
                      )
                    )}
                    <td className="py-2 px-4 text-center">
                      <input type="checkbox" checked={data.allCompleted} />
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="2">
                      <span>{data.attendance}</span>
                    </td>
                    <td className="py-2 px-4 text-center" colSpan="2">
                      <input type="checkbox" checked={data.letter} />
                    </td>
                    <td className="py-2 px-4 text-center">
                      <input type="checkbox" checked={data.overall} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Term Work Marks</h2>
        <p className="font-semibold">
          Total Term Work Marks: {termWorkMarks}/100
        </p>
      </div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 my-10 mx-10 text-white py-2 px-4 rounded"
          onClick={() =>
            navigate("/SubmissionT", { state: { userD, TicketDetails } })
          }
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;