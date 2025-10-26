"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Users, Home } from "lucide-react"

interface Booking {
  id: number
  guestName: string
  villaName: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "pending" | "cancelled"
  eventType?: string
}

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  bookings: Booking[]
}

export default function BookingsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1))
  const [selectedVilla, setSelectedVilla] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const bookings: Booking[] = [
    {
      id: 1,
      guestName: "John Doe",
      villaName: "Ocean View Villa",
      checkIn: "2024-01-05",
      checkOut: "2024-01-10",
      status: "confirmed",
      eventType: "Vacation",
    },
    {
      id: 2,
      guestName: "Jane Smith",
      villaName: "Mountain Retreat",
      checkIn: "2024-01-08",
      checkOut: "2024-01-15",
      status: "confirmed",
      eventType: "Wedding",
    },
    {
      id: 3,
      guestName: "Mike Brown",
      villaName: "Ocean View Villa",
      checkIn: "2024-01-12",
      checkOut: "2024-01-18",
      status: "pending",
      eventType: "Business",
    },
    {
      id: 4,
      guestName: "Sarah Wilson",
      villaName: "Garden Paradise",
      checkIn: "2024-01-20",
      checkOut: "2024-01-25",
      status: "confirmed",
      eventType: "Anniversary",
    },
    {
      id: 5,
      guestName: "Tom Harris",
      villaName: "Mountain Retreat",
      checkIn: "2024-01-22",
      checkOut: "2024-01-28",
      status: "cancelled",
      eventType: "Vacation",
    },
  ]

  const villas = ["Ocean View Villa", "Mountain Retreat", "Garden Paradise"]

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: CalendarDay[] = []

    // Previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        bookings: [],
      })
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const dateStr = date.toISOString().split("T")[0]
      const dayBookings = bookings.filter((booking) => {
        const checkIn = new Date(booking.checkIn)
        const checkOut = new Date(booking.checkOut)
        const isInRange = date >= checkIn && date <= checkOut
        const villaMatch = selectedVilla === "all" || booking.villaName === selectedVilla
        const statusMatch = selectedStatus === "all" || booking.status === selectedStatus
        return isInRange && villaMatch && statusMatch
      })

      days.push({
        date,
        isCurrentMonth: true,
        bookings: dayBookings,
      })
    }

    // Next month's days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        bookings: [],
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventColor = (eventType?: string) => {
    switch (eventType) {
      case "Wedding":
        return "border-l-4 border-pink-500"
      case "Anniversary":
        return "border-l-4 border-red-500"
      case "Business":
        return "border-l-4 border-blue-500"
      case "Vacation":
        return "border-l-4 border-green-500"
      default:
        return "border-l-4 border-gray-500"
    }
  }

  return (
    <div className="p-8 space-y-6 h-full bg-gray-50">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Bookings Calendar</h2>
        <div className="flex gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 flex gap-4 flex-wrap">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Villa</label>
          <select
            value={selectedVilla}
            onChange={(e) => setSelectedVilla(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Villas</option>
            {villas.map((villa) => (
              <option key={villa} value={villa}>
                {villa}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header with month navigation */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-blue-500 rounded-lg transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <button onClick={handleNextMonth} className="p-2 hover:bg-blue-500 rounded-lg transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-0 border-b border-gray-200">
          {weekDays.map((day) => (
            <div key={day} className="p-4 text-center font-semibold text-gray-700 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-32 p-2 border border-gray-200 ${!day.isCurrentMonth ? "bg-gray-50" : "bg-white"}`}
            >
              <div className={`text-sm font-semibold mb-2 ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}`}>
                {day.date.getDate()}
              </div>

              <div className="space-y-1">
                {day.bookings.slice(0, 2).map((booking) => (
                  <div
                    key={booking.id}
                    className={`text-xs p-1 rounded bg-blue-50 text-blue-700 truncate ${getEventColor(
                      booking.eventType,
                    )}`}
                    title={`${booking.guestName} - ${booking.villaName}`}
                  >
                    <div className="font-semibold truncate">{booking.guestName}</div>
                    <div className="text-xs truncate">{booking.villaName}</div>
                  </div>
                ))}
                {day.bookings.length > 2 && (
                  <div className="text-xs text-gray-500 px-1">+{day.bookings.length - 2} more</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Upcoming Bookings</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Guest</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Villa</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Check-in</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Check-out</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Event</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings
                .filter((booking) => {
                  const villaMatch = selectedVilla === "all" || booking.villaName === selectedVilla
                  const statusMatch = selectedStatus === "all" || booking.status === selectedStatus
                  return villaMatch && statusMatch
                })
                .map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        {booking.guestName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-400" />
                        {booking.villaName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.eventType}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Event Type Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-l-4 border-pink-500"></div>
            <span className="text-sm text-gray-700">Wedding</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-l-4 border-red-500"></div>
            <span className="text-sm text-gray-700">Anniversary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-l-4 border-blue-500"></div>
            <span className="text-sm text-gray-700">Business</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-l-4 border-green-500"></div>
            <span className="text-sm text-gray-700">Vacation</span>
          </div>
        </div>
      </div>
    </div>
  )
}
