'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'ORD-20250120-001234';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 text-lg">Thank you for your purchase</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-gray-600 mb-2">Order Number</p>
            <p className="text-2xl font-bold text-gray-900 font-mono">{orderNumber}</p>
          </div>

          <div className="text-left space-y-4 mb-8 border-t border-gray-200 pt-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
              <ul className="text-gray-600 space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>You'll receive an order confirmation email shortly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>Track your order status in your account dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>We'll notify you when your order ships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span>Delivery typically takes 3-5 business days</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/account/orders"
              className="block w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors text-center"
            >
              View Order Details
            </Link>
            <Link
              href="/shop"
              className="block w-full px-6 py-3 border border-gray-900 text-gray-900 font-semibold rounded hover:bg-gray-50 transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Questions? Contact us at support@amnazaam.pk or call 021-XXXX-XXXX
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading...</p></div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
