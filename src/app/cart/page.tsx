'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import { ShoppingCart } from 'lucide-react';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Karbonic 1 Gang Switch',
    code: 'KRB-1G-WH',
    price: 450,
    quantity: 2,
    image: ''
  },
  {
    id: '2',
    name: 'Karbonic 2 Gang Switch',
    code: 'KRB-2G-WH',
    price: 680,
    quantity: 1,
    image: ''
  },
  {
    id: '4',
    name: 'Karbonic 1 Gang Switch Gold',
    code: 'KRB-1G-GD',
    price: 550,
    quantity: 3,
    image: ''
  },
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // TODO: Check if user is logged in
    // If not, redirect to login
    // If yes, redirect to checkout
    router.push('/checkout');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 200; // Free shipping over 5000
  const total = subtotal + shipping;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <ShoppingCart className="w-24 h-24 mx-auto text-gray-300" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              Start Shopping
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                code={item.code}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
    </div>
  );
}