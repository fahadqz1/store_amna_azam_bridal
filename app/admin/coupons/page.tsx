'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { checkIsAdmin, getCoupons, createCoupon } from '@/lib/admin';

export default function AdminCouponsPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: '',
  });

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
      loadCoupons();
    });
  }, [isLoading, isAuthenticated, user, router]);

  const loadCoupons = async () => {
    try {
      const data = await getCoupons();
      setCoupons(data);
    } catch (error) {
      console.error('Error loading coupons:', error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCoupon({
        code: formData.code,
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
      });
      setFormData({ code: '', discount_type: 'percentage', discount_value: '' });
      setShowForm(false);
      loadCoupons();
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  if (isLoading || !isAuthorized || pageLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Coupons</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800"
          >
            {showForm ? 'Cancel' : '+ Add Coupon'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Coupon</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Coupon Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
              <select
                value={formData.discount_type}
                onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as 'percentage' | 'fixed' })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (PKR)</option>
              </select>
              <input
                type="number"
                placeholder="Discount Value"
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800"
              >
                Create Coupon
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Value</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{coupon.code}</td>
                    <td className="px-6 py-4 text-sm">{coupon.discount_type === 'percentage' ? '%' : 'PKR'}</td>
                    <td className="px-6 py-4 text-sm">{coupon.discount_value}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 text-xs font-semibold rounded ${coupon.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm"><button className="text-blue-600 hover:text-blue-700">Edit</button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-600">No coupons</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
