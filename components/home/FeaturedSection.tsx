'use client';

import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

// Mock featured products - will be replaced with database queries
const featuredProducts = [
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
    is_featured: true,
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
    is_featured: true,
    is_bestseller: true,
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium pieces
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
