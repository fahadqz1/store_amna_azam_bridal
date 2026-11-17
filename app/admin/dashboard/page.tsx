'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { checkIsAdmin } from '@/lib/admin';
import { getDashboardMetrics } from '@/lib/admin';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalCustomers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.push('/admin/login');
      return;
    }

    checkIsAdmin(user.id).then((isAdmin) => {
      if (!isAdmin) {
        router.push('/admin/login');
        return;
      }

      setIsAuthorized(true);
      loadMetrics();
    });
  }, [isLoading, isAuthenticated, user, router]);

  const loadMetrics = async () => {
    try {
      const data = await getDashboardMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">AMNA AZAM Management Portal</p>
          </div>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            Switch Account
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.totalOrders}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Sales */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Sales</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatCurrency(metrics.totalSales)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Customers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.totalCustomers}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12v-2a9 9 0 00-12 0v2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.totalProducts}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8-4m0 0v10l-8 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Orders</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {metrics.pendingOrders}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed Orders</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {metrics.completedOrders}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/products"
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all text-center"
            >
              <div className="text-3xl mb-2">📦</div>
              <p className="font-semibold text-gray-900">Products</p>
              <p className="text-sm text-gray-600 mt-1">Manage catalog</p>
            </Link>
            <Link
              href="/admin/orders"
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all text-center"
            >
              <div className="text-3xl mb-2">📋</div>
              <p className="font-semibold text-gray-900">Orders</p>
              <p className="text-sm text-gray-600 mt-1">Manage orders</p>
            </Link>
            <Link
              href="/admin/customers"
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all text-center"
            >
              <div className="text-3xl mb-2">👥</div>
              <p className="font-semibold text-gray-900">Customers</p>
              <p className="text-sm text-gray-600 mt-1">View customers</p>
            </Link>
            <Link
              href="/admin/coupons"
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all text-center"
            >
              <div className="text-3xl mb-2">🎟️</div>
              <p className="font-semibold text-gray-900">Coupons</p>
              <p className="text-sm text-gray-600 mt-1">Manage discounts</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
