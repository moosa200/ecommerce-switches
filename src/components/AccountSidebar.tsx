'use client';

import { usePathname } from 'next/navigation';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';

const menuItems = [
  { label: 'My Profile', href: '/account', icon: User },
  { label: 'My Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { label: 'Saved Addresses', href: '/account/addresses', icon: MapPin },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // TODO: Implement logout
    window.location.href = '/';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-800 text-lg">My Account</h3>
        <p className="text-sm text-gray-600">John Doe</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </a>
          );
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </div>
  );
}