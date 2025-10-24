"use client";

import { useState } from "react";

export default function RoomsManagement() {
  const [rooms, setRooms] = useState([
    { id: 1, name: "Standard Room", type: "Standard", status: "Available" },
    { id: 2, name: "Suite Room", type: "Suite", status: "Occupied" },
    { id: 3, name: "Deluxe Room", type: "Deluxe", status: "Maintenance" },
  ]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rooms Management</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Room Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{room.name}</td>
                <td className="px-6 py-4">{room.type}</td>
                <td className={`px-6 py-4 font-semibold ${
                  room.status === "Available"
                    ? "text-green-600"
                    : room.status === "Occupied"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>{room.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
