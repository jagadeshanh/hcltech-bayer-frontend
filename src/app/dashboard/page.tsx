"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 min-h-screen p-4 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7m-9-2v12M5 10h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V11a1 1 0 011-1z"
                  />
                </svg>
                <span>HCLTech-Bayer</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5v14m-4-4v4m8-8v8m4-12v12"
                  />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/users"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 12a4 4 0 100-8 4 4 0 000 8zm12 8H3m3-6a4 4 0 00-3 3.87v2h5m6-6h.01"
                  />
                </svg>
                <span>Patient List</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/settings"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2m0 0C10.9 4 10 4.9 10 6s.9 2 2 2zm10 2c0 1.1-.9 2-2 2h-1m0 0a2 2 0 110-4h1m-7 10c-1.1 0-2 .9-2 2s.9 2 2 2m0 0c1.1 0 2-.9 2-2s-.9-2-2-2z"
                  />
                </svg>
                <span>Appointments</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/messages"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7-4 7 4M3 8v8a4 4 0 004 4h10a4 4 0 004-4V8m-18 4h6"
                  />
                </svg>
                <span>Messages</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="md:hidden">
            {sidebarOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-2 relative">
            <span>Welcome, John Doe</span>
            <div
              className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            ></div>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-16 bg-white shadow-md rounded-lg py-2 w-40"
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="bg-white p-4 rounded-lg shadow m-2">
            <h2 className="font-semibold mb-2">Welcome, Dr.Smith</h2>
          </div>
        </main>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="font-semibold mb-4">Todays Appointments</h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Time</th>
                  <th className="border border-gray-300 p-2">Patient Name</th>
                  <th className="border border-gray-300 p-2">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">10:00 AM</td>
                  <td className="border border-gray-300 p-2">John Doe</td>
                  <td className="border border-gray-300 p-2">Check-up</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">11:30 AM</td>
                  <td className="border border-gray-300 p-2">Jane Smith</td>
                  <td className="border border-gray-300 p-2">Consultation</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">1:00 PM</td>
                  <td className="border border-gray-300 p-2">Alice Johnson</td>
                  <td className="border border-gray-300 p-2">Follow-up</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="font-semibold mb-4">Recent Patients</h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Last Visit</th>
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">John Doe</td>
                  <td className="border border-gray-300 p-2">10:00 AM</td>
                  <td className="border border-gray-300 p-2">
                    <button className="text-blue-500">View Profile</button>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">John Doe</td>
                  <td className="border border-gray-300 p-2">10:00 AM</td>
                  <td className="border border-gray-300 p-2">
                    <button className="text-blue-500">View Profile</button>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">John Doe</td>
                  <td className="border border-gray-300 p-2">10:00 AM</td>
                  <td className="border border-gray-300 p-2">
                    <button className="text-blue-500">View Profile</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
