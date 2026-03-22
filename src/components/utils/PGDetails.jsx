import React, { useEffect, useState } from 'react';
import { 
  Users, Calendar, Clock, ShieldCheck, Utensils, 
  CheckCircle2, XCircle, Info, Home, MapPin, Phone, Mail, BadgeCheck
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const PGDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getPGDetails();
  }, [id]);

  const getPGDetails = async () => {
    try {
      const res = await axios.get(`/pg/pg/${id}`);
      if (res.status === 200) {
        setData(res?.data?.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-20 font-medium">Loading Property Details...</div>;
  if (!data) return <div className="text-center p-20">No data found.</div>;

  const property = data.propertyId;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* 1. Image Gallery Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-64 md:h-96 rounded-2xl overflow-hidden shadow-md">
        <div className="relative h-full">
          <img 
            src={property?.gallery[0]?.fileUrl || 'https://via.placeholder.com'} 
            className="w-full h-full object-cover" 
            alt="Main" 
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {property?.isVerified && (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <BadgeCheck size={14}/> Verified
              </span>
            )}
          </div>
        </div>
        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={property?.gallery[1]?.fileUrl} className="w-full h-full object-cover" alt="Gallery 1" />
            <div className="relative">
                <img src={property?.gallery[0]?.fileUrl} className="w-full h-full object-cover blur-[2px]" alt="Gallery 2" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold">
                    +{property?.gallery?.length} Photos
                </div>
            </div>
        </div>
      </div>

      {/* 2. Main Title & Basic Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{property?.propertyName}</h1>
            <p className="flex items-center gap-1 text-gray-500 mt-2">
              <MapPin size={18} className="text-red-500"/> {property?.houseNo}, {property?.landmarkStreet}, {property?.city}
            </p>
          </div>
          <div className="text-right">
             <Badge icon={<Users size={16}/>} label={data?.availableFor} color="bg-blue-600 text-white" />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t">
          <Badge icon={<Home size={16}/>} label={`For: ${data?.preferredGuest}`} color="bg-purple-100 text-purple-700" />
          <Badge icon={<Calendar size={16}/>} label={`Moving from: ${new Date(data?.availableFrom).toLocaleDateString()}`} color="bg-green-100 text-green-700" />
          <Badge icon={<Clock size={16}/>} label={`Visit: ${property?.visitSchedule?.startTime} - ${property?.visitSchedule?.endTime}`} color="bg-gray-100 text-gray-700" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Rules & Policy */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" /> Stay Rules & Policies
            </h3>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                    <p className="text-sm text-gray-400">Gate Closing</p>
                    <p className="font-semibold text-gray-800">{data?.gateClosingTime}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-gray-400">Notice Period</p>
                    <p className="font-semibold text-gray-800">{data?.noticePeriodDays} Days</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-gray-400">Lock-in Period</p>
                    <p className="font-semibold text-gray-800">{data?.rentLockInMonth} Months</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-gray-400">Guardian Stay</p>
                    <p className={`font-semibold ${data?.noGuardianStay ? 'text-red-500' : 'text-green-500'}`}>
                        {data?.noGuardianStay ? 'Not Allowed' : 'Allowed'}
                    </p>
                </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4">What this place offers</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data?.amenities?.map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0"/>
                  <span className="text-sm font-medium">{item.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-3">About this PG</h3>
            <p className="text-gray-600 leading-relaxed italic">"{data?.description}"</p>
          </div>
        </div>

        {/* Right Column (Contact & Food) */}
        <div className="space-y-6">
          {/* Food Section */}
          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-800">
              <Utensils /> Food Services
            </h3>
            {!data?.foodIncluded ? (
              <p className="text-orange-700 bg-white/50 p-3 rounded-lg text-sm">Self-Cooking / No Food Included</p>
            ) : (
              <div className="space-y-3">
                <FoodItem label="Breakfast" active={data?.breakfast} />
                <FoodItem label="Lunch" active={data?.lunch} />
                <FoodItem label="Dinner" active={data?.dinner} />
              </div>
            )}
          </div>

          {/* Contact Card */}
          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
             <h3 className="text-lg font-bold mb-4">Interested? Contact Owner</h3>
             <div className="space-y-4">
                <a href={`tel:${property?.propertyContact}`} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                    <div className="bg-green-500 p-2 rounded-lg"><Phone size={18}/></div>
                    <div>
                        <p className="text-xs text-gray-400">Call Now</p>
                        <p className="font-semibold">+91 {property?.propertyContact}</p>
                    </div>
                </a>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                    <div className="bg-blue-500 p-2 rounded-lg"><Mail size={18}/></div>
                    <div className="overflow-hidden">
                        <p className="text-xs text-gray-400">Email Manager</p>
                        <p className="font-semibold truncate text-sm">{property?.propertyEmail}</p>
                    </div>
                </div>
             </div>
             <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition">
                Book a Visit
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const Badge = ({ icon, label, color }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm shadow-sm ${color}`}>
    {icon} {label}
  </div>
);

const FoodItem = ({ label, active }) => (
  <div className="flex items-center justify-between bg-white/80 p-3 rounded-xl border border-orange-200 shadow-sm">
    <span className="text-gray-800 font-medium">{label}</span>
    {active ? <CheckCircle2 size={20} className="text-green-500" /> : <XCircle size={20} className="text-gray-300" />}
  </div>
);
