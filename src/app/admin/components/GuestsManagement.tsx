"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function GuestsManagement() {
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      room: "Suite Room",
      phone: "077-1234567",
      checkIn: "2025-10-20",
      checkOut: "2025-10-25",
      status: "Checked-in",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      room: "Standard Room",
      phone: "071-9876543",
      checkIn: "2025-10-10",
      checkOut: "2025-10-12",
      status: "Checked-out",
    },
    {
      id: 3,
      name: "Mike Brown",
      email: "mike@example.com",
      room: "Deluxe Room",
      phone: "075-4443322",
      checkIn: "2025-10-28",
      checkOut: "2025-10-31",
      status: "Reserved",
    },
    {
      id: 4,
      name: "John Doe",
      email: "john@example.com",
      room: "Suite Room",
      phone: "077-1234567",
      checkIn: "2025-10-20",
      checkOut: "2025-10-25",
      status: "Checked-in",
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "jane@example.com",
      room: "Standard Room",
      phone: "071-9876543",
      checkIn: "2025-10-10",
      checkOut: "2025-10-12",
      status: "Checked-out",
    },
    {
      id: 6,
      name: "Mike Brown",
      email: "mike@example.com",
      room: "Deluxe Room",
      phone: "075-4443322",
      checkIn: "2025-10-28",
      checkOut: "2025-10-31",
      status: "Reserved",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || guest.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Guests Management
      </h2>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search guest..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Checked-in">Checked-in</option>
            <option value="Checked-out">Checked-out</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>

        <button
          onClick={() => alert("Add Guest feature coming soon!")}
          className="bg-red-800 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
        >
          + Add Guest
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Guest Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Room
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Check-in
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Check-out
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">{guest.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guest.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guest.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guest.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {guest.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {guest.checkOut}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold whitespace-nowrap ${
                      guest.status === "Checked-in"
                        ? "text-green-600"
                        : guest.status === "Checked-out"
                        ? "text-gray-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {guest.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setGuests(guests.filter((g) => g.id !== guest.id))
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-6">
                  No guests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
