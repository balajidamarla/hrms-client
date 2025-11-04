// src/pages/employee/Home.jsx
import React from "react";

const EmployeeHome = () => {
  const name = localStorage.getItem("name");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome back, {name}!</h1>
      <p className="text-gray-700">
        This is your employee dashboard home page.
      </p>
    </div>
  );
};

export default EmployeeHome;
