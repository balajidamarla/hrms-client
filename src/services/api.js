import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Employees
export const getEmployees = () => API.get("/employees");
export const createEmployee = (data) => API.post("/employees", data);

// Attendance
export const markAttendance = (data) => API.post("/attendance", data);
export const getAttendanceByEmployee = (id) => API.get(`/attendance/${id}`);

// Leaves
export const applyLeave = (data) => API.post("/leaves", data);
export const getLeavesByEmployee = (id) => API.get(`/leaves/${id}`);
