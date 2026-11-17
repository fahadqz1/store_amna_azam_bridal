'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { checkIsAdmin, getCustomers } from '@/lib/admin';
import { formatDate } from '@/lib/utils';

export default function AdminCustomersPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
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
      loadCustomers();
    });
  }, [isLoading, isAuthenticated, user, router]);

  const loadCustomers = async () => {
    try {
      const { customers: data } = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Customers</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{customer.full_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">{customer.email}</td>
                    <td className="px-6 py-4 text-sm">{customer.phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">{formatDate(customer.created_at)}</td>
                    <td className="px-6 py-4 text-sm"><button className="text-blue-600 hover:text-blue-700">View</button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-600">No customers</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
