'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Mock tracking data
      const mockData = {
        tracking_number: trackingNumber,
        status: 'in_transit',
        carrier: 'PostEx',
        estimated_delivery_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        shipment_tracking_logs: [
          {
            status: 'delivered',
            location: 'Karachi Hub',
            notes: 'Package delivered to customer',
            created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          },
          {
            status: 'in_transit',
            location: 'Lahore Hub',
            notes: 'Package in transit to destination',
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
          {
            status: 'in_transit',
            location: 'Islamabad Distribution Center',
            notes: 'Package picked up and in transit',
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      };

      setTrackingData(mockData);
    } catch (err) {
      setError('Failed to track shipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600';
      case 'in_transit':
        return 'text-blue-600';
      case 'pending':
        return 'text-orange-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✓';
      case 'in_transit':
        return '→';
      case 'pending':
        return '⏱';
      case 'failed':
        return '✗';
      default:
        return '•';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tracking Number
              </label>
              <input
                type="text"
                placeholder="e.g., PKX-1234567890"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Tracking...' : 'Track Package'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Tracking Number: {trackingData.tracking_number}
              </h2>
              <div className="flex items-center gap-4">
                <span className={`font-semibold ${getStatusColor(trackingData.status)}`}>
                  Status: {trackingData.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-gray-600">
                  Carrier: {trackingData.carrier}
                </span>
              </div>
              <p className="text-gray-600 mt-2">
                Estimated Delivery: {new Date(trackingData.estimated_delivery_date).toLocaleDateString()}
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 text-lg">Tracking History</h3>
              {trackingData.shipment_tracking_logs?.length > 0 ? (
                <div className="relative">
                  {trackingData.shipment_tracking_logs.map((log: any, idx: number) => (
                    <div key={idx} className="flex gap-4 pb-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          log.status === 'delivered' ? 'bg-green-600' : 'bg-blue-600'
                        }`}>
                          {getStatusIcon(log.status)}
                        </div>
                        {idx < trackingData.shipment_tracking_logs.length - 1 && (
                          <div className="w-1 bg-gray-300 flex-1 my-2" style={{ height: '60px' }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{log.location}</p>
                        <p className="text-gray-600 text-sm">{log.notes}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No tracking updates available yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
