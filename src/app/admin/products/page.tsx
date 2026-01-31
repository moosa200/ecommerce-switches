'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

const mockProducts = [
  { id: '1', name: 'Karbonic 1 Gang Switch', code: 'KRB-1G-WH', price: 450, stock: 25, status: 'active', range: 'Karbonic' },
  { id: '2', name: 'Karbonic 2 Gang Switch', code: 'KRB-2G-WH', price: 680, stock: 18, status: 'active', range: 'Karbonic' },
  { id: '3', name: 'Crystal 1 Gang Switch', code: 'CRY-1G-WH', price: 850, stock: 0, status: 'inactive', range: 'Crystal' },
  { id: '4', name: 'Karbonic Socket White', code: 'KRB-SK-WH', price: 350, stock: 42, status: 'active', range: 'Karbonic' },
  { id: '5', name: 'Allure 1 Gang Switch', code: 'ALR-1G-WH', price: 720, stock: 15, status: 'active', range: 'Allure' },
  { id: '6', name: 'Karbonic 3 Gang Switch', code: 'KRB-3G-WH', price: 890, stock: 22, status: 'active', range: 'Karbonic' },
  { id: '7', name: 'Crystal 2 Gang Switch', code: 'CRY-2G-WH', price: 1150, stock: 8, status: 'active', range: 'Crystal' },
  { id: '8', name: 'Socket Allure White', code: 'ALR-SK-WH', price: 480, stock: 31, status: 'active', range: 'Allure' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <a
            href="/admin/products/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </a>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Code</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Range</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Stock</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">🔌</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{product.code}</td>
                    <td className="py-4 px-6 text-gray-600">{product.range}</td>
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      PKR {product.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-semibold ${
                        product.stock === 0 ? 'text-red-600' : 
                        product.stock < 10 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <a
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}