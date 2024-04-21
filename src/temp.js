const myHeaders = new Headers();
myHeaders.append("x-auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjIwMGQxODMwMTJiOGQzMDY5ODBiYWIiLCJlbWFpbCI6InNzcGFuZGVAcGljdC5lZHUiLCJyb2xlIjoidGVhY2hlciIsImlhdCI6MTcxMzQzMDAzN30.wdqg5S0jvgQ6ZRPBHqU5JCU1O9htXA8XQOUKMbM82LE");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "academicYear": "2023 - 2024",
  "attendanceLabAsst": "Mrs S. L. Rane",
  "studentAcheivementCommittee": "Sheetal Patil Madam",
  "attendance": {
    "minAttendanceRequired": 40,
    "updateAllData": true
  },
  "utmarks": {
    "minUTMarksRequired": 20,
    "updateAllData": true
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

try {
  const response = await fetch("https://smart-submission-ticket.gopalsaraf.com/api/v2/submit/ticket", requestOptions);
  const result = await response.text();
  console.log(result)
} catch (error) {
  console.error(error);
};