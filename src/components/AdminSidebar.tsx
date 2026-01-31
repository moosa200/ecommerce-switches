'use client';

import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Wrench,
  LogOut 
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Product Ranges', href: '/admin/ranges', icon: Layers },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Electrician Bookings', href: '/admin/bookings', icon: Wrench },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // TODO: Implement logout
    window.location.href = '/admin/login';
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen w-64 fixed left-0 top-0">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold">SWITCHCO</h2>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </a>
          );
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors mt-6"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </div>
  );
}