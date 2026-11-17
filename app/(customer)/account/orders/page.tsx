'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function OrdersPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  // Mock orders
  const orders = [
    {
      id: '1',
      order_number: 'ORD-20250115-001234',
      total_amount: 8500,
      status: 'delivered',
      created_at: '2025-01-15',
      items_count: 2,
      items: [
        { name: 'Embroidered Luxury Shirt', quantity: 1, price: 3500 },
        { name: 'Formal Evening Wear', quantity: 1, price: 5000 },
      ],
    },
    {
      id: '2',
      order_number: 'ORD-20250110-001200',
      total_amount: 15000,
      status: 'dispatched',
      created_at: '2025-01-10',
      items_count: 1,
      items: [{ name: 'Bridal Wedding Dress', quantity: 1, price: 15000 }],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'dispatched':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-orange-600 bg-orange-50';
      case 'pending':
        return 'text-gray-600 bg-gray-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Order History
            </h1>
            <p className="text-gray-600">View and track your orders</p>
          </div>
          <Link
            href="/account/dashboard"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <nav className="space-y-2">
                <Link
                  href="/account/dashboard"
                  className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/account/profile"
                  className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/account/orders"
                  className="block px-4 py-2 rounded bg-gray-100 text-gray-900 font-medium"
                >
                  Orders
                </Link>
                <Link
                  href="/account/addresses"
                  className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Addresses
                </Link>
                <Link
                  href="/account/security"
                  className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Security
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {order.order_number}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(order.total_amount)}
                        </p>
                        <p
                          className={`text-sm font-semibold px-3 py-1 rounded mt-2 inline-block ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <p className="text-sm font-semibold text-gray-900 mb-3">
                        Items ({order.items_count})
                      </p>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm text-gray-600"
                          >
                            <div>
                              <p className="text-gray-900 font-medium">
                                {item.name}
                              </p>
                              <p>Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      {order.status === 'dispatched' && (
                        <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                          Track Shipment
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start shopping to place your first order
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
