import React, { useEffect, useState } from 'react';
import { 
  Users, Calendar, Clock, ShieldCheck, Utensils, 
  CheckCircle2, XCircle, Info, Home, MapPin, Phone, Mail, BadgeCheck,
  Bed, Wallet, DoorOpen
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axiosInstance';

// Helper component for Badges
const Badge = ({ icon, label, color }) => (
  <span className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${color}`}>
    {icon} {label}
  </span>
);

// Helper component for Food Items
const FoodItem = ({ label, active }) => (
  <div className="flex items-center justify-between p-2 bg-white rounded-md border border-orange-100">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    {active ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-400" />}
  </div>
);

export const PGDetails = () => {
  const [data, setData] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getPGDetails();
    getRooms();
  }, [id]);

  const getPGDetails = async () => {
    try {
      const res = await api.get(`/pg/pg/${id}`);
      if (res.status === 200) {
        setData(res?.data?.data);
        console.log(res)
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRooms = async () => {
    try {
      const res = await api.get(`/pg/pg/rooms/${id}`);
      if (res.status === 200) {
        setRoomData(res?.data?.data);
        console.log(res)
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };
  const bookRoom = (id,securityDeposit,roomType) => {
    console.log(id,securityDeposit,roomType)
    navigate(`/seeker/booking/${data?.propertyId?.propertyType}/${data?.propertyId?._id}`,{
      state: {
        ownerID: data?.propertyId?.ownerId,
        pgRoomPricingID: id,
        bookingAmount: securityDeposit,
        roomType: roomType
      }
    })
  }

  if (loading) return <div className="text-center p-20 font-medium text-indigo-600">Loading Property Details...</div>;
  if (!data) return <div className="text-center p-20">No data found.</div>;

  const property = data.propertyId;

  return (
    <div className="max-w-5xl mx-auto p-0 md:p-6 space-y-6 bg-gray-50/50">
      
      {/* 1. Image Gallery Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-64 md:h-96 rounded-md overflow-hidden shadow-md">
        <div className="relative h-full bg-gray-200">
          <img 
            src={property?.gallery[0]?.fileUrl || 'https://via.placeholder.com'} 
            className="w-full h-full object-cover" 
            alt="Main" 
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {property?.isVerified && (
              <span className="bg-green-600 text-white px-3 py-1 rounded-md text-xs flex items-center gap-1 shadow-lg">
                <BadgeCheck size={14}/> Verified
              </span>
            )}
          </div>
        </div>
        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={property?.gallery[1]?.fileUrl || 'https://via.placeholder.com'} className="w-full h-full object-cover bg-gray-200" alt="Gallery 1" />
            <div className="relative">
                <img src={property?.gallery[0]?.fileUrl || 'https://via.placeholder.com'} className="w-full h-full object-cover blur-[2px] bg-gray-200" alt="Gallery 2" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold">
                    +{property?.gallery?.length || 0} Photos
                </div>
            </div>
        </div>
      </div>

      {/* 2. Main Title & Basic Info */}
      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{property?.propertyName}</h1>
            <p className="flex items-center gap-1 text-gray-500 mt-2">
              <MapPin size={18} className="text-red-500"/> {property?.houseNo}, {property?.landmarkStreet}, {property?.city}
            </p>
          </div>
          <div className="flex gap-2">
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
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* NEW: Room details section */}
          <div className="bg-white p-6 rounded-md border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <DoorOpen className="text-blue-600" /> Available Room Types
            </h3>
            <div className="space-y-4">
              {roomData.length > 0 ? roomData.map((room) => (
                <div key={room._id} className="border border-gray-100 rounded-md p-4 hover:border-blue-200 transition-colors bg-gray-50/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {room.roomType} Sharing
                    </span>
                    <span className={`text-xs font-bold ${room.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                      {room.isAvailable ? `${room.availableBeds} Beds Left` : 'Sold Out'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Wallet size={12}/> Rent</span>
                      <span className="font-bold text-gray-800">₹{room.monthlyRent}/mo</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 flex items-center gap-1"><ShieldCheck size={12}/> Deposit</span>
                      <span className="font-bold text-gray-800">₹{room.securityDeposit}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12}/> Available From</span>
                      <span className="font-bold text-gray-800">{new Date(room.availableFrom).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dashed border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Room Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <span key={amenity} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded text-gray-600">
                          {amenity.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {room?.isAvailable && <div className='w-full pt-2 text-sm font-bold'>
                    <button 
                      className='p-2.5 w-full bg-green-600 text-white border border-green-200 rounded-md'
                      onClick={() => bookRoom(room?._id,room?.securityDeposit,room?.roomType)}
                      >Book Room</button>
                  </div>}
                </div>
              )) : (
                <p className="text-gray-400 text-sm italic">No room configurations listed yet.</p>
              )}
            </div>
          </div>

          {/* Rules & Policy */}
          <div className="bg-white p-6 rounded-md border border-gray-100 shadow-sm">
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
          <div className="bg-white p-6 rounded-md border border-gray-100 shadow-sm">
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
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-orange-50 p-6 rounded-md border border-orange-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-800">
              <Utensils /> Food Services
            </h3>
            {!data?.foodIncluded ? (
              <p className="text-orange-700 bg-white/50 p-3 rounded-md text-sm">Self-Cooking / No Food Included</p>
            ) : (
              <div className="space-y-3">
                <FoodItem label="Breakfast" active={data?.breakfast} />
                <FoodItem label="Lunch" active={data?.lunch} />
                <FoodItem label="Dinner" active={data?.dinner} />
              </div>
            )}
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-md shadow-xl sticky top-6">
             <h3 className="text-lg font-bold mb-4">Interested in staying?</h3>
             <div className="space-y-4">
               <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-md transition-all flex items-center justify-center gap-2">
                 <Phone size={18}/> Contact Owner
               </button>
               <button 
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-md transition-all flex items-center justify-center gap-2"
                >
                 <Mail size={18}/> Send Enquiry
               </button>
             </div>
             <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-xs text-gray-400">Response time: Usually within 2 hours</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
