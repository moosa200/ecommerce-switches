interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ subtotal, shipping, total, onCheckout }: CartSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-semibold">PKR {subtotal.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span className="font-semibold">
            {shipping === 0 ? 'FREE' : `PKR ${shipping.toLocaleString()}`}
          </span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
      >
        Proceed to Checkout
      </button>
      
      <a
        href="/"
        className="block text-center text-blue-600 hover:text-blue-700 mt-4 font-semibold"
      >
        Continue Shopping
      </a>
    </div>
  );
}