interface OrderItem {
  id: string;
  name: string;
  code: string;
  quantity: number;
  price: number;
}

interface CheckoutOrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function CheckoutOrderSummary({ 
  items, 
  subtotal, 
  shipping, 
  total 
}: CheckoutOrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
      
      {/* Order Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex justify-between gap-4 pb-4 border-b border-gray-200 last:border-0">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
              <p className="text-xs text-gray-500">{item.code}</p>
              <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                PKR {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
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
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-700 font-semibold">
            🎉 You've qualified for FREE shipping!
          </p>
        </div>
      )}
    </div>
  );
}