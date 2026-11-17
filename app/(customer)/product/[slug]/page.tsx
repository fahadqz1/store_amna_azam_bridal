'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage(_props: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock product data - will be fetched from database
  const product = {
    id: '1',
    name: 'Embroidered Luxury Shirt',
    price: 4500,
    discount_price: 3500,
    rating: 4.8,
    reviews: 128,
    category: 'Eastern Wear',
    collection: 'Premium Collection',
    description:
      'An exquisite piece featuring intricate hand-embroidery on premium silk. Perfect for weddings, formal events, and special occasions.',
    fabric: '100% Pure Silk',
    color: 'Cream',
    care:
      'Dry clean recommended. Avoid direct sunlight. Store in cool, dry place.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop',
    ],
    measurements: {
      XS: { length: '32"', width: '18"', chest: '34"', shoulder: '15"' },
      S: { length: '33"', width: '19"', chest: '36"', shoulder: '15.5"' },
      M: { length: '34"', width: '20"', chest: '38"', shoulder: '16"' },
      L: { length: '35"', width: '21"', chest: '40"', shoulder: '16.5"' },
      XL: { length: '36"', width: '22"', chest: '42"', shoulder: '17"' },
    } as const,
    sizes: ['XS', 'S', 'M', 'L', 'XL'] as const,
    stockBySize: {
      XS: 5,
      S: 12,
      M: 8,
      L: 15,
      XL: 6,
    } as const,
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'Classic Formal Shirt',
      price: 3500,
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    },
    {
      id: '3',
      name: 'Luxury Pret Suit',
      price: 6500,
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    },
    {
      id: '4',
      name: 'Bridal Wedding Dress',
      price: 25000,
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    },
  ];

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Added ${quantity} of size ${selectedSize} to cart`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 aspect-square mb-4 overflow-hidden">
              {product.images && product.images.length > 0 && (
                <Image
                  src={product.images[Math.min(selectedImageIndex, product.images.length - 1)] as string}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? 'border-gray-900'
                      : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Title & Category */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                {product.category} • {product.collection}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t border-gray-200 pt-6 pb-6 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.discount_price || product.price)}
                </span>
                {product.discount_price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
                {product.discount_price && (
                  <span className="ml-2 text-red-600 font-semibold">
                    Save{' '}
                    {Math.round(
                      ((product.price - product.discount_price) / product.price) *
                        100
                    )}
                    %
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Select Size</h3>
              <div className="grid grid-cols-5 gap-3 mb-6">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 font-semibold border-2 transition-all ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 text-gray-900 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Size Info */}
              <div className="bg-gray-50 p-4 rounded mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Measurements for size {selectedSize}:
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    Length:{' '}
                    <span className="font-semibold">
                      {product.measurements[selectedSize as 'XS' | 'S' | 'M' | 'L' | 'XL'].length}
                    </span>
                  </div>
                  <div>
                    Chest:{' '}
                    <span className="font-semibold">
                      {product.measurements[selectedSize as 'XS' | 'S' | 'M' | 'L' | 'XL'].chest}
                    </span>
                  </div>
                  <div>
                    Width:{' '}
                    <span className="font-semibold">
                      {product.measurements[selectedSize as 'XS' | 'S' | 'M' | 'L' | 'XL'].width}
                    </span>
                  </div>
                  <div>
                    Shoulder:{' '}
                    <span className="font-semibold">
                      {product.measurements[selectedSize as 'XS' | 'S' | 'M' | 'L' | 'XL'].shoulder}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Stock: <span className="font-semibold">{product.stockBySize[selectedSize as 'XS' | 'S' | 'M' | 'L' | 'XL']}</span> available
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-900 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-3 border-l border-r border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-900 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
            </div>

            <button className="w-full px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-50 transition-colors mb-8">
              Buy Now
            </button>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">Fabric</p>
                <p className="text-gray-600">{product.fabric}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Color</p>
                <p className="text-gray-600">{product.color}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Care Instructions</p>
                <p className="text-gray-600">{product.care}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <a
                key={p.id}
                href={`/product/${p.id}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4 group-hover:opacity-80 transition-opacity">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-gray-700 mb-2">
                  {p.name}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(p.price)}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
