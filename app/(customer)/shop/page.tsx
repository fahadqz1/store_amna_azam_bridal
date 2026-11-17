'use client';

import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';

// Mock products - will be replaced with database queries
const mockProducts = [
  {
    id: '1',
    name: 'Embroidered Silk Shirt',
    slug: 'embroidered-silk-shirt',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    price: 4500,
    discount_price: 3500,
    is_featured: true,
    is_bestseller: false,
  },
  {
    id: '2',
    name: 'Classic Formal Shirt',
    slug: 'classic-formal-shirt',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    price: 3500,
    discount_price: null,
    is_featured: false,
    is_bestseller: true,
  },
  {
    id: '3',
    name: 'Luxury Pret Suit',
    slug: 'luxury-pret-suit',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    price: 6500,
    discount_price: 5500,
    is_featured: true,
    is_bestseller: false,
  },
  {
    id: '4',
    name: 'Bridal Wedding Dress',
    slug: 'bridal-wedding-dress',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    price: 25000,
    discount_price: null,
    is_featured: false,
    is_bestseller: true,
  },
  {
    id: '5',
    name: 'Casual Pret Dress',
    slug: 'casual-pret-dress',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    price: 3000,
    discount_price: 2200,
    is_featured: false,
    is_bestseller: false,
  },
  {
    id: '6',
    name: 'Formal Evening Wear',
    slug: 'formal-evening-wear',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    price: 8500,
    discount_price: 6800,
    is_featured: true,
    is_bestseller: false,
  },
  {
    id: '7',
    name: 'Eastern Pret Collection',
    slug: 'eastern-pret-collection',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    price: 5500,
    discount_price: null,
    is_featured: false,
    is_bestseller: true,
  },
  {
    id: '8',
    name: 'Premium Bridal Outfit',
    slug: 'premium-bridal-outfit',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    price: 35000,
    discount_price: 28000,
    is_featured: true,
    is_bestseller: false,
  },
];

export default function ShopPage() {
  const [_selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [_selectedSize, setSelectedSize] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'eastern', name: 'Eastern Wear' },
    { id: 'bridal', name: 'Bridal' },
    { id: 'pret', name: 'Luxury Pret' },
    { id: 'formal', name: 'Formal Wear' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop</h1>
          <p className="text-gray-600">
            Browse our complete collection of premium fashion
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded"
                        onChange={(e) =>
                          setSelectedCategory(e.target.checked ? cat.id : null)
                        }
                      />
                      <span className="ml-3 text-gray-700 text-sm">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Size</h3>
                <div className="space-y-3">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded"
                        onChange={(e) =>
                          setSelectedSize(e.target.checked ? size : null)
                        }
                      />
                      <span className="ml-3 text-gray-700 text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Min: PKR {priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = Math.max(0, Number(e.target.value))!;
                        setPriceRange([newMin, priceRange[1]]);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max: PKR {priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = Math.min(50000, Number(e.target.value))!;
                        setPriceRange([priceRange[0], newMax]);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition-colors">
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{mockProducts.length}</span> products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bestseller">Bestsellers</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
