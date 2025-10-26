"use client"

import { useState } from "react"
import { User, DollarSign, Calendar, Home, Star, ArrowUp, ArrowDown } from "lucide-react"

export default function AnalyticsDashboard() {
  const [timePeriod, setTimePeriod] = useState("month")

  const metrics = [
    {
      title: "Total Bookings",
      value: 152,
      change: "+12%",
      trend: "up",
      icon: <Calendar className="w-6 h-6 mx-auto text-blue-600" />,
    },
    {
      title: "Revenue",
      value: "$24,340",
      change: "+18%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6 mx-auto text-green-600" />,
    },
    {
      title: "Active Guests",
      value: 18,
      change: "+5%",
      trend: "up",
      icon: <User className="w-6 h-6 mx-auto text-purple-600" />,
    },
    {
      title: "Occupancy Rate",
      value: "78%",
      change: "+8%",
      trend: "up",
      icon: <Home className="w-6 h-6 mx-auto text-orange-600" />,
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 18000 },
    { month: "Feb", revenue: 22000 },
    { month: "Mar", revenue: 19500 },
    { month: "Apr", revenue: 25000 },
    { month: "May", revenue: 24340 },
  ]

  const barData = [
    { month: "Jan", bookings: 30 },
    { month: "Feb", bookings: 45 },
    { month: "Mar", bookings: 50 },
    { month: "Apr", bookings: 60 },
    { month: "May", bookings: 70 },
  ]

  const maxBookings = Math.max(...barData.map((d) => d.bookings))
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))

  const villaPerformance = [
    { name: "Ocean View Villa", bookings: 45, revenue: "$8,500", rating: 4.8 },
    { name: "Mountain Retreat", bookings: 38, revenue: "$7,200", rating: 4.6 },
    { name: "Garden Paradise", bookings: 35, revenue: "$6,800", rating: 4.5 },
    { name: "Sunset Escape", bookings: 34, revenue: "$1,840", rating: 4.4 },
  ]

  const pieData = [
    { name: "Standard Rooms", value: 60, color: "#4F46E5" },
    { name: "Suite Rooms", value: 25, color: "#10B981" },
    { name: "Deluxe Rooms", value: 15, color: "#F59E0B" },
  ]

  const upcomingBookings = [
    { guest: "John Smith", villa: "Ocean View Villa", checkIn: "2024-01-15", nights: 3 },
    { guest: "Sarah Johnson", villa: "Mountain Retreat", checkIn: "2024-01-16", nights: 5 },
    { guest: "Mike Davis", villa: "Garden Paradise", checkIn: "2024-01-18", nights: 2 },
  ]

  const kpis = [
    { label: "Avg Daily Rate", value: "$320", change: "+5%" },
    { label: "Cancellation Rate", value: "3.2%", change: "-1.5%" },
    { label: "Repeat Guests", value: "24%", change: "+3%" },
    { label: "Avg Rating", value: "4.6/5", change: "+0.2" },
  ]

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Analytics Overview</h2>
        <div className="flex gap-2">
          {["week", "month", "year"].map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timePeriod === period ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col transition-transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              {metric.icon}
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {metric.change}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-6">
            <p className="text-sm text-gray-600 mb-2">{kpi.label}</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <span className="text-xs text-green-600 font-semibold">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Monthly Bookings</h3>
          <div className="flex items-end justify-around h-64 gap-2">
            {barData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="relative h-48 w-12 bg-gray-100 rounded-t-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-blue-600 transition-all"
                    style={{ height: `${(item.bookings / maxBookings) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">{item.month}</span>
                <span className="text-xs text-gray-500">{item.bookings}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Revenue Trend</h3>
          <div className="flex items-end justify-around h-64 gap-2">
            {revenueData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="relative h-48 w-12 bg-gray-100 rounded-t-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-green-600 transition-all"
                    style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">{item.month}</span>
                <span className="text-xs text-gray-500">${(item.revenue / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Top Performing Villas</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Villa Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Bookings</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Rating</th>
              </tr>
            </thead>
            <tbody>
              {villaPerformance.map((villa, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{villa.name}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">{villa.bookings}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-green-600">{villa.revenue}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{villa.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Upcoming Bookings (Next 7 Days)</h3>
          <div className="space-y-4">
            {upcomingBookings.map((booking, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{booking.guest}</p>
                  <p className="text-sm text-gray-600">{booking.villa}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Check-in: {booking.checkIn} • {booking.nights} nights
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Room Distribution</h3>
          <div className="flex flex-col gap-4">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                <div className="w-32 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 w-8">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
