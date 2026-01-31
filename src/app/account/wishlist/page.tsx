'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AccountSidebar from '@/components/AccountSidebar';
import { Heart, ShoppingCart, X } from 'lucide-react';

const mockWishlistItems = [
  { id: '1', name: 'Karbonic 1 Gang Switch', code: 'KRB-1G-WH', price: 450, image: '', inStock: true },
  { id: '2', name: 'Karbonic 2 Gang Switch', code: 'KRB-2G-WH', price: 680, image: '', inStock: true },
  { id: '3', name: 'Crystal 1 Gang Switch', code: 'CRY-1G-WH', price: 850, image: '', inStock: false },
  { id: '4', name: 'Karbonic Socket White', code: 'KRB-SK-WH', price: 350, image: '', inStock: true },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const handleRemove = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    // TODO: Add to cart
    alert('Added to cart!');
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
                <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
                <p className="text-gray-600">{wishlistItems.length} items</p>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Your wishlist is empty</p>
                  <p className="text-gray-400 mb-6">Save items you love for later</p>
                  <a
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                  >
                    Start Shopping
                  </a>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow relative"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white z-10"
                      >
                        <X className="w-4 h-4 text-gray-700" />
                      </button>

                      {/* Product Image */}
                      <a href={`/products/${item.id}`}>
                        <div className="aspect-square bg-gray-100 flex items-center justify-center">
                          <div className="text-5xl text-gray-400">🔌</div>
                        </div>
                      </a>

                      {/* Product Details */}
                      <div className="p-4">
                        <a href={`/products/${item.id}`}>
                          <h3 className="font-semibold text-gray-800 mb-1 hover:text-blue-600">
                            {item.name}
                          </h3>
                        </a>
                        <p className="text-sm text-gray-500 mb-2">Code: {item.code}</p>
                        <p className="text-lg font-bold text-blue-600 mb-3">
                          PKR {item.price.toLocaleString()}
                        </p>

                        {/* Stock Status */}
                        {!item.inStock && (
                          <p className="text-sm text-red-600 font-semibold mb-3">Out of Stock</p>
                        )}

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(item.id)}
                          disabled={!item.inStock}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
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