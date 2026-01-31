'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Search, Eye, Ban, CheckCircle } from 'lucide-react';

const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+92 300 1234567', joined: '2024-01-15', orders: 5, totalSpent: 12500, status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+92 321 9876543', joined: '2024-01-20', orders: 3, totalSpent: 8400, status: 'active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+92 333 5551234', joined: '2024-01-10', orders: 8, totalSpent: 18900, status: 'active' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+92 300 7778888', joined: '2024-01-25', orders: 2, totalSpent: 4200, status: 'active' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', phone: '+92 321 4445555', joined: '2024-01-18', orders: 1, totalSpent: 1680, status: 'disabled' },
  { id: '6', name: 'Lisa Davis', email: 'lisa@example.com', phone: '+92 333 2223333', joined: '2024-01-22', orders: 4, totalSpent: 9800, status: 'active' },
  { id: '7', name: 'David Miller', email: 'david@example.com', phone: '+92 300 6667777', joined: '2024-01-12', orders: 6, totalSpent: 15300, status: 'active' },
  { id: '8', name: 'Emma Wilson', email: 'emma@example.com', phone: '+92 321 8889999', joined: '2024-01-28', orders: 2, totalSpent: 5600, status: 'active' },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleStatus = (id: string) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id
          ? { ...customer, status: customer.status === 'active' ? 'disabled' : 'active' }
          : customer
      )
    );
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-600">Manage registered customers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Customers</p>
            <p className="text-3xl font-bold text-gray-800">{customers.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Active Customers</p>
            <p className="text-3xl font-bold text-green-600">
              {customers.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-blue-600">
              {customers.reduce((sum, c) => sum + c.orders, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-purple-600">
              PKR {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Joined</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Orders</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Total Spent</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <p className="font-semibold text-gray-800">{customer.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p className="text-gray-700">{customer.email}</p>
                        <p className="text-gray-500">{customer.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(customer.joined).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{customer.orders}</td>
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      PKR {customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.status === 'active' ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <a
                          href={`/admin/customers/${customer.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleToggleStatus(customer.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            customer.status === 'active'
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                          title={customer.status === 'active' ? 'Disable Account' : 'Enable Account'}
                        >
                          {customer.status === 'active' ? (
                            <Ban className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No customers found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}