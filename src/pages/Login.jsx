import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true; // needed for sessions

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { role, fullName } = res.data;

      // store role (and maybe name) in localStorage
      localStorage.setItem("role", role);
      localStorage.setItem("name", fullName);

      // redirect based on role
      if (role === "admin") {
        navigate("/admin/home");
      } else if (role === "employee") {
        navigate("/employee/home");
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300  px-4">
      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-sm bg-white dark:bg-white rounded-2xl shadow-xl p-8 transition-transform transform hover:scale-[1.02]"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-600">
          Welcome Back 👋
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600  mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 outline-none"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-gray-600 text-white font-bold transition-all duration-300 shadow-md"
        >
          Sign In
        </button>

        {/* Footer / Link */}
        {/* <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign up
          </a>
        </p> */}
      </form>
    </div>
  );
};

export default Login;
