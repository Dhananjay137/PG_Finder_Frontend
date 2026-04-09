import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api  from '../../api/axiosInstance'

export const OwnerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/dashboard-owner');
        setStats(response.data.data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">Owner Dashboard</h1>

      {/* 1. Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Properties" value={stats.totalProperties} color="blue" />
        <StatCard title="Pending" value={getStatusCount(stats.propertyStatusBreakdown, 'pending')} color="yellow" />
        <StatCard title="Approved" value={getStatusCount(stats.propertyStatusBreakdown, 'approved')} color="green" />
        <StatCard title="Bookings" value={stats.bookingStatusBreakdown.length} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Property Breakdown List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Property Types</h2>
          <div className="space-y-4">
            {stats.propertyTypeBreakdown.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <span className="capitalize text-gray-600">{item._id}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Booking Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Booking Summary</h2>
          <div className="space-y-4">
            {stats.bookingStatusBreakdown.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2">
                <span className="capitalize">{item._id}</span>
                <span className={`font-semibold ${item._id === 'confirmed' ? 'text-green-600' : 'text-gray-500'}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components & Functions ---

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "border-blue-500 text-blue-600",
    green: "border-green-500 text-green-600",
    yellow: "border-yellow-500 text-yellow-600",
    purple: "border-purple-500 text-purple-600",
  };
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${colors[color]}`}>
      <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

const getStatusCount = (array, status) => {
  const found = array.find(item => item._id === status);
  return found ? found.count : 0;
};
