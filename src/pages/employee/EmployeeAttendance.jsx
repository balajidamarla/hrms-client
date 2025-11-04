import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/employee/attendance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAttendance(res.data);
      } catch (err) {
        console.log("Error fetching attendance");
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB"); // formats as dd/mm/yyyy
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Attendance</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((entry, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                {formatDate(entry.date)}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 font-semibold ${
                  entry.status === "Present"
                    ? "text-green-600"
                    : entry.status === "Absent"
                    ? "text-red-600"
                    : "text-yellow-500"
                }`}
              >
                {entry.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAttendance;
