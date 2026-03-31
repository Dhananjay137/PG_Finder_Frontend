import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const BookingForm = ({ bookingAmount,onNext,setStep1Data }) => {
  const navigate = useNavigate();
  const { propertyId, propertyType } = useParams();

  // Initialize useForm with price from state
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      bookingAmount: bookingAmount || 0, // Automatically fills on load
      expectedCheckInDate: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Booking Data:", { ...data, propertyId, propertyType });
    setStep1Data(data)
    onNext()
    // Proceed with your API call here
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-full max-w-full p-6 rounded-b-md">
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Confirm Booking</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Expected Check-in Date */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Expected Check-in Date</label>
            <input 
              type="date"
              {...register("expectedCheckInDate", { 
                required: "Check-in date is required",
                min: {
                  value: new Date().toISOString().split('T')[0],
                  message: "Date cannot be in the past"
                }
              })}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.expectedCheckInDate && <p className="text-red-500 text-xs mt-1">{errors.expectedCheckInDate.message}</p>}
          </div>

          {/* Total Amount (Read-only or Disabled to prevent editing) */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Total Amount (₹)</label>
            <input 
              type="number"
              disabled
              {...register("bookingAmount")}
              className="w-full border border-gray-300 p-2.5 rounded-lg bg-gray-100 cursor-not-allowed font-bold text-gray-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md"
            >
              Confirm & Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
