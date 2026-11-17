'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { formatCurrency } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    street_address: '',
    city: '',
    province: '',
    postal_code: '',
    payment_method: 'cod' as 'cod' | 'online',
    coupon_code: '',
  });
  const [coupon, setCoupon] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock cart data
  const cartItems = [
    { name: 'Embroidered Luxury Shirt', price: 3500, quantity: 1, size: 'M' },
    { name: 'Formal Evening Wear', price: 5000, quantity: 1, size: 'L' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const discount = coupon ? (coupon.discount_type === 'percentage' ? subtotal * (coupon.discount_value / 100) : coupon.discount_value) : 0;
  const tax = Math.round((subtotal - discount) * 0.17);
  const total = subtotal + shipping + tax - discount;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In to Checkout</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to proceed with checkout.</p>
          <div className="space-x-4">
            <Link
              href="/auth/login"
              className="inline-block px-6 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="inline-block px-6 py-2 border border-gray-900 text-gray-900 font-semibold rounded hover:bg-gray-50"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.street_address || !formData.city || !formData.province) {
      setError('Please fill in all address fields');
      return;
    }
    setError(null);
    setStep('payment');
  };

  const handlePaymentSubmit = () => {
    setError(null);
    setStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Simulate order creation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/order-confirmation?order=ORD-20250120-001234');
    } catch (err) {
      setError('Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!formData.coupon_code) return;
    // Mock coupon validation
    if (formData.coupon_code.toUpperCase() === 'SAVE10') {
      setCoupon({ discount_type: 'percentage', discount_value: 10, code: 'SAVE10' });
      setError(null);
    } else {
      setError('Invalid coupon code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-white mb-2 ${step === 'address' || step === 'payment' || step === 'review' ? 'bg-gray-900' : 'bg-gray-300'}`}>
                1
              </div>
              <p className="font-semibold text-gray-900">Address</p>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4" />
            <div className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-white mb-2 ${step === 'payment' || step === 'review' ? 'bg-gray-900' : 'bg-gray-300'}`}>
                2
              </div>
              <p className="font-semibold text-gray-900">Payment</p>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4" />
            <div className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-white mb-2 ${step === 'review' ? 'bg-gray-900' : 'bg-gray-300'}`}>
                3
              </div>
              <p className="font-semibold text-gray-900">Review</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'address' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Address</h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.street_address}
                    onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Province"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors mt-6"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                <form onSubmit={(e) => { e.preventDefault(); handlePaymentSubmit(); }} className="space-y-4">
                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-900 transition-colors">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.payment_method === 'cod'}
                        onChange={() => setFormData({ ...formData, payment_method: 'cod' as 'cod' })}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="font-semibold text-gray-900">Cash on Delivery</span>
                      <p className="text-sm text-gray-600 ml-auto">Pay when order arrives</p>
                    </label>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-900 transition-colors opacity-50">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        disabled
                        className="w-4 h-4 mr-3"
                      />
                      <span className="font-semibold text-gray-900">Online Payment</span>
                      <p className="text-sm text-gray-600 ml-auto">Coming soon</p>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors mt-6"
                  >
                    Review Order
                  </button>
                </form>
              </div>
            )}

            {step === 'review' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Review</h2>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Delivery Address</h3>
                    <p className="text-gray-700">{formData.full_name}</p>
                    <p className="text-gray-600">{formData.street_address}</p>
                    <p className="text-gray-600">{formData.city}, {formData.province} {formData.postal_code}</p>
                    <p className="text-gray-600">{formData.phone}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
                    <p className="text-gray-700">Cash on Delivery</p>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="text-sm">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-gray-600">Qty: {item.quantity} | Size: {item.size}</p>
                    <p className="text-gray-900 font-medium">{formatCurrency(item.price)}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              {step !== 'address' && (
                <div className="mb-6">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={formData.coupon_code}
                      onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      Apply
                    </button>
                  </div>
                  {coupon && <p className="text-sm text-green-600">✓ Coupon applied</p>}
                </div>
              )}

              {/* Pricing */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (17%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-600 mt-4 text-center">
                  Free shipping on orders over PKR 5,000
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
