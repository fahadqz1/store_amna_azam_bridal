'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { checkIsAdmin, getAllOrders } from '@/lib/admin';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminOrdersPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

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
      loadOrders();
    });
  }, [isLoading, isAuthenticated, user, router]);

  const loadOrders = async () => {
    try {
      const { orders: data } = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setPageLoading(false);
    }
  };

  if (isLoading || !isAuthorized || pageLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Order #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{order.order_number}</td>
                    <td className="px-6 py-4 text-sm">{formatDate(order.created_at)}</td>
                    <td className="px-6 py-4 text-sm font-medium">{formatCurrency(order.total_amount)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm"><button className="text-blue-600 hover:text-blue-700">View</button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-600">No orders</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
