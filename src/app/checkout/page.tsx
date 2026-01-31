'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import AddressForm from '@/components/AddressForm';
import CheckoutOrderSummary from '@/components/CheckoutOrderSummary';

// Mock cart items (would come from cart state/context)
const mockCartItems = [
  { id: '1', name: 'Karbonic 1 Gang Switch', code: 'KRB-1G-WH', quantity: 2, price: 450 },
  { id: '2', name: 'Karbonic 2 Gang Switch', code: 'KRB-2G-WH', quantity: 1, price: 680 },
  { id: '4', name: 'Karbonic 1 Gang Switch Gold', code: 'KRB-1G-GD', quantity: 3, price: 550 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to order confirmation
      router.push('/order-confirmation/ORD-' + Date.now());
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <AddressForm title="Shipping Address" />

              {/* Billing Address Toggle */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-gray-800">
                    Billing address same as shipping address
                  </span>
                </label>
              </div>

              {/* Billing Address Form (if different) */}
              {!sameAsBilling && (
                <AddressForm title="Billing Address" />
              )}

              {/* Additional Notes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Order Notes (Optional)
                </h2>
                <textarea
                  rows={4}
                  placeholder="Any special instructions for your order..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Payment Info Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Payment Information</h3>
                <p className="text-sm text-blue-800">
                  Your order will be processed and an invoice will be sent to your email. 
                  Payment can be made via bank transfer or cash on delivery.
                </p>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <CheckoutOrderSummary
                items={mockCartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}