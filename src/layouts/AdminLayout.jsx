// src/layouts/AdminLayout.jsx
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Hide navbar on login page
  const hideNavbar = location.pathname === "/login";

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <>
      {!hideNavbar && (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Logo */}
            <Link
              to="#"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src="/icon.png" className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white cursor-default">
                HRMS Portal
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-700 dark:text-gray-300 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-controls="navbar-default"
              aria-expanded={menuOpen ? "true" : "false"}
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? (
                <MdClose className="w-6 h-6 transition-transform duration-300 rotate-180" />
              ) : (
                <RiMenu2Line className="w-6 h-6 transition-transform duration-300" />
              )}
            </button>

            {/* Links */}
            <div
              className={`w-full md:block md:w-auto overflow-hidden transition-all duration-500 ease-in-out
    ${
      menuOpen
        ? "max-h-96 opacity-100"
        : "max-h-0 opacity-0 md:max-h-full md:opacity-100"
    }
  `}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/admin/home"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/addEmployee"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Add Employee
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/employeelist"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Employees List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/attendance"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Attendance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/attendance-table"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Attendance Calendar
                  </Link>
                </li>
                <li>
                  {!localStorage.getItem("role") ? (
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowLogoutModal(true)}
                        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Logout
                      </button>

                      {/* Logout Confirmation Modal */}
                      {showLogoutModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                          <div className="bg-white dark:bg-gray-100 rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">
                              Confirm Logout
                            </h2>
                            <p className="text-gray-600  mb-6">
                              Are you sure you want to log out?
                            </p>

                            <div className="flex justify-center gap-4">
                              <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 rounded-lg border-1 bg-white hover:bg-gray-200  transition"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                              >
                                Logout
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Page content will render here */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
