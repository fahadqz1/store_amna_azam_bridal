'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  // Mock cart items - will be replaced with database queries
  const cartItems = [
    {
      id: '1',
      name: 'Embroidered Luxury Shirt',
      price: 3500,
      quantity: 1,
      size: 'M',
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop',
    },
    {
      id: '2',
      name: 'Formal Evening Wear',
      price: 6800,
      quantity: 1,
      size: 'L',
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop',
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.17);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 pb-6 border-b border-gray-200"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Size: <span className="font-medium">{item.size}</span>
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center border border-gray-300 w-fit mb-4">
                        <button className="px-3 py-1 text-gray-900 hover:bg-gray-100">
                          −
                        </button>
                        <span className="px-4 py-1 border-l border-r border-gray-300">
                          {item.quantity}
                        </span>
                        <button className="px-3 py-1 text-gray-900 hover:bg-gray-100">
                          +
                        </button>
                      </div>

                      <p className="font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Remove */}
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                className="text-blue-600 hover:text-blue-700 mt-8 inline-block"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (17%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-gray-600 mb-6 text-center">
                    Free shipping on orders over PKR 5,000
                  </p>
                )}

                <button className="w-full px-6 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors mb-3">
                  Proceed to Checkout
                </button>

                <div className="text-center space-y-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <p className="mb-3">✓ Secure Checkout</p>
                    <p className="mb-3">✓ Free Returns</p>
                    <p>✓ Authentic Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add items to your cart to continue shopping
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
