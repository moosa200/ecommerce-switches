'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';

// Mock product data
const mockProducts = [
  { id: '1', name: 'Karbonic 1 Gang Switch', code: 'KRB-1G-WH', price: 450, color: 'white', gang: '1', material: 'polycarbonate', current: '10a' },
  { id: '2', name: 'Karbonic 2 Gang Switch', code: 'KRB-2G-WH', price: 680, color: 'white', gang: '2', material: 'polycarbonate', current: '10a' },
  { id: '3', name: 'Karbonic 3 Gang Switch', code: 'KRB-3G-WH', price: 890, color: 'white', gang: '3', material: 'polycarbonate', current: '10a' },
  { id: '4', name: 'Karbonic 1 Gang Switch Gold', code: 'KRB-1G-GD', price: 550, color: 'gold', gang: '1', material: 'polycarbonate', current: '10a' },
  { id: '5', name: 'Karbonic 2 Gang Switch Gold', code: 'KRB-2G-GD', price: 780, color: 'gold', gang: '2', material: 'polycarbonate', current: '10a' },
  { id: '6', name: 'Karbonic 4 Gang Switch', code: 'KRB-4G-WH', price: 1100, color: 'white', gang: '4', material: 'polycarbonate', current: '10a' },
  { id: '7', name: 'Karbonic 1 Gang Switch Grey', code: 'KRB-1G-GY', price: 480, color: 'grey', gang: '1', material: 'polycarbonate', current: '16a' },
  { id: '8', name: 'Karbonic 2 Gang Switch Grey', code: 'KRB-2G-GY', price: 710, color: 'grey', gang: '2', material: 'polycarbonate', current: '16a' },
  { id: '9', name: 'Karbonic 3 Gang Switch Gold', code: 'KRB-3G-GD', price: 990, color: 'gold', gang: '3', material: 'polycarbonate', current: '16a' },
  { id: '10', name: 'Karbonic Socket White', code: 'KRB-SK-WH', price: 350, color: 'white', gang: '1', material: 'polycarbonate', current: '16a' },
  { id: '11', name: 'Karbonic Socket Gold', code: 'KRB-SK-GD', price: 420, color: 'gold', gang: '1', material: 'polycarbonate', current: '16a' },
  { id: '12', name: 'Karbonic 4 Gang Switch Gold', code: 'KRB-4G-GD', price: 1250, color: 'gold', gang: '4', material: 'polycarbonate', current: '16a' },
];

const rangeData = {
  name: 'KARBONIC',
  description: 'Fine Polycarbonate switches with superior durability and elegant design',
  highlights: [
    'High-quality polycarbonate material',
    'Fire retardant and shock resistant',
    'Available in multiple color finishes',
    'Easy installation and maintenance',
  ]
};

export default function RangeListingPage({ params }: { params: { slug: string } }) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const categoryFilters = prev[category] || [];
      const isSelected = categoryFilters.includes(value);
      
      return {
        ...prev,
        [category]: isSelected
          ? categoryFilters.filter(v => v !== value)
          : [...categoryFilters, value]
      };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  // Filter products based on selected filters
  const filteredProducts = mockProducts.filter(product => {
    return Object.entries(selectedFilters).every(([category, values]) => {
      if (values.length === 0) return true;
      
      const categoryMap: Record<string, keyof typeof product> = {
        'Color Finishes': 'color',
        'Current': 'current',
        'Gang': 'gang',
        'Material': 'material',
      };
      
      const productKey = categoryMap[category];
      if (!productKey) return true;
      
      return values.includes(product[productKey] as string);
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">{rangeData.name}</h1>
          <p className="text-xl mb-6">{rangeData.description}</p>
          
          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {rangeData.highlights.map((highlight, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <FilterSidebar
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {mockProducts.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    code={product.code}
                    image=""
                    price={product.price}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your filters</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}