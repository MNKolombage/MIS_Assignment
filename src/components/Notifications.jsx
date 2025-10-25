"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Bell, X, Check, Clock, Calendar, CreditCard, Gift, AlertCircle, DollarSign, UserX } from 'lucide-react'

// Demo notification data
const demoNotifications = [
  // User/Guest Notifications
  {
    id: 1,
    type: 'booking_confirmation',
    title: 'Booking Confirmed!',
    message: 'Your stay from Oct 30–Nov 2, 2024 is confirmed at Nisala Villa',
    timestamp: '2 minutes ago',
    icon: Check,
    category: 'user',
    read: false
  },
  {
    id: 2,
    type: 'payment_success',
    title: 'Payment Successful',
    message: 'Your payment of $450 has been processed successfully',
    timestamp: '1 hour ago',
    icon: DollarSign,
    category: 'user',
    read: false
  },
  {
    id: 3,
    type: 'upcoming_stay',
    title: 'Upcoming Stay Reminder',
    message: 'Your stay is in 3 days! Preparing for your arrival',
    timestamp: '5 hours ago',
    icon: Calendar,
    category: 'user',
    read: false
  },
  {
    id: 4,
    type: 'special_offer',
    title: 'Special Offer Available',
    message: 'Get 20% off on extended stays this month!',
    timestamp: '1 day ago',
    icon: Gift,
    category: 'user',
    read: true
  },
  // Admin Notifications
  {
    id: 5,
    type: 'new_booking',
    title: 'New Booking Received',
    message: 'John Smith booked Villa A from Oct 15–20, 2024',
    timestamp: '10 minutes ago',
    icon: Calendar,
    category: 'admin',
    read: false
  },
  {
    id: 6,
    type: 'payment_received',
    title: 'Payment Received',
    message: 'Payment of $650 received from booking #1234',
    timestamp: '30 minutes ago',
    icon: DollarSign,
    category: 'admin',
    read: false
  },
  {
    id: 7,
    type: 'booking_cancelled',
    title: 'Booking Cancelled',
    message: 'Guest cancelled booking #1230 for Oct 10-15',
    timestamp: '2 hours ago',
    icon: UserX,
    category: 'admin',
    read: true
  },
  {
    id: 8,
    type: 'payment_failed',
    title: 'Payment Failed',
    message: 'Payment failed for booking #1235. Requires attention',
    timestamp: '1 day ago',
    icon: AlertCircle,
    category: 'admin',
    read: true
  }
]

const ACCENT_BUTTON = '#5F0606'
const ACCENT_TEXT = '#6B3A3A'
const BG_COLOR = '#FFFBF2'

export default function Notifications({ userRole = 'user' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notifications, setNotifications] = useState(demoNotifications)
  const dropdownRef = useRef(null)

  // Filter notifications based on user role
  const filteredNotifications = notifications.filter(
    notif => notif.category === userRole || userRole === 'admin'
  )

  // Count unread notifications
  const unreadCount = filteredNotifications.filter(n => !n.read).length

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.category === userRole || userRole === 'admin'
          ? { ...notif, read: true }
          : notif
      )
    )
  }

  // Get icon color based on type
  const getIconColor = (type) => {
    const colorMap = {
      booking_confirmation: 'text-green-600',
      payment_success: 'text-green-600',
      upcoming_stay: 'text-blue-600',
      special_offer: 'text-yellow-600',
      new_booking: 'text-blue-600',
      payment_received: 'text-green-600',
      booking_cancelled: 'text-red-600',
      payment_failed: 'text-red-600'
    }
    return colorMap[type] || 'text-gray-600'
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        
        {/* Badge Count */}
        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white rounded-full shadow-lg"
            style={{ backgroundColor: ACCENT_BUTTON }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden"
          style={{ top: '100%' }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
            style={{ backgroundColor: BG_COLOR }}
          >
            <h3 className="text-lg font-bold" style={{ color: ACCENT_TEXT }}>
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No notifications yet</p>
              </div>
            ) : (
              filteredNotifications.map(notification => {
                const Icon = notification.icon
                const iconColor = getIconColor(notification.type)

                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`px-6 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconColor} bg-gray-100`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                              style={{ backgroundColor: ACCENT_BUTTON }}
                            />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                setIsOpen(false)
                setIsModalOpen(true)
              }}
              className="w-full text-center text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: ACCENT_TEXT }}
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}

      {/* Backdrop (optional - darkens background) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* View All Notifications Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col z-50">
            {/* Modal Header */}
            <div
              className="px-6 py-5 border-b border-gray-200 flex items-center justify-between rounded-t-2xl"
              style={{ backgroundColor: BG_COLOR }}
            >
              <div>
                <h2 className="text-2xl font-bold" style={{ color: ACCENT_TEXT }}>
                  All Notifications
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredNotifications.length} total notification{filteredNotifications.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Body - Notifications List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map(notification => {
                    const Icon = notification.icon
                    const iconColor = getIconColor(notification.type)

                    return (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-all ${
                          !notification.read ? 'bg-blue-50/50 border-blue-200' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconColor} bg-gray-100`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div
                                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                                  style={{ backgroundColor: ACCENT_BUTTON }}
                                />
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {filteredNotifications.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex items-center justify-between">
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Mark all as read
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: ACCENT_BUTTON }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
