// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Employees from "./pages/admin/Employees";
import Attendance from "./pages/admin/Attendance";
import EmployeeList from "./pages/admin/EmployeeList";
import Home from "./pages/admin/Home";
import AttendanceTable from "./pages/admin/AttendanceTable";

import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeHome from "./pages/employee/EmployeeHome";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Admin layout wrapper */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/addEmployee" element={<Employees />} />
          <Route path="/admin/employeelist" element={<EmployeeList />} />
          <Route path="/admin/attendance" element={<Attendance />} />
          <Route path="/admin/attendance-table" element={<AttendanceTable />} />
        </Route>

        {/* Employee layout wrapper */}
        <Route element={<EmployeeLayout />}>
          <Route path="/employee/home" element={<EmployeeHome />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
