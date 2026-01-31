'use client';

interface ColorVariant {
  id: string;
  name: string;
  color: string;
  inStock: boolean;
}

interface ColorVariantSelectorProps {
  variants: ColorVariant[];
  selectedVariant: string;
  onSelect: (variantId: string) => void;
}

export default function ColorVariantSelector({ 
  variants, 
  selectedVariant, 
  onSelect 
}: ColorVariantSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Color</h3>
      <div className="flex gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => variant.inStock && onSelect(variant.id)}
            disabled={!variant.inStock}
            className={`relative group ${!variant.inStock ? 'cursor-not-allowed opacity-50' : ''}`}
            title={variant.name}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedVariant === variant.id
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{ backgroundColor: variant.color }}
            />
            
            {/* Not in stock indicator */}
            {!variant.inStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-red-500 rotate-45" />
              </div>
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {variant.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}