'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  id,
  name,
  code,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove
}: CartItemProps) {
  const lineTotal = price * quantity;

  return (
    <div className="flex gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-3xl text-gray-400">🔌</div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-500">Code: {code}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-gray-800">
            PKR {price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="w-12 h-8 flex items-center justify-center border border-gray-300 rounded bg-gray-50 font-semibold text-gray-800">
            {quantity}
          </div>
          
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Line Total & Remove */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(id)}
          className="text-red-600 hover:text-red-700 p-2"
          title="Remove from cart"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        
        <div className="text-xl font-bold text-gray-800">
          PKR {lineTotal.toLocaleString()}
        </div>
      </div>
    </div>
  );
}