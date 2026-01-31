'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Package, User, MapPin, CreditCard, Printer } from 'lucide-react';

const mockOrderDetails = {
  id: 'ORD-2024-145',
  date: '2024-01-31T10:30:00',
  status: 'processing',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+92 300 1234567'
  },
  shippingAddress: {
    street: 'House 123, Street 5, Block A',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '75500'
  },
  billingAddress: {
    street: 'House 123, Street 5, Block A',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '75500'
  },
  items: [
    { id: '1', name: 'Karbonic 1 Gang Switch', code: 'KRB-1G-WH', quantity: 2, price: 450 },
    { id: '2', name: 'Karbonic 2 Gang Switch', code: 'KRB-2G-WH', quantity: 1, price: 680 },
  ],
  subtotal: 1580,
  shipping: 200,
  total: 1780,
  timeline: [
    { status: 'pending', date: '2024-01-31 10:30', description: 'Order placed' },
    { status: 'processing', date: '2024-01-31 11:00', description: 'Order confirmed and processing' },
  ]
};

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const [orderStatus, setOrderStatus] = useState(mockOrderDetails.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    // TODO: Update via API
    setTimeout(() => {
      setIsUpdating(false);
      alert('Order status updated successfully');
    }, 1000);
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{mockOrderDetails.id}</h1>
            <p className="text-gray-600">
              Ordered on {new Date(mockOrderDetails.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </h2>
              <div className="space-y-4">
                {mockOrderDetails.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🔌</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Code: {item.code}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Qty: {item.quantity} × PKR {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">
                        PKR {(item.quantity * item.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">PKR {mockOrderDetails.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">PKR {mockOrderDetails.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span>PKR {mockOrderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-semibold">Name:</span> {mockOrderDetails.customer.name}</p>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> {mockOrderDetails.customer.email}</p>
                <p className="text-gray-700"><span className="font-semibold">Phone:</span> {mockOrderDetails.customer.phone}</p>
              </div>
            </div>

            {/* Addresses */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </h2>
                <div className="text-gray-700 space-y-1">
                  <p>{mockOrderDetails.shippingAddress.street}</p>
                  <p>{mockOrderDetails.shippingAddress.city}, {mockOrderDetails.shippingAddress.province}</p>
                  <p>{mockOrderDetails.shippingAddress.postalCode}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing Address
                </h2>
                <div className="text-gray-700 space-y-1">
                  <p>{mockOrderDetails.billingAddress.street}</p>
                  <p>{mockOrderDetails.billingAddress.city}, {mockOrderDetails.billingAddress.province}</p>
                  <p>{mockOrderDetails.billingAddress.postalCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Update Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Status</h2>
              <div className="space-y-4">
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={handleUpdateStatus}
                  disabled={isUpdating}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold transition-colors"
                >
                  {isUpdating ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Timeline</h2>
              <div className="space-y-4">
                {mockOrderDetails.timeline.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColors[event.status]}`}>
                        <div className="w-3 h-3 bg-current rounded-full"></div>
                      </div>
                      {index < mockOrderDetails.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-800 capitalize">{event.status}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}