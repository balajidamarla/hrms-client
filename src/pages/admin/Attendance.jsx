import { useState, useEffect } from "react";
import { markAttendance, getEmployees } from "../../services/api";
import { toast } from "react-toastify"; 

export default function Attendance() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    employeeId: "",
    date: today,
    status: "P",
  });

  const [employees, setEmployees] = useState([]);

  // Fetch employees when component loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getEmployees(); // API call
        setEmployees(res.data); // API returns [{id, fullName, employeeCode}]
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await markAttendance(form);

      toast.success("Attendance marked successfully!");

      setForm({ employeeId: "", date: today, status: "Present" });

    } catch (err) {
      console.error(err);
      toast.error("Attendance has not been marked!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Mark Attendance
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Employee Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee
          </label>
          <select
            value={form.employeeId}
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
            required
          >
            <option value="" disabled>
              Select Employee
            </option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName || emp.name} ({emp.employeeCode || emp.id})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            max={today} //  prevents future dates
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-gray-300 outline-none"
          >
            <option value="Present">Present</option>
            <option value="Absent">Leave</option>
            <option value="WFH">Work From Home</option>
            
          </select>
        </div>

        {/* Submit */}
        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg shadow">
          Submit Attendance
        </button>
      </form>
    </div>
  );
}
