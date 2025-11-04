// src/pages/employee/EmployeeProfile.jsx
import React, { useEffect, useState } from "react";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({
    fullName: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  });

  useEffect(() => {
    // Later you can fetch real profile data from backend here
    // axios.get("/api/employee/profile").then((res) => setEmployee(res.data));
  }, []);

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="space-y-3">
        <p>
          <span className="font-semibold">Name:</span> {employee.fullName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {employee.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {employee.role}
        </p>
      </div>
    </div>
  );
};

export default EmployeeProfile;
