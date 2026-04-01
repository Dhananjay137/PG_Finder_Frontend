import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  MapPin, BedDouble, Bath, Square, Layers, Compass, 
  Car, ShieldCheck, CheckCircle2, BadgeCheck, Info,
  Calendar, Wallet, Building2, UserCircle, Clock, Phone, Mail
} from 'lucide-react';
import api from '../../api/axiosInstance';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FeedbackCard } from './FeedbackCard';

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-md border border-gray-100">
    <div className="p-2 bg-white rounded-md shadow-sm text-indigo-600">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export const FlatDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    getFlatDetails();
    getFeedbacks()
  }, [id]);

  const getFlatDetails = async () => {
    try {
      const res = await api.get(`/flat/flat/${id}`);
      if (res?.status === 200) setData(res?.data?.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  const getFeedbacks = async() => {
    try{
      const res = await api.get('/feedback/feedbacks',{
        params: {
          propertyID: data?.propertyId?._id
        }
      })

      console.log(res)
      if(res?.status == 200){
        setFeedbacks(res?.data?.data)
      }
    } catch(err){
      console.log(err)
      toast.error(err?.response?.data?.message || err?.message)
    }
  }
  const bookFlat = () => {
    navigate(`/seeker/booking/${data?.propertyId?.propertyType}/${data?.propertyId?._id}`,{
      state: {
        ownerID: data?.propertyId?.ownerId,
        bookingAmount: data?.expectedRent
      }
    })
  }

  if (loading) return <div className="text-center p-20 text-indigo-600 font-medium">Loading Flat Details...</div>;
  if (!data) return <div className="text-center p-20">No data found.</div>;

  const property = data?.propertyId;

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-8 space-y-4 md:space-y-8">
      
      {/* 1. Image Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[300px] md:h-[450px] rounded-md overflow-hidden shadow-md">
        <div className="md:col-span-2 relative h-full">
          <img 
            src={property?.gallery[0]?.fileUrl} 
            className="w-full h-full object-cover" 
            alt={property?.gallery[0]?.label} 
          />
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-xs backdrop-blur-sm">
            {property?.gallery[0]?.label}
          </div>
        </div>
        <div className="hidden md:grid grid-rows-2 gap-3 h-full">
          <div className="relative">
             <img src={property?.gallery[1]?.fileUrl} className="w-full h-full object-cover" alt="Gallery" />
             <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-[10px]">
                {property?.gallery[1]?.label}
             </div>
          </div>
          <div className="bg-indigo-50 flex flex-col items-center justify-center text-center p-4">
            <p className="text-indigo-600 font-bold text-xl">+{property?.gallery?.length}</p>
            <p className="text-indigo-400 text-xs font-semibold">Total Photos</p>
          </div>
        </div>
      </div>

      {/* 2. Header & Price */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 bg-white p-6 rounded-md border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
              {data.bhkType} {property?.propertyType}
            </span>
            {property?.isVerified && (
              <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                <BadgeCheck size={12}/> Verified
              </span>
            )}
          </div>
          <h1 className="text-3xl font-black text-gray-900">{property?.propertyName}</h1>
          <p className="flex items-center gap-1 text-gray-500 mt-2 font-medium">
            <MapPin size={18} className="text-red-500"/> {property?.houseNo}, {property?.landmarkStreet}, {property?.city}
          </p>
        </div>
        <div className="bg-gray-50 border border-indigo-100 p-5 rounded-md text-center md:text-right min-w-[220px]">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Monthly Rent</p>
          <div className="text-4xl font-black text-indigo-600">₹{data.expectedRent}</div>
          <div className="text-xs font-bold text-gray-500 mt-1">Deposit: ₹{data.securityDeposit}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Specifications */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            <InfoCard icon={<BedDouble size={20}/>} label="BHK" value={data.bhkType} />
            <InfoCard icon={<Square size={20}/>} label="Area" value={`${data.buildUpArea} Sqft`} />
            <InfoCard icon={<Layers size={20}/>} label="Floor" value={`${data.floorNo}/${data.totalFloor}`} />
            <InfoCard icon={<Compass size={20}/>} label="Facing" value={data.facing} />
            <InfoCard icon={<Building2 size={20}/>} label="Status" value={data.furnishingStatus} />
            <InfoCard icon={<Calendar size={20}/>} label="Age" value={`${data.propertyAge} Yrs`} />
          </div>

          {/* Visit Schedule & Location */}
          <div className="bg-indigo-50/50 p-6 rounded-md border border-indigo-100 grid md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-2 md:mb-3">
                <Clock size={18}/> Visit Timings ({property?.visitSchedule?.dayType})
              </h4>
              <p className="text-2xl font-black text-indigo-600">
                {property?.visitSchedule?.startTime} - {property?.visitSchedule?.endTime}
              </p>
              {property?.visitSchedule?.allDayAccess && (
                <span className="text-[10px] bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-md font-bold mt-2 inline-block">
                  ALL DAY ACCESS
                </span>
              )}
            </div>
            <div className="border-l border-indigo-100 md:pl-6">
               <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-2 mb-1">Coordinates</h4>
               <p className="text-xs text-indigo-400 font-mono">LAT: {property?.latitude}</p>
               <p className="text-xs text-indigo-400 font-mono">LNG: {property?.longitude}</p>
               <button className="mt-2 text-xs font-bold text-indigo-600 underline">Open in Maps</button>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-bold md:mb-4 flex items-center gap-2">
               <ShieldCheck className="text-green-600"/> Society Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.amenities.map((item) => (
                <div key={item} className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-md">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0"/>
                  <span className="text-xs font-bold text-gray-700">{item.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Contact & Quick Info */}
        <div className="space-y-3 md:space-y-3">

          {/* feedbacks */}
          <div className="w-sm md:w-full py-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}          // Space between cards
            slidesPerView={1}         // Show 1 card at a time (mobile)
            loop={feedbacks.length > 1}               // Continuous loop
            autoplay={{
              delay: 3000,            // 3 seconds per slide
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
                  
            className="pb-12"         // Padding for pagination dots
          >
            {feedbacks?.map((feedback) => (
              <SwiperSlide key={feedback?._id}>
                  <FeedbackCard feedback={feedback} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom CSS to style Swiper dots if needed */}
          <style>{`
            .swiper-pagination-bullet-active {
              background: #2563eb !important; /* blue-600 */
            }
          `}
          </style>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-md shadow-md sticky top-6">
             <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Contact Owner</h3>
                <p className="text-xs text-gray-400">Green View Residency Management</p>
             </div>
             
             <div className="space-y-3 md:space-y-4 mb-8">
                <a href={`tel:${property?.propertyContact}`} className="flex items-center gap-4 p-3 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                   <div className="p-2 bg-indigo-500 rounded-md"><Phone size={18}/></div>
                   <div>
                      <p className="text-[10px] text-gray-400 uppercase">Phone</p>
                      <p className="text-sm font-bold">{property?.propertyContact}</p>
                   </div>
                </a>
                <a href={`mailto:${property?.propertyEmail}`} className="flex items-center gap-4 p-3 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                   <div className="p-2 bg-pink-500 rounded-md"><Mail size={18}/></div>
                   <div>
                      <p className="text-[10px] text-gray-400 uppercase">Email</p>
                      <p className="text-sm font-bold truncate max-w-[150px]">{property?.propertyEmail}</p>
                   </div>
                </a>
             </div>

             <div className="space-y-3">
                <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                   <span className="text-gray-400">Maintenance</span>
                   <span className="font-bold">₹{data.maintenanceAmount}/mo</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                   <span className="text-gray-400">Preferred Tenant</span>
                   <span className="font-bold text-indigo-400">{data.preferredTenant}</span>
                </div>
                <div className="flex justify-between text-xs">
                   <span className="text-gray-400">Negotiable</span>
                   <span className={`font-bold ${data.rentNegotiable ? 'text-green-400' : 'text-red-400'}`}>
                      {data.rentNegotiable ? 'YES' : 'NO'}
                   </span>
                </div>
             </div>

             <button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-md mt-8 transition-transform active:scale-95 shadow-lg shadow-indigo-600/30"
              onClick={bookFlat}
            >
                BOOK NOW
             </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
