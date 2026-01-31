'use client';

import Header from '@/components/Header';
import AccountSidebar from '@/components/AccountSidebar';
import { Package, Truck, CheckCircle, XCircle, Eye } from 'lucide-react';

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-28',
    status: 'delivered',
    total: 2530,
    items: 3,
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-30',
    status: 'shipped',
    total: 1450,
    items: 2,
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-31',
    status: 'processing',
    total: 3200,
    items: 5,
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-25',
    status: 'cancelled',
    total: 890,
    items: 1,
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Package },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
        
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>

              {mockOrders.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No orders yet</p>
                  <a
                    href="/"
                    className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Start Shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;

                    return (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              Ordered on {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>

                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {status.label}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-gray-700">
                              <span className="font-semibold">{order.items}</span> item{order.items > 1 ? 's' : ''}
                            </p>
                            <p className="text-lg font-bold text-gray-800">
                              PKR {order.total.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <a
                              href={`/account/orders/${order.id}`}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </a>

                            {order.status === 'delivered' && (
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}