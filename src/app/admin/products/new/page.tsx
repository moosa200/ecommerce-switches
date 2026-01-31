'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { Upload, X } from 'lucide-react';

export default function AdminProductFormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    range: '',
    price: '',
    stock: '',
    description: '',
    specifications: '',
    status: 'active',
    colorVariants: ['white']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Submit to API
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/admin/products');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-600">Create a new product in your catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Karbonic 1 Gang Switch"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g., KRB-1G-WH"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Range *
                    </label>
                    <select
                      required
                      value={formData.range}
                      onChange={(e) => setFormData({ ...formData, range: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Range</option>
                      <option value="karbonic">Karbonic</option>
                      <option value="crystal">Crystal</option>
                      <option value="allure">Allure</option>
                      <option value="socket">Socket</option>
                      <option value="modular">Modular</option>
                      <option value="classic">Classic</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="450"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="25"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Product Images</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Description & Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Description
                  </label>
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed description of the product..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technical Specifications
                  </label>
                  <textarea
                    rows={6}
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    placeholder="Material, voltage, current rating, etc. (one per line)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Color Variants */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Color Variants</h2>
              <div className="flex gap-4 flex-wrap">
                {['white', 'gold', 'grey', 'black', 'silver'].map(color => (
                  <label key={color} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.colorVariants.includes(color)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, colorVariants: [...formData.colorVariants, color] });
                        } else {
                          setFormData({ ...formData, colorVariants: formData.colorVariants.filter(c => c !== color) });
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="capitalize">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 pt-6 flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
              <a
                href="/admin/products"
                className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Cancel
              </a>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}