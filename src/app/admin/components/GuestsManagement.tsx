"use client";

import { useState } from "react";

export default function GuestsManagement() {
  const [guests, setGuests] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", room: "Suite Room", status: "Checked-in" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", room: "Standard Room", status: "Checked-out" },
    { id: 3, name: "Mike Brown", email: "mike@example.com", room: "Deluxe Room", status: "Reserved" },
  ]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Guests Management</h2>
      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Guest Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Room</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guests.map((guest) => (
              <tr key={guest.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{guest.name}</td>
                <td className="px-6 py-4">{guest.email}</td>
                <td className="px-6 py-4">{guest.room}</td>
                <td className={`px-6 py-4 font-semibold ${
                  guest.status === "Checked-in"
                    ? "text-green-600"
                    : guest.status === "Checked-out"
                    ? "text-gray-500"
                    : "text-yellow-600"
                }`}>{guest.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
