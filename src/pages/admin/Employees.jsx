import { useEffect, useState } from "react";
import { getEmployees, createEmployee } from "../../services/api";
// import bcrypt from "bcryptjs";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    photoUrl: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    employeeCode: "",
    designation: "",
    dateOfJoining: "",
    manager: "",
    employmentType: "",
    workLocation: "",
    skills: "",
    qualifications: "",
    experience: "",
    certifications: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data } = await getEmployees();
    setEmployees(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEmployee(form);
    fetchEmployees();

    setForm({
      fullName: "",
      dob: "",
      gender: "",
      maritalStatus: "",
      nationality: "",
      photoUrl: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      employeeCode: "",
      designation: "",
      dateOfJoining: "",
      manager: "",
      employmentType: "",
      workLocation: "",
      skills: "",
      qualifications: "",
      experience: "",
      certifications: "",
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Personal Information
      </h1>

      {/* Employee Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 shadow-md rounded-lg p-6 grid grid-cols-2 gap-4 focus:ring-gray-300"
      >
        {/* Personal Info */}
        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={form.maritalStatus}
          onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="" disabled>
            Marital Status
          </option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
        <select
          value={form.nationality}
          onChange={(e) => setForm({ ...form, nationality: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="" disabled>
            Select Nationality
          </option>
          <option value="Indian">Indian</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="Canadian">Canadian</option>
          <option value="Australian">Australian</option>
        </select>

        {/* <input
          type="url"
          placeholder="Photo URL"
          value={form.photoUrl}
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          className="border px-3 py-2 rounded"
        /> */}

        {/* Contact */}
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="col-span-2 border px-3 py-2 rounded"
        />
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Employment Details
        </h1>
        <br></br>
        {/* Employment Details */}
        <input
          type="text"
          placeholder="Employee Code"
          value={form.employeeCode}
          onChange={(e) => setForm({ ...form, employeeCode: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          placeholder="Date of Joining"
          value={form.dateOfJoining}
          onChange={(e) => setForm({ ...form, dateOfJoining: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <select
          value={form.manager}
          onChange={(e) => setForm({ ...form, manager: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="" disabled>
            Reporting Manager / Supervisor
          </option>
          <option value="Manager">Manager</option>
          <option value="Supervisor">Supervisor</option>
        </select>
        <input
          type="text"
          placeholder="Employment Type"
          value={form.employmentType}
          onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Work Location"
          value={form.workLocation}
          onChange={(e) => setForm({ ...form, workLocation: e.target.value })}
          className="border px-3 py-2 rounded"
        />

        {/* Professional */}

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Professional Details
        </h1>
        <br></br>
        <input
          type="text"
          placeholder="Skills / Expertise"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Qualifications / Education"
          value={form.qualifications}
          onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Previous Work Experience"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Certifications / Trainings"
          value={form.certifications}
          onChange={(e) => setForm({ ...form, certifications: e.target.value })}
          className="border px-3 py-2 rounded"
        />

        <button className="col-span-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg shadow">
          Add Employee
        </button>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center animate-popup">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounceIn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-green-600 animate-tick"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Employee added successfully!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
