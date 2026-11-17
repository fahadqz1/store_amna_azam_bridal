'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { logoutUser } from '@/lib/auth';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, isLoading, isAuthenticated } = useAuth();

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

  // Mock order data
  const orders = [
    {
      id: '1',
      order_number: 'ORD-20250115-001234',
      total_amount: 8500,
      status: 'delivered',
      created_at: '2025-01-15',
      items_count: 2,
    },
    {
      id: '2',
      order_number: 'ORD-20250110-001200',
      total_amount: 15000,
      status: 'dispatched',
      created_at: '2025-01-10',
      items_count: 1,
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Account
          </h1>
          <p className="text-gray-600">Manage your profile and orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* Profile Card */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
                  {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h2 className="font-semibold text-gray-900 text-lg">
                  {profile?.full_name || 'User'}
                </h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mb-6">
                <Link
                  href="/account/dashboard"
                  className="block px-4 py-2 rounded bg-gray-100 text-gray-900 font-medium"
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
                  className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition-colors"
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

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 border border-gray-300 text-gray-900 font-medium rounded hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-600 mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-600 mb-2">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(orders.reduce((sum, o) => sum + o.total_amount, 0))}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-600 mb-2">Member Since</p>
                <p className="text-3xl font-bold text-gray-900">2024</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                <Link
                  href="/account/orders"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  View All
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {order.order_number}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(order.total_amount)}
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              order.status === 'delivered'
                                ? 'text-green-600'
                                : order.status === 'dispatched'
                                ? 'text-blue-600'
                                : 'text-orange-600'
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {order.items_count} item{order.items_count !== 1 ? 's' : ''}
                      </p>
                      <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details →
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Link
                    href="/shop"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/account/profile"
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-gray-900 mb-1">Update Profile</p>
                  <p className="text-sm text-gray-600">Change your name and phone</p>
                </Link>
                <Link
                  href="/account/addresses"
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-gray-900 mb-1">Manage Addresses</p>
                  <p className="text-sm text-gray-600">Add or update your addresses</p>
                </Link>
                <Link
                  href="/account/security"
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-gray-900 mb-1">Change Password</p>
                  <p className="text-sm text-gray-600">Update your password</p>
                </Link>
                <Link
                  href="/shop"
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-gray-900 mb-1">Continue Shopping</p>
                  <p className="text-sm text-gray-600">Browse our collection</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
