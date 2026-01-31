'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AccountSidebar from '@/components/AccountSidebar';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';

const mockAddresses = [
  {
    id: '1',
    label: 'Home',
    name: 'John Doe',
    phone: '+92 300 1234567',
    address: 'House 123, Street 5, Block A',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '75500',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Office',
    name: 'John Doe',
    phone: '+92 300 1234567',
    address: 'Office 301, Plaza Tower, Main Boulevard',
    city: 'Lahore',
    province: 'Punjab',
    postalCode: '54000',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSetDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(addr => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Address
                </button>
              </div>

              {/* Add Address Form */}
              {showAddForm && (
                <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-bold text-gray-800 mb-4">New Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Label (e.g., Home, Office)
                      </label>
                      <input
                        type="text"
                        placeholder="Home"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Province *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Province</option>
                          <option value="sindh">Sindh</option>
                          <option value="punjab">Punjab</option>
                          <option value="kpk">Khyber Pakhtunkhwa</option>
                          <option value="balochistan">Balochistan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Address List */}
              {addresses.length === 0 ? (
                <div className="text-center py-16">
                  <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No saved addresses</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border-2 rounded-lg p-6 ${
                        address.isDefault ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <MapPin className={address.isDefault ? 'text-blue-600' : 'text-gray-400'} />
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{address.label}</h3>
                            {address.isDefault && (
                              <span className="text-sm text-blue-600 font-semibold flex items-center gap-1">
                                <Check className="w-4 h-4" />
                                Default Address
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(address.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-gray-700 space-y-1 mb-4">
                        <p className="font-semibold">{address.name}</p>
                        <p>{address.phone}</p>
                        <p>{address.address}</p>
                        <p>
                          {address.city}, {address.province} {address.postalCode}
                        </p>
                      </div>

                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}