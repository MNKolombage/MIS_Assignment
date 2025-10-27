"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Star,
} from "lucide-react";

interface Room {
  id: number;
  name: string;
  type: string;
  status: "Available" | "Occupied" | "Maintenance" | "Cleaning" | "Blocked";
  price: number;
  capacity: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  currentGuest?: string;
  checkOut?: string;
  rating: number;
  reviews: number;
  lastMaintenance: string;
  nextMaintenance?: string;
  image?: string;
}

export default function RoomsManagement() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: "Oceanview Villa",
      type: "Villa",
      status: "Available",
      price: 250,
      capacity: 6,
      beds: 3,
      bathrooms: 2,
      amenities: ["WiFi", "Pool", "Kitchen", "AC", "Balcony"],
      rating: 4.8,
      reviews: 45,
      lastMaintenance: "2024-10-15",
      nextMaintenance: "2024-11-15",
      image: "public/Gallery/img7.jpg",
    },
    {
      id: 2,
      name: "Garden Suite",
      type: "Suite",
      status: "Occupied",
      price: 180,
      capacity: 4,
      beds: 2,
      bathrooms: 1,
      amenities: ["WiFi", "AC", "Garden View", "Minibar"],
      currentGuest: "John Smith",
      checkOut: "2024-10-28",
      rating: 4.6,
      reviews: 32,
      lastMaintenance: "2024-10-10",
      image: "public/Gallery/img8.jpg",
    },
    {
      id: 3,
      name: "Deluxe Room",
      type: "Deluxe",
      status: "Maintenance",
      price: 150,
      capacity: 2,
      beds: 1,
      bathrooms: 1,
      amenities: ["WiFi", "AC", "Workspace"],
      rating: 4.5,
      reviews: 28,
      lastMaintenance: "2024-10-20",
      nextMaintenance: "2024-11-20",
      image: "public/Gallery/img10.jpg",
    },
    {
      id: 4,
      name: "Beachfront Bungalow",
      type: "Bungalow",
      status: "Cleaning",
      price: 200,
      capacity: 4,
      beds: 2,
      bathrooms: 2,
      amenities: [
        "WiFi",
        "Pool Access",
        "Beach Access",
        "AC",
        "Outdoor Shower",
      ],
      rating: 4.9,
      reviews: 56,
      lastMaintenance: "2024-10-18",
      image: "public/Gallery/img9.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");
  const [expandedRoom, setExpandedRoom] = useState<number | null>(null);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || room.status === filterStatus;
    const matchesType = filterType === "All" || room.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Occupied":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-red-100 text-red-800";
      case "Cleaning":
        return "bg-yellow-100 text-yellow-800";
      case "Blocked":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const roomTypes = ["All", ...new Set(rooms.map((r) => r.type))];
  const statuses = [
    "All",
    "Available",
    "Occupied",
    "Maintenance",
    "Cleaning",
    "Blocked",
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Rooms Management
        </h2>
        <button className="bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700">
          <Plus size={20} />
          Add New Room
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Rooms
            </label>
            <input
              type="text"
              placeholder="Search by room name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Room
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Price/Night
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRooms.map((room) => (
              <React.Fragment key={room.id}>
                <tr className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={room.image || "/placeholder.svg"}
                        alt={room.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{room.name}</p>
                        <p className="text-sm text-gray-500">
                          {room.beds} bed(s), {room.bathrooms} bath(s)
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-700">{room.type}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${room.price}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {room.capacity} guests
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        room.status
                      )}`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="font-medium text-gray-900">
                        {room.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({room.reviews})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setExpandedRoom(
                          expandedRoom === room.id ? null : room.id
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition ${
                          expandedRoom === room.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </td>
                </tr>

                {expandedRoom === room.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Amenities
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Maintenance
                          </h4>
                          <p className="text-sm text-gray-600">
                            Last: {room.lastMaintenance}
                          </p>
                          {room.nextMaintenance && (
                            <p className="text-sm text-gray-600">
                              Next: {room.nextMaintenance}
                            </p>
                          )}
                        </div>

                        {room.currentGuest && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Current Guest
                            </h4>
                            <p className="text-sm text-gray-600">
                              {room.currentGuest}
                            </p>
                            <p className="text-sm text-gray-600">
                              Check-out: {room.checkOut}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-500">No rooms found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
