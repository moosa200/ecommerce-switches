'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-2024-145', customer: 'John Doe', email: 'john@example.com', phone: '+92 300 1234567', date: '2024-01-31', amount: 2530, items: 3, status: 'processing' },
  { id: 'ORD-2024-144', customer: 'Jane Smith', email: 'jane@example.com', phone: '+92 321 9876543', date: '2024-01-31', amount: 1450, items: 2, status: 'shipped' },
  { id: 'ORD-2024-143', customer: 'Mike Johnson', email: 'mike@example.com', phone: '+92 333 5551234', date: '2024-01-30', amount: 3200, items: 5, status: 'delivered' },
  { id: 'ORD-2024-142', customer: 'Sarah Williams', email: 'sarah@example.com', phone: '+92 300 7778888', date: '2024-01-30', amount: 890, items: 1, status: 'pending' },
  { id: 'ORD-2024-141', customer: 'Tom Brown', email: 'tom@example.com', phone: '+92 321 4445555', date: '2024-01-29', amount: 1680, items: 2, status: 'processing' },
  { id: 'ORD-2024-140', customer: 'Lisa Davis', email: 'lisa@example.com', phone: '+92 333 2223333', date: '2024-01-29', amount: 950, items: 1, status: 'cancelled' },
  { id: 'ORD-2024-139', customer: 'David Miller', email: 'david@example.com', phone: '+92 300 6667777', date: '2024-01-28', amount: 2100, items: 3, status: 'delivered' },
  { id: 'ORD-2024-138', customer: 'Emma Wilson', email: 'emma@example.com', phone: '+92 321 8889999', date: '2024-01-28', amount: 1320, items: 2, status: 'shipped' },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Package },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-600">Manage customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">All Orders</p>
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Processing</p>
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'processing').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Shipped</p>
            <p className="text-2xl font-bold text-purple-600">
              {orders.filter(o => o.status === 'shipped').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order ID or customer name..."
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
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Items</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;

                  return (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <a 
                          href={`/admin/orders/${order.id}`}
                          className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                          {order.id}
                        </a>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-800">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{order.items}</td>
                      <td className="py-4 px-6 font-semibold text-gray-800">
                        PKR {order.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold w-fit ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href={`/admin/orders/${order.id}`}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}