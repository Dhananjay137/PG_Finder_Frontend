import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import { STATUS_STYLES } from '../utils/statusStyles';

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/booking/booking');
      //console.log(res)
      if (res?.status === 200) {
        setBookings(res?.data?.data || []);
      }
    } catch (err) {
      //console.log(err?.message);
      toast.error(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className=" md:p-8 max-w-7xl">
      <h2 className="font-bold text-2xl text-gray-700 tracking-tight">My Bookings</h2>

      {/* 2. Empty State Check */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 mt-8">
          <div className="bg-white p-6 rounded-full shadow-sm mb-6 text-6xl">
            📅
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Found</h2>
          <p className="text-gray-500 max-w-xs mb-8 text-sm leading-relaxed">
            It looks like you haven't booked any properties yet. Start exploring now!
          </p>
          <button 
            onClick={() => navigate('/properties')}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Explore Properties
          </button>
        </div>
      ) : (
        /* 3. Bookings Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {bookings.map((booking) => (
            <div 
              key={booking?._id} 
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Header Section */}
              <div className="p-5 border-b border-gray-50 flex justify-between items-start bg-gradient-to-r from-white to-gray-50">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 leading-tight">
                    {booking?.propertyID?.propertyName}
                  </h3>
                  <p className="text-xs font-semibold text-blue-500 uppercase mt-1 tracking-wider">
                    {booking?.propertyID?.propertyType?.replaceAll('_', ' ')}
                  </p>
                </div>
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${STATUS_STYLES[booking?.status] || STATUS_STYLES['DEFAULT']}`}>
                  {booking?.status}
                </span>
              </div>

              {/* Stats Section */}
              <div className="p-5 grid grid-cols-2 gap-4 bg-white text-left">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-gray-400">{booking?.status === 'CONFIRMED' ? 'Amount Paind' : 'Amount Due'}</span>
                  <p className={`text-lg font-bold ${booking.status === "CONFIRMED" ? 'text-green-600' : 'text-yellow-600'}`}>₹{booking?.bookingAmount?.toLocaleString()}</p>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Check-In</span>
                  <p className="text-sm font-bold text-gray-700">
                    {booking?.expectedCheckInDate ? 
                      new Date(booking.expectedCheckInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'N/A'
                    }
                  </p>
                </div>

                <div className="flex flex-col border-t pt-2 mt-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Booked On</span>
                  <p className="text-xs text-gray-500">
                    {new Date(booking?.bookingDate).toLocaleDateString('en-IN')}
                  </p>
                </div>

                {/* Conditional PG Info */}
                {booking?.propertyID?.propertyType === 'PG' && (
                  <div className="flex flex-col border-t pt-2 mt-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Room Type</span>
                    <p className="text-xs font-semibold text-gray-600">
                      {booking?.pgRoomPricingID?.roomType} Sharing
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Action */}
              <div className="px-5 py-3 bg-gray-50 mt-auto border-t border-gray-100">
                <button 
                  onClick={() => navigate(`/seeker/booking-details/${booking?._id}`)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
