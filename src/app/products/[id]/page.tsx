'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ImageGallery from '@/components/ImageGallery';
import ColorVariantSelector from '@/components/ColorVariantSelector';
import QuantitySelector from '@/components/QuantitySelector';
import ProductCard from '@/components/ProductCard';
import { Heart, ShoppingCart, Check } from 'lucide-react';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Karbonic 1 Gang Switch',
  code: 'KRB-1G-WH',
  price: 450,
  stock: 25,
  description: 'Premium quality 1 gang switch with polycarbonate body. Designed for residential and commercial applications with superior durability and elegant finish.',
  images: ['1', '2', '3'],
  variants: [
    { id: 'white', name: 'White', color: '#FFFFFF', inStock: true },
    { id: 'gold', name: 'Gold', color: '#FFD700', inStock: true },
    { id: 'grey', name: 'Grey', color: '#808080', inStock: true },
    { id: 'black', name: 'Black', color: '#000000', inStock: false },
    { id: 'silver', name: 'Silver', color: '#C0C0C0', inStock: true },
  ],
  specifications: [
    { label: 'Material', value: 'Polycarbonate' },
    { label: 'Current Rating', value: '10A' },
    { label: 'Voltage', value: '240V' },
    { label: 'Gang', value: '1 Gang' },
    { label: 'Poles', value: '1 Pole' },
    { label: 'Way', value: '1 Way' },
    { label: 'Certification', value: 'ISO 9001' },
    { label: 'Warranty', value: '2 Years' },
  ],
  highlights: [
    'Fire retardant polycarbonate material',
    'High gloss finish',
    'Easy installation with universal mounting',
    'Child safety shutter',
    'Long lasting durability',
    'Corrosion resistant',
  ]
};

// Mock related products
const relatedProducts = [
  { id: '2', name: 'Karbonic 2 Gang Switch', code: 'KRB-2G-WH', price: 680, image: '' },
  { id: '3', name: 'Karbonic 3 Gang Switch', code: 'KRB-3G-WH', price: 890, image: '' },
  { id: '4', name: 'Karbonic 1 Gang Switch Gold', code: 'KRB-1G-GD', price: 550, image: '' },
  { id: '10', name: 'Karbonic Socket White', code: 'KRB-SK-WH', price: 350, image: '' },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedVariant, setSelectedVariant] = useState('white');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < mockProduct.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span className="mx-2">/</span>
          <a href="/ranges/karbonic" className="hover:text-blue-600">Karbonic</a>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{mockProduct.name}</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Image Gallery */}
            <div>
              <ImageGallery images={mockProduct.images} productName={mockProduct.name} />
            </div>

            {/* Right - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{mockProduct.name}</h1>
                <p className="text-gray-600">Product Code: {mockProduct.code}</p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-blue-600">
                  PKR {mockProduct.price.toLocaleString()}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {mockProduct.stock > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-semibold">
                      In Stock ({mockProduct.stock} available)
                    </span>
                  </>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </div>

              {/* Color Variant Selector */}
              <ColorVariantSelector
                variants={mockProduct.variants}
                selectedVariant={selectedVariant}
                onSelect={setSelectedVariant}
              />

              {/* Quantity Selector */}
              <QuantitySelector
                quantity={quantity}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                max={mockProduct.stock}
              />

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={mockProduct.stock === 0}
                  className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:border-red-500 text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Highlights */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {mockProduct.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8">
              <button className="pb-4 border-b-2 border-blue-600 text-blue-600 font-semibold">
                Description
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray-600 hover:text-gray-800">
                Specifications
              </button>
            </nav>
          </div>

          {/* Description Tab */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{mockProduct.description}</p>
          </div>

          {/* Specifications Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {mockProduct.specifications.map((spec, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-700">{spec.label}</span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                code={product.code}
                image={product.image}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}