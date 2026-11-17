'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';

interface CollectionPageProps {
  params: {
    category: string;
  };
}

// Mock data - Replace with database calls later
const COLLECTION_DATA: Record<string, any> = {
  'eastern-wear': {
    title: 'Eastern Wear',
    subtitle: 'Traditional Elegance Meets Modern Style',
    description: 'Discover our exquisite collection of Pakistani Eastern wear featuring traditional embroidery, intricate designs, and premium fabrics.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    products: [
      { id: '1', name: 'Embroidered Luxury Shirt', slug: 'embroidered-shirt', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop', price: 3500, discount_price: 2800, is_featured: true },
      { id: '2', name: 'Royal Kameez Suit', slug: 'royal-kameez', image: 'https://images.unsplash.com/photo-1515193377552-7bcd41b2afb8?w=400&h=500&fit=crop', price: 4200, discount_price: 3400, is_bestseller: true },
      { id: '3', name: 'Gold Embroidered Dupatta', slug: 'gold-dupatta', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop', price: 1800, discount_price: 1400 },
      { id: '4', name: 'Silk Eastern Ensemble', slug: 'silk-ensemble', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop', price: 5200, is_featured: true },
    ],
  },
  'bridal': {
    title: 'Bridal Collection',
    subtitle: 'Your Dream Wedding Dress Awaits',
    description: 'Handcrafted bridal couture featuring exquisite embroidery, premium fabrics, and timeless designs for your special day.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    products: [
      { id: '5', name: 'Royal Bridal Lehenga', slug: 'royal-bridal-lehenga', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop', price: 15000, discount_price: 12000, is_featured: true, is_bestseller: true },
      { id: '6', name: 'Luxury Wedding Sharara', slug: 'wedding-sharara', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop', price: 12800, discount_price: 10200 },
      { id: '7', name: 'Bridal Gharara Set', slug: 'bridal-gharara', image: 'https://images.unsplash.com/photo-1515193377552-7bcd41b2afb8?w=400&h=500&fit=crop', price: 14500, is_featured: true },
      { id: '8', name: 'Premium Wedding Saree', slug: 'wedding-saree', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop', price: 11200, discount_price: 8900, is_bestseller: true },
    ],
  },
  'pret': {
    title: 'Luxury Pret',
    subtitle: 'Effortless Sophistication, Ready to Wear',
    description: 'Premium ready-to-wear collection combining traditional aesthetics with contemporary fashion for the modern Pakistani woman.',
    image: 'https://images.unsplash.com/photo-1515193377552-7bcd41b2afb8?w=800&h=600&fit=crop',
    products: [
      { id: '9', name: 'Casual Elegance Kurti', slug: 'casual-kurti', image: 'https://images.unsplash.com/photo-1515193377552-7bcd41b2afb8?w=400&h=500&fit=crop', price: 2200, discount_price: 1799, is_featured: true },
      { id: '10', name: 'Formal Evening Wear', slug: 'formal-evening', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop', price: 5000, is_bestseller: true },
      { id: '11', name: 'Printed Pret Suit', slug: 'printed-suit', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop', price: 3800, discount_price: 3000 },
      { id: '12', name: 'Designer Casual Kameez', slug: 'casual-kameez', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop', price: 2800, discount_price: 2200, is_featured: true },
    ],
  },
};

export default function CollectionPage({ params }: CollectionPageProps) {
  const categorySlug = params.category.toLowerCase();
  const collection = COLLECTION_DATA[categorySlug];
  const [sortBy, setSortBy] = useState('featured');

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#faf9f7] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-4">Collection Not Found</h1>
          <p className="text-gray-600">This collection doesn't exist yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf9f7] to-white">
      {/* Collection Header */}
      <div className="relative h-96 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#643a5f]/80 to-[#084038]/80 z-10"></div>
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 z-20">
          <span className="text-sm uppercase tracking-widest text-[#d4af37] font-semibold mb-4">✨ {collection.subtitle}</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{collection.title}</h1>
          <p className="text-white/90 text-lg max-w-2xl">{collection.description}</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Sorting */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 pb-6 border-b border-[#e5d9e0]">
          <h2 className="text-2xl font-serif font-semibold text-[#1a1a1a] mb-4 md:mb-0">
            {collection.products.length} Products
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-[#e5d9e0] rounded bg-white text-[#1a1a1a] font-medium"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collection.products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              image={product.image}
              price={product.price}
              discount_price={product.discount_price}
              is_featured={product.is_featured}
              is_bestseller={product.is_bestseller}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
