import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BookingForm } from './BookingForm';
import { BookingDocumentForm } from './BookingDocumentForm';

export const MainBookingForm = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({})
  const { state } = useLocation();
  const { propertyId, propertyType } = useParams();

  // Progress Bar Width Logic
  const progressWidth = step === 1 ? 'w-1/2' : 'w-full';

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-md shadow-md overflow-hidden">
        
        {/* Progress Bar Header */}
        <div className="bg-gray-100 p-4 border-b border-gray-400">
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">
            <span className={step >= 1 ? "text-blue-600" : ""}>1. Details</span>
            <span className={step >= 2 ? "text-blue-600" : ""}>2. Documents</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div className={`bg-blue-600 h-full transition-all duration-500 ${progressWidth}`}></div>
          </div>
        </div>

        {/* Step Rendering */}
        <div className="p-0 bg-gray-100">
          {step === 1 && (
            <BookingForm 
              bookingAmount={state?.bookingAmount} 
              onNext={() => setStep(2)}
              setStep1Data={setStep1Data}
            />
          )}

          {step === 2 && (
            <BookingDocumentForm
              previousSetpData={step1Data}
              ownerID={state?.ownerID}
              propertyID={propertyId}
              propertyType={propertyType}
              pgRoomPricingID={state?.pgRoomPricingID}
              onBack={() => setStep(1)} 
              // onComplete={() => alert("Booking Submitted!")}
            />
          )}
        </div>
      </div>
    </div>
  );
};
