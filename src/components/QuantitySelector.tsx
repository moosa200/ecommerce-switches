'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
}

export default function QuantitySelector({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  max = 99 
}: QuantitySelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Quantity</h3>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </button>
        
        <div className="w-16 h-10 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 font-semibold text-gray-800">
          {quantity}
        </div>
        
        <button
          onClick={onIncrease}
          disabled={quantity >= max}
          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
}