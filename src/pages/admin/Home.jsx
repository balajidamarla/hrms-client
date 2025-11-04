import React from "react";
import hrmsImage from "../../assets/hrms.jpg"; // place an HRMS image in src/assets

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      {/* Background Image */}  
      <img
        src={hrmsImage}
        alt="HRMS Dashboard"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Overlay Text */}
      <div className="relative text-center p-6">
        <h1 className="text-7xl font-bold text-gray-900 mb-4">
          Welcome to HRMS
        </h1>
        <p className="text-xl text-gray-800">
          Manage Employees, Attendance, and Leaves Efficiently
        </p>
      </div>
    </div>
  );
}
