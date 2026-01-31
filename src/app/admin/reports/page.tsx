'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Calendar, Download, TrendingUp, TrendingDown, Package, DollarSign, Users, ShoppingBag } from 'lucide-react';

const salesData = {
  today: { revenue: 45800, orders: 12, avgOrder: 3817 },
  thisWeek: { revenue: 285600, orders: 68, avgOrder: 4200 },
  thisMonth: { revenue: 1240000, orders: 289, avgOrder: 4290 },
  lastMonth: { revenue: 1180000, orders: 275, avgOrder: 4291 },
};

const topProducts = [
  { id: '1', name: 'Karbonic 1 Gang Switch', code: 'KRB-1G-WH', unitsSold: 156, revenue: 70200 },
  { id: '2', name: 'Karbonic 2 Gang Switch', code: 'KRB-2G-WH', unitsSold: 98, revenue: 66640 },
  { id: '3', name: 'Crystal 1 Gang Switch', code: 'CRY-1G-WH', unitsSold: 45, revenue: 38250 },
  { id: '4', name: 'Karbonic Socket White', code: 'KRB-SK-WH', unitsSold: 89, revenue: 31150 },
  { id: '5', name: 'Allure 1 Gang Switch', code: 'ALR-1G-WH', unitsSold: 67, revenue: 48240 },
];

const lowStockProducts = [
  { id: '1', name: 'Crystal 1 Gang Switch', code: 'CRY-1G-WH', stock: 3, reorderLevel: 10 },
  { id: '2', name: 'Allure 2 Gang Switch', code: 'ALR-2G-WH', stock: 5, reorderLevel: 10 },
  { id: '3', name: 'Crystal Socket Gold', code: 'CRY-SK-GD', stock: 2, reorderLevel: 10 },
  { id: '4', name: 'Modular 3 Gang Switch', code: 'MOD-3G-WH', stock: 7, reorderLevel: 10 },
];

const recentCustomers = [
  { name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: 12500, joined: '2024-01-15' },
  { name: 'Jane Smith', email: 'jane@example.com', orders: 3, totalSpent: 8400, joined: '2024-01-20' },
  { name: 'Mike Johnson', email: 'mike@example.com', orders: 8, totalSpent: 18900, joined: '2024-01-10' },
];

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState('thisMonth');

  const monthChange = ((salesData.thisMonth.revenue - salesData.lastMonth.revenue) / salesData.lastMonth.revenue * 100).toFixed(1);
  const isPositive = parseFloat(monthChange) > 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
            <p className="text-gray-600">Monitor your store performance</p>
          </div>
          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {Math.abs(parseFloat(monthChange))}%
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-800">
              PKR {salesData[dateRange as keyof typeof salesData].revenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-800">
              {salesData[dateRange as keyof typeof salesData].orders}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">Avg Order Value</h3>
            <p className="text-2xl font-bold text-gray-800">
              PKR {salesData[dateRange as keyof typeof salesData].avgOrder.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">New Customers</h3>
            <p className="text-2xl font-bold text-gray-800">24</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Top Selling Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">PKR {product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{product.unitsSold} units</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Low Stock Alert</h2>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{product.stock} left</p>
                    <p className="text-xs text-gray-600">Reorder: {product.reorderLevel}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/admin/products?filter=lowstock"
              className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Low Stock Items
            </a>
          </div>
        </div>

        {/* Recent Customers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Customers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map((customer) => (
                  <tr key={customer.email} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-800">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(customer.joined).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{customer.orders}</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      PKR {customer.totalSpent.toLocaleString()}
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