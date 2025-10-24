"use client";

import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { User, DollarSign, Calendar } from "lucide-react";

export default function AnalyticsDashboard() {
  const metrics = [
    { title: "Total Bookings", value: 152, icon: <Calendar className="w-6 h-6 mx-auto text-primary" /> },
    { title: "Revenue", value: "$24,340", icon: <DollarSign className="w-6 h-6 mx-auto text-primary" /> },
    { title: "Active Guests", value: 18, icon: <User className="w-6 h-6 mx-auto text-primary" /> },
  ];

  const pieData = [
    { name: "Standard Rooms", value: 60 },
    { name: "Suite Rooms", value: 25 },
    { name: "Deluxe Rooms", value: 15 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

  const barData = [
    { month: "Jan", bookings: 30, revenue: 5000 },
    { month: "Feb", bookings: 45, revenue: 7000 },
    { month: "Mar", bookings: 50, revenue: 9000 },
    { month: "Apr", bookings: 60, revenue: 11000 },
    { month: "May", bookings: 70, revenue: 15000 },
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900">Analytics Overview</h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center transition-transform hover:scale-105">
            {metric.icon}
            <h3 className="text-lg font-medium text-gray-700 mt-2">{metric.title}</h3>
            <p className="text-3xl font-bold text-primary mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-xl p-6 h-80">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Bookings & Revenue</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#4F46E5" />
              <Bar dataKey="revenue" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-xl p-6 h-80 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Room Booking Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
