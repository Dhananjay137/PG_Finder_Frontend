import React, { useEffect, useState } from 'react';
import { STATUS_STYLES } from '../utils/statusStyles';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';
import { FileCard } from '../utils/FileCard';
import { Check, Clock, Locate, Mail, MapPin, Phone } from 'lucide-react';

export const BookingDetails = () => {
  const [booking, setBooking] = useState({})
  const [displayFile, setDisplayFile] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const { id } = useParams()

  useEffect(() => {
    getBookingDetails()
  },[id])

  const getBookingDetails = async() => {
    try{
      const res = await api.get(`/booking/details/${id}`)
      //console.log(res)

      if(res?.status === 200){
        setBooking(res?.data?.data)
      }

    } catch(err){
      console.log(err?.message);
      toast.error(err?.response?.data?.message || err?.message);
    }
  }
  const handleFile = (url, name) => {
    //console.log(url, name)
    setFileUrl(url)
    setFileName(name)
    setDisplayFile(!displayFile)
  }

  const property = booking?.propertyID;
  const isPG = property?.propertyType === 'PG';

  return (
    <div className="max-w-5xl mx-auto p-0 md:p-8 space-y-3 md:space-y-6 bg-gray-50 min-h-screen">
      {displayFile && (
        <FileCard 
          fileUrl={fileUrl} 
          fileName={fileName} 
          onClose={() => setDisplayFile(false)} 
        />
      )}
      
      {/* 1. Header Card: Property Summary */}
      <div className="bg-white rounded-md p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md uppercase">
            {property?.propertyType}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-800 mt-2">{property?.propertyName}</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1">
            <span><MapPin size={14}/></span> {property?.houseNo}, {property?.landmarkStreet}, {property?.city}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-4 py-2 rounded-md text-xs font-bold uppercase shadow-sm ${STATUS_STYLES[booking?.status]}`}>
            {booking?.status}
          </span>
          <p className="text-xs text-gray-400 mt-2">Booking ID: {booking?._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        
        {/* 2. Left Column: Specific Stay Details */}
        <div className="lg:col-span-2 space-y-3 md:space-y-6">
          
          {/* Booking Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            {booking?.status === 'CONFIRMED' ? <InfoBox label="Amount Paid" value={`₹${booking?.bookingAmount}`} subValue="Confirmed" /> : <InfoBox label="Amount Due" value={`₹${booking?.bookingAmount}`} subValue="Pending" />}
            
            <InfoBox label="Check-in Date" value={new Date(booking?.expectedCheckInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} />
            <InfoBox label="Booked On" value={new Date(booking?.bookingDate).toLocaleDateString('en-IN')} />
            
            {/* Conditional PG Info */}
            {isPG && (
              <>
                <InfoBox label="Room Type" value={`${booking?.pgRoomPricingID?.roomType} Sharing`} />
                <InfoBox label="Security Deposit" value={`₹${booking?.pgRoomPricingID?.securityDeposit}`} />
                <InfoBox label="Monthly Rent" value={`₹${booking?.pgRoomPricingID?.monthlyRent}`} />
              </>
            )}
          </div>

          {/* Visit / Access Schedule */}
          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><span><Clock size={14}/></span> Access Schedule</h2>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Visiting Hours</p>
                <p className="text-sm font-medium">{property?.visitSchedule.startTime} - {property?.visitSchedule.endTime}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Frequency</p>
                <p className="text-sm font-medium">{property?.visitSchedule.dayType}</p>
              </div>
              {property?.visitSchedule?.allDayAccess && (
                <span className="bg-green-100 text-green-700 space-x-2 px-3 py-1 rounded-lg text-xs font-bold flex items-center">
                  <Check size={14}/> 24/7 Access Available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3. Right Column: Contact & Verification */}
        <div className="space-y-3 md:space-y-6">
          {/* Host Contact */}
          <div className="bg-blue-600 text-white p-6 rounded-md shadow-lg">
            <h2 className="font-bold text-lg mb-4">Contact Host</h2>
            <p className="text-blue-100 text-sm">Need help with check-in?</p>
            <div className="mt-4 space-y-3">
              <a href={`tel:${property?.propertyContact}`} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors">
                <span><Phone size={14}/></span> +91 {property?.propertyContact}
              </a>
              <a href={`mailto:${property?.propertyEmail}`} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors text-sm truncate">
                <span><Mail size={14}/></span> {property?.propertyEmail}
              </a>
            </div>
          </div>

          {/* KYC Document Status */}
          <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4">KYC Verification</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                🪪
              </div>
              <div>
                <p className="font-bold text-gray-700">{booking?.bookingDocumentID?.documentName?.replaceAll('_', ' ')}</p>
                <span className={`text-[10px] font-black uppercase ${booking?.bookingDocumentID?.verificationStatus === 'VERIFIED' ? 'text-green-500' : 'text-orange-500'}`}>
                   ● {booking?.bookingDocumentID?.verificationStatus}
                </span>
              </div>
            </div>
            <button
              className="block text-center mt-4 text-xs font-bold text-blue-600 underline cursor-pointer"
              onClick={() => {handleFile(booking?.bookingDocumentID?.fileUrl, booking?.bookingDocumentID?.documentName)}}
              >
              View Uploaded File
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component for the stats grid
const InfoBox = ({ label, value, subValue }) => (
  <div className="flex flex-col">
    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{label}</span>
    <p className="text-md font-bold text-gray-800">{value}</p>
    {subValue && subValue === 'Confirmed' && <span className="text-[10px] text-green-500 font-bold uppercase">{subValue}</span>}
    {subValue && subValue === 'Pending' && <span className="text-[10px] text-yellow-500 font-bold uppercase">{subValue}</span>}
  </div>
);
