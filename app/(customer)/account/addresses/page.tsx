'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AddressesPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);

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

  // Mock addresses
  const addresses = [
    {
      id: '1',
      full_name: 'John Doe',
      street_address: '123 Main Street',
      city: 'Karachi',
      province: 'Sindh',
      postal_code: '75500',
      phone: '+92 300 1234567',
      is_default: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Addresses
            </h1>
            <p className="text-gray-600">Manage your delivery addresses</p>
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
                  className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Orders
                </Link>
                <Link
                  href="/account/addresses"
                  className="block px-4 py-2 rounded bg-gray-100 text-gray-900 font-medium"
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
            {/* Add Address Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors"
              >
                {showForm ? 'Cancel' : '+ Add New Address'}
              </button>
            </div>

            {/* Add Address Form */}
            {showForm && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Add New Address
                </h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Province"
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="default" className="w-4 h-4" />
                    <label htmlFor="default" className="ml-3 text-gray-700">
                      Set as default address
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors"
                  >
                    Save Address
                  </button>
                </form>
              </div>
            )}

            {/* Addresses List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Saved Addresses
              </h2>
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {address.full_name}
                        </h3>
                        {address.is_default && (
                          <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded">
                            Default Address
                          </span>
                        )}
                      </div>
                      <div className="space-x-2">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                          Edit
                        </button>
                        <button className="px-4 py-2 border border-red-300 text-red-700 rounded hover:bg-red-50 text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{address.street_address}</p>
                    <p className="text-gray-600 mb-2">
                      {address.city}, {address.province} {address.postal_code}
                    </p>
                    <p className="text-gray-600">{address.phone}</p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600 mb-4">No addresses saved yet</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Add your first address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
