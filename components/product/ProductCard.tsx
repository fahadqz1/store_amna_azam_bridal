'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';

interface ProductCardProps {
  id?: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  discount_price?: number | null;
  is_featured?: boolean;
  is_bestseller?: boolean;
}

export default function ProductCard({
  name,
  slug,
  image,
  price,
  discount_price,
  is_featured,
  is_bestseller,
}: ProductCardProps) {
  const discountPercentage = discount_price
    ? calculateDiscountPercentage(price, discount_price)
    : null;

  return (
    <Link href={`/product/${slug}`}>
      <div className="group cursor-pointer">
        {/* 💎 Luxury Image Container */}
        <div className="relative overflow-hidden aspect-[3/4] mb-6">
          {/* Decorative border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d4af37] transition-colors duration-500 z-20 pointer-events-none"></div>

          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f7] to-[#f9f1ed]"></div>

          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Luxury Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* 💎 Premium Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {is_bestseller && (
              <span className="bg-gradient-to-r from-[#d4af37] to-[#e38f85] text-white text-xs font-serif font-bold px-4 py-1.5 uppercase tracking-widest shadow-lg">
                ⭐ Bestseller
              </span>
            )}
            {is_featured && (
              <span className="bg-gradient-to-r from-[#643a5f] to-[#084038] text-white text-xs font-serif font-bold px-4 py-1.5 uppercase tracking-widest shadow-lg">
                ✨ Featured
              </span>
            )}
            {discountPercentage && (
              <span className="bg-gradient-to-r from-[#e38f85] to-[#d4af37] text-white text-xs font-serif font-bold px-4 py-1.5 uppercase tracking-widest shadow-lg">
                -{discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* 💎 Luxury Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            aria-label="Add to wishlist"
            className="absolute top-6 right-6 p-3 bg-gradient-to-r from-[#d4af37] to-[#e38f85] text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:scale-110 shadow-lg hover:shadow-xl z-20"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* 💎 Luxury Product Info */}
        <div className="group-hover:translate-y-1 transition-transform duration-500">
          <h3 className="text-base md:text-lg font-serif font-semibold text-[#1a1a1a] group-hover:text-[#643a5f] transition-colors line-clamp-2 mb-3">
            {name}
          </h3>

          {/* 💎 Luxury Pricing */}
          <div className="flex items-center gap-3 mb-4">
            {discount_price ? (
              <>
                <span className="text-xl font-serif font-bold text-[#d4af37]">
                  {formatCurrency(discount_price)}
                </span>
                <span className="text-sm text-[#1a1a1a]/50 line-through font-medium">
                  {formatCurrency(price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-serif font-bold text-[#1a1a1a]">
                {formatCurrency(price)}
              </span>
            )}
          </div>

          {/* Add to Cart Indicator */}
          <div className="text-xs text-[#643a5f] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            → View Details
          </div>
        </div>
      </div>
    </Link>
  );
}
