import { useState } from "react";
import { applyLeave } from "../../services/api";

export default function Leaves() {
  const [form, setForm] = useState({
    employeeId: "",
    type: "Sick Leave",
    startDate: "",
    endDate: "",
    status: "Pending"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await applyLeave(form);
    alert("Leave applied!");
    setForm({ employeeId: "", type: "Sick Leave", startDate: "", endDate: "", status: "Pending" });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Apply Leave</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option>Sick Leave</option>
          <option>Casual Leave</option>
          <option>Earned Leave</option>
        </select>
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button className="bg-purple-500 text-white px-4 py-2 rounded">Apply</button>
      </form>
    </div>
  );
}
