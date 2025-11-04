import React, { useEffect, useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // for modal
  const [search, setSearch] = useState("");

  useEffect(() => {
    let url = "http://localhost:5000/api/employees";
    if (search.trim() !== "") {
      url += `?search=${encodeURIComponent(search)}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEmployees(data); // only set if it's an array
        } else {
          console.error("Unexpected response:", data);
          setEmployees([]); // fallback to empty
        }
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setEmployees([]);
      });
  }, [search]);

  const handleEdit = (id) => {
    console.log("Edit employee:", id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" })
        .then(() => {
          setEmployees(employees.filter((emp) => emp.id !== id));
        })
        .catch((err) => console.error("Error deleting:", err));
    }
  };

  const openModal = (employee) => setSelectedEmployee(employee);
  const closeModal = () => setSelectedEmployee(null);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Employee List</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search employee name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="relative mb-3 md:w-96 block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-700 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full divide-y divide-black text-sm text-gray-800">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-3 text-left sticky left-0 bg-gray-900 z-10">
                Full Name
              </th>
              <th className="px-4 py-2 text-left">Photo</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Employee Code</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">{emp.id}</td>
                <td
                  className="px-4 py-3 text-left sticky left-0 z-10 font-medium text-blue-600 cursor-pointer hover:underline bg-white"
                  onClick={() => openModal(emp)}
                >
                  {emp.fullName}
                </td>
                <td className="px-4 py-2">
                  <img
                    src={
                      emp.photoUrl ||
                      "https://www.pikpng.com/pngl/b/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{emp.phone}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.employeeCode}</td>
                <td className="px-4 py-2">{emp.designation}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    {/* <button
                                            onClick={() => handleEdit(emp.id)}
                                            className="text-sm px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
                                        >
                                            Edit
                                        </button> */}
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray bg-opacity-30 backdrop-blur-sm p-4">
          <div className="bg-white backdrop-blur-md rounded-xl w-3/4 max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative shadow-lg border border-white/20">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-700 text-lg font-bold"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <img
                src={
                  selectedEmployee.photoUrl ||
                  "https://www.pikpng.com/pngl/b/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
                }
                alt="profile"
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-white/40"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {selectedEmployee.fullName}
              </h3>

              <div className="grid grid-cols-2 gap-4 w-full text-black text-sm">
                <div>
                  <label className="block font-medium">ID</label>
                  <input
                    type="text"
                    value={selectedEmployee.id}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">DOB</label>
                  <input
                    type="date"
                    value={selectedEmployee.dob}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Gender</label>
                  <input
                    type="text"
                    value={selectedEmployee.gender}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Marital Status</label>
                  <input
                    type="text"
                    value={selectedEmployee.maritalStatus}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Nationality</label>
                  <input
                    type="text"
                    value={selectedEmployee.nationality}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Phone</label>
                  <input
                    type="text"
                    value={selectedEmployee.phone}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    value={selectedEmployee.email}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Address</label>
                  <input
                    type="text"
                    value={selectedEmployee.address}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>

                {/* Add remaining fields similarly in grid */}
                <div>
                  <label className="block font-medium">Employee Code</label>
                  <input
                    type="text"
                    value={selectedEmployee.employeeCode}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Designation</label>
                  <input
                    type="text"
                    value={selectedEmployee.designation}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Date of Joining</label>
                  <input
                    type="date"
                    value={selectedEmployee.dateOfJoining}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Manager</label>
                  <input
                    type="text"
                    value={selectedEmployee.manager}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Emp Type</label>
                  <input
                    type="text"
                    value={selectedEmployee.employmentType}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Work Location</label>
                  <input
                    type="text"
                    value={selectedEmployee.workLocation}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Skills</label>
                  <input
                    type="text"
                    value={selectedEmployee.skills}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Qualifications</label>
                  <input
                    type="text"
                    value={selectedEmployee.qualifications}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Experience</label>
                  <input
                    type="text"
                    value={selectedEmployee.experience}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
                <div>
                  <label className="block font-medium">Certifications</label>
                  <input
                    type="text"
                    value={selectedEmployee.certifications}
                    readOnly
                    className="w-full border rounded px-2 py-1 text-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
