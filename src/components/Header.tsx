'use client';

import { useState } from 'react';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import ElectricianBookingModal from './ElectricianBookingModal';

export default function Header() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <>
      <ElectricianBookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
      
      <header className="bg-white shadow-sm">
        {/* Top Bar */}
        <div className="bg-gray-800 text-white py-2">
          <div className="container mx-auto px-4 flex justify-end gap-6 text-sm">
            <a href="#" className="hover:text-gray-300">Help</a>
            <a href="#" className="hover:text-gray-300">WhatsApp</a>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-800">
              SWITCHCO
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for switches, sockets..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Account</span>
              </button>
              
              <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                <Heart className="w-6 h-6" />
                <span className="text-xs mt-1">Wishlist</span>
              </button>
              
              <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
                <span className="text-xs mt-1">Cart</span>
              </button>
            </div>

            {/* Book Electrician Button */}
            <button 
              onClick={() => setShowBookingModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold whitespace-nowrap"
            >
              Book Electrician
            </button>
          </div>
        </div>
      </header>
    </>
  );
}