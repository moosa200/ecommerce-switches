'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';

const mockRanges = [
  {
    id: '1',
    name: 'KARBONIC',
    slug: 'karbonic',
    tagline: 'Fine Polycarbonate switches',
    description: 'High-quality polycarbonate switches with superior durability and elegant design',
    productCount: 12,
    highlights: [
      'Fire retardant polycarbonate material',
      'High gloss finish',
      'Easy installation',
      'Child safety shutter'
    ],
    status: 'active'
  },
  {
    id: '2',
    name: 'CRYSTAL',
    slug: 'crystal',
    tagline: 'Premium glass finish switches',
    description: 'Elegant glass finish switches for modern interiors',
    productCount: 8,
    highlights: [
      'Tempered glass panel',
      'LED indicator',
      'Touch sensitive',
      'Luxury finish'
    ],
    status: 'active'
  },
  {
    id: '3',
    name: 'ALLURE',
    slug: 'allure',
    tagline: 'Elegant modern design',
    description: 'Contemporary design switches for stylish homes',
    productCount: 10,
    highlights: [
      'Slim profile design',
      'Premium materials',
      'Multiple color options',
      'Long lasting'
    ],
    status: 'active'
  },
  {
    id: '4',
    name: 'SOCKET',
    slug: 'socket',
    tagline: 'Universal socket solutions',
    description: 'Versatile socket range for all your power needs',
    productCount: 15,
    highlights: [
      'Universal compatibility',
      'Safety shutters',
      'High current rating',
      'Durable construction'
    ],
    status: 'active'
  },
  {
    id: '5',
    name: 'MODULAR',
    slug: 'modular',
    tagline: 'Customizable switch modules',
    description: 'Flexible modular system for custom configurations',
    productCount: 6,
    highlights: [
      'Mix and match modules',
      'Easy customization',
      'Space efficient',
      'Professional look'
    ],
    status: 'inactive'
  },
];

export default function AdminRangesPage() {
  const [ranges, setRanges] = useState(mockRanges);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this range? All products in this range will need to be reassigned.')) {
      setRanges(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Product Ranges</h1>
            <p className="text-gray-600">Manage product categories and ranges</p>
          </div>
          <a
            href="/admin/ranges/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Range
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Ranges</p>
            <p className="text-3xl font-bold text-gray-800">{ranges.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Active Ranges</p>
            <p className="text-3xl font-bold text-green-600">
              {ranges.filter(r => r.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Products</p>
            <p className="text-3xl font-bold text-blue-600">
              {ranges.reduce((sum, r) => sum + r.productCount, 0)}
            </p>
          </div>
        </div>

        {/* Ranges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranges.map((range) => (
            <div key={range.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{range.name}</h3>
                <p className="text-blue-100">{range.tagline}</p>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-4">{range.description}</p>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Highlights:</p>
                  <ul className="space-y-1">
                    {range.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span className="text-sm font-semibold">{range.productCount} products</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    range.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {range.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <a
                    href={`/admin/ranges/${range.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(range.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {ranges.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-16 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">No product ranges yet</p>
            <a
              href="/admin/ranges/new"
              className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create your first range
            </a>
          </div>
        )}
      </main>
    </div>
  );
}