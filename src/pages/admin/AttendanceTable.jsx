import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const AttendanceTable = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:5000"; // backend base url

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  // Fixed fetchAttendanceData
  const fetchAttendanceData = async () => {
    setLoading(true);
    setError(null);
    try {
      const month = currentDate.getMonth() + 1; // dynamic month
      const year = currentDate.getFullYear(); // dynamic year

      const response = await axios.get(`${API_BASE}/api/attendanceTable`, {
        params: { month, year },
      });

      console.log("Attendance data:", response.data);
      setAttendanceData(response.data); // update state
    } catch (err) {
      console.error("Error fetching attendance data:", err);
      setError("Failed to fetch attendance data");
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + dir);
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());
  const formatMonthYear = (date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <div className="p-6 bg-white max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          {/* <Users className="w-6 h-6 text-blue-600" /> */}
          <h1 className="text-2xl font-bold">Employee Attendance</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
          >
            Today
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="px-4 py-2 border rounded hover:bg-gray-50 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-bold text-red-600">
          {formatMonthYear(currentDate)}
        </h2>
        <button
          onClick={() => navigateMonth(1)}
          className="px-4 py-2 border rounded hover:bg-gray-50 flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-4 py-3 text-left sticky left-0 bg-gray-900 z-10">
                Employee
              </th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i + 1} className="px-2 py-3 text-center">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((emp) => (
              <tr
                key={emp.employeeId}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium sticky left-0 bg-white z-10">
                  {emp.name}
                </td>
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const year = currentDate.getFullYear();
                  const month = String(currentDate.getMonth() + 1).padStart(
                    2,
                    "0"
                  );
                  const dateKey = `${year}-${month}-${String(day).padStart(
                    2,
                    "0"
                  )}`;
                  const status = emp[dateKey] || "-";

                  let statusClass = "";
                  let displayText = status;

                  if (status === "P" || status === "Present") {
                    statusClass =
                      "bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium";
                    displayText = "P";
                  } else if (status === "Absent") {
                    statusClass =
                      "bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
                    displayText = "A";
                  } else if (status === "WFH") {
                    statusClass =
                      "bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium";
                    displayText = "W";
                  }

                  return (
                    <td key={dateKey} className="px-2 py-2 text-center">
                      {statusClass ? (
                        <span className={statusClass}>{displayText}</span>
                      ) : (
                        status
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
