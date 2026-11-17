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
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {is_bestseller && (
              <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1">
                BESTSELLER
              </span>
            )}
            {is_featured && (
              <span className="bg-gray-700 text-white text-xs font-semibold px-3 py-1">
                FEATURED
              </span>
            )}
            {discountPercentage && (
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to wishlist functionality
            }}
            aria-label="Add to wishlist"
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-gray-900 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
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

        {/* Product Info */}
        <div>
          <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 mb-2">
            {name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            {discount_price ? (
              <>
                <span className="text-base md:text-lg font-semibold text-gray-900">
                  {formatCurrency(discount_price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(price)}
                </span>
              </>
            ) : (
              <span className="text-base md:text-lg font-semibold text-gray-900">
                {formatCurrency(price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
