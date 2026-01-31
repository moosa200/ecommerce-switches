'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Search, Phone, Mail, MapPin, Calendar, Clock } from 'lucide-react';

const mockBookings = [
  { 
    id: '1', 
    customer: 'John Doe', 
    phone: '+92 300 1234567', 
    email: 'john@example.com',
    address: 'House 123, Street 5, Block A, Karachi',
    preferredDate: '2024-02-05',
    preferredTime: 'morning',
    message: 'Need to install 5 switches in new bedroom',
    status: 'pending',
    submittedAt: '2024-01-31T14:30:00'
  },
  { 
    id: '2', 
    customer: 'Jane Smith', 
    phone: '+92 321 9876543', 
    email: 'jane@example.com',
    address: 'Office 301, Plaza Tower, Main Boulevard, Lahore',
    preferredDate: '2024-02-03',
    preferredTime: 'afternoon',
    message: 'Replace all switches in office - approximately 20 units',
    status: 'confirmed',
    submittedAt: '2024-01-30T09:15:00'
  },
  { 
    id: '3', 
    customer: 'Mike Johnson', 
    phone: '+92 333 5551234', 
    email: 'mike@example.com',
    address: 'Flat 5B, Garden Apartments, Islamabad',
    preferredDate: '2024-02-02',
    preferredTime: 'evening',
    message: 'Emergency - one switch is sparking',
    status: 'completed',
    submittedAt: '2024-01-29T16:45:00'
  },
  { 
    id: '4', 
    customer: 'Sarah Williams', 
    phone: '+92 300 7778888', 
    email: 'sarah@example.com',
    address: 'House 456, DHA Phase 6, Karachi',
    preferredDate: '2024-02-04',
    preferredTime: 'morning',
    message: 'Install new modular switches throughout house',
    status: 'pending',
    submittedAt: '2024-01-31T11:20:00'
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
};

const timeSlots = {
  morning: 'Morning (9 AM - 12 PM)',
  afternoon: 'Afternoon (12 PM - 4 PM)',
  evening: 'Evening (4 PM - 7 PM)',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Electrician Bookings</h1>
          <p className="text-gray-600">Manage service requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Requests</p>
            <p className="text-3xl font-bold text-gray-800">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Confirmed</p>
            <p className="text-3xl font-bold text-blue-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by customer name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const status = statusConfig[booking.status as keyof typeof statusConfig];

            return (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{booking.customer}</h3>
                    <p className="text-sm text-gray-500">
                      Submitted on {new Date(booking.submittedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-800">{booking.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-800">{booking.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold text-gray-800">{booking.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Preferred Date</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(booking.preferredDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Preferred Time</p>
                        <p className="font-semibold text-gray-800">
                          {timeSlots[booking.preferredTime as keyof typeof timeSlots]}
                        </p>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="pt-2">
                        <p className="text-sm text-gray-600 mb-1">Additional Requirements</p>
                        <p className="text-gray-800">{booking.message}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <select
                    value={booking.status}
                    onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <a
                    href={`tel:${booking.phone}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Customer
                  </a>

                  <a
                    href={`mailto:${booking.email}`}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-16 text-center">
            <p className="text-gray-500">No booking requests found</p>
          </div>
        )}
      </main>
    </div>
  );
}