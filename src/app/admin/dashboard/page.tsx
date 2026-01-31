'use client';

import AdminSidebar from '@/components/AdminSidebar';
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  {
    label: 'Total Products',
    value: '248',
    change: '+12',
    changeType: 'increase',
    icon: Package,
    color: 'blue'
  },
  {
    label: 'Total Orders',
    value: '1,453',
    change: '+23%',
    changeType: 'increase',
    icon: ShoppingBag,
    color: 'green'
  },
  {
    label: 'Total Customers',
    value: '892',
    change: '+18',
    changeType: 'increase',
    icon: Users,
    color: 'purple'
  },
  {
    label: 'Total Revenue',
    value: 'PKR 2.4M',
    change: '+15%',
    changeType: 'increase',
    icon: DollarSign,
    color: 'yellow'
  }
];

const recentOrders = [
  { id: 'ORD-2024-145', customer: 'John Doe', amount: 2530, status: 'processing', date: '2024-01-31' },
  { id: 'ORD-2024-144', customer: 'Jane Smith', amount: 1450, status: 'shipped', date: '2024-01-31' },
  { id: 'ORD-2024-143', customer: 'Mike Johnson', amount: 3200, status: 'delivered', date: '2024-01-30' },
  { id: 'ORD-2024-142', customer: 'Sarah Williams', amount: 890, status: 'pending', date: '2024-01-30' },
  { id: 'ORD-2024-141', customer: 'Tom Brown', amount: 1680, status: 'processing', date: '2024-01-29' },
];

const orderStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colors: Record<string, string> = {
              blue: 'bg-blue-500',
              green: 'bg-green-500',
              purple: 'bg-purple-500',
              yellow: 'bg-yellow-500'
            };

            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colors[stat.color]}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Order Status Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Pending</span>
                <span className="font-bold text-yellow-600">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Processing</span>
                <span className="font-bold text-blue-600">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Shipped</span>
                <span className="font-bold text-purple-600">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Delivered</span>
                <span className="font-bold text-green-600">1,358</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a href="/admin/products/new" className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-center font-semibold transition-colors">
                Add New Product
              </a>
              <a href="/admin/orders" className="block w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 text-center font-semibold transition-colors">
                View All Orders
              </a>
              <a href="/admin/reports" className="block w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 text-center font-semibold transition-colors">
                Generate Report
              </a>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <a href="/admin/orders" className="text-blue-600 hover:text-blue-700 font-semibold">
              View All →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <a href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-700 font-semibold">
                        {order.id}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      PKR {order.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${orderStatusColors[order.status]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}