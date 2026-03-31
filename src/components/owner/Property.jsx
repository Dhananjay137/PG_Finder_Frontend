import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';

export const Property = ({ property, wishID, savedNote }) => {
  let type = ''
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const {
    _id,
    propertyName,
    propertyType,
    city,
    houseNo,
    landmarkStreet,
    propertyContact,
    propertyEmail,
    gallery,
    visitSchedule,
    status,
    isVerified
  } = property;
  const navigate = useNavigate()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  },[])

  // Use the first image from gallery as cover
  const coverImage = gallery?.[0]?.fileUrl || "https://via.placeholder.com";

  const handleNavigate = (id, type) => {
    if(type === 'PG'){
      navigate(`/owner/add-details/pg/${id}`)
    }
    if(type === 'FLAT'){
      navigate(`/owner/add-details/flat/${id}`)
    }
  }

  const addToWishlist = async(propertyID) => {
    try {

      const res = await api.post('/wishlist/wish',{ propertyID, note})
      console.log(res)

      if(res?.data?.exists && res?.status == 200){
        toast.warn(res?.data?.message)
        setShowModal(false);
        setIsSaved(false)
        setNote('')
      }

      if(res?.status == 201){
        setIsSaved(true);
        setShowModal(false);
        toast.success(res?.data?.message)
      }

    } catch(err) {
      console.log(err?.message)
      toast.error(err?.message)
    }
  }

  const removeFromWishlist = async(id) => {
    try{
      const res = await api.delete(`/wishlist/wish/${id}`)
      console.log(res)

      if(res?.status == 200){
        toast.success(res?.data?.message)
      }

    }catch(err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  //daynamicaly add role
  const handleViewNavigate =( id, type ) => {
    const role = user?.role?.toLowerCase();
    //console.log(role)
    if(type === 'PG'){
      navigate(`/${role}/detail/pg/${_id}`)
    }
    if(type === 'FLAT'){
      navigate(`/${role}/detail/flat/${_id}`)
    }
  }

  // Status Badge Colors
  const statusStyles = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    APPROVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
    DEACTIVATED: "bg-gray-100 text-gray-700 border-gray-200",
    RENT_OUT: "bg-blue-100 text-blue-700 border-blue-200",
    BLOCKED: "bg-black text-white border-black"
  };

  return (
    <div className="mx-w-full md:max-w-sm text-gray-700 bg-white rounded-md overflow-hidden border border-gray-300 hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <img 
          src={coverImage} 
          alt={propertyName} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <span className="px-2 py-1 bg-white/90 backdrop-blur text-[10px] font-bold rounded shadow-sm">
            {propertyType}
          </span>
          {isVerified && (
            <span className="p-1 bg-blue-600 text-white rounded-full text-center shadow-lg">
              <CheckCircle2 size={12} />
            </span>
          )}
        </div>
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-[10px] font-bold border ${statusStyles[status] || statusStyles.PENDING}`}>
          {status.replaceAll('_',' ')}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 truncate uppercase tracking-tight">
            {propertyName}
          </h3>
          <div className="flex items-center text-gray-500 text-xs mt-1">
            <MapPin size={14} className="mr-1 shrink-0" />
            <span className="truncate">{houseNo}, {landmarkStreet}, {city}</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-1 mb-4">
          <div className="flex items-center text-xs text-gray-600">
            <Phone size={12} className="mr-2 text-gray-400" />
            {propertyContact}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Mail size={12} className="mr-2 text-gray-400" />
            <span className="truncate">{propertyEmail}</span>
          </div>
        </div>
        {/* Dynamic Buttons - Only show if Approved */}
       
          <div className="flex flex-col gap-2 mt-4 mb-2">
            
            {/* Standard for all Pending Properties */}
            {type=='OWNER' && status === 'PENDING' && (
              <button 
            onClick={() => handleNavigate(_id, propertyType)}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold py-2.5 rounded-lg transition-colors tracking-wider">
              ADD DETAILS
            </button>
            )}
            

            {/* Only for APPROVED PGs */}
            {type=='OWNER' && status === 'APPROVED' && propertyType === 'PG' && (
              <button 
              onClick={() => navigate(`/owner/add-room/pg/${_id}`)}
              className="w-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-[11px] font-bold py-2.5 rounded-lg transition-colors tracking-wider uppercase">
                + Add Room
              </button>
            )}

            {status == 'APPROVED' && <button 
            onClick={() => handleViewNavigate(_id, propertyType)}
            className="w-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-[11px] font-bold py-2.5 rounded-lg transition-colors tracking-wider uppercase">
              View Detils
            </button>}

            { !wishID && user?.role == 'SEEKER' && <button 
              onClick={() => setShowModal(true)}
              className={`p-2 text-[11px] font-bold rounded-md border bg-gray-50 border-gray-400 uppercase hover: ${isSaved ? 'bg-red-100 border-red-500' : 'bg-white'}`}
            >
              <span className={isSaved ? 'text-red-500' : 'text-gray-400'}>Add to Wishlist</span>
            </button>}

            { wishID && user?.role == 'SEEKER' && <button 
              onClick={() => removeFromWishlist(wishID)}
              className={`p-2 text-[11px] font-bold rounded-md border border-gray-400 bg-gray-50 hover:bg-gray-100 uppercase`}
            >
              <span className='text-gray-700'>Remove from Wishlist</span>
            </button>}
          </div>

        {/* Visit Schedule Footer */}
        <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center text-[11px] font-medium text-gray-700">
            <Clock size={12} className="mr-1 text-blue-500" />
            <span>{visitSchedule?.dayType}</span>
          </div>
          <div className="text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
            {visitSchedule?.startTime} - {visitSchedule?.endTime}
          </div>
        </div>
        
        {visitSchedule?.allDayAccess && (
          <div className="mt-2 flex items-center text-[10px] text-emerald-600 font-semibold uppercase">
            <AlertCircle size={10} className="mr-1" /> 24/7 Access Available
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-white/30 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-lg font-bold mb-3">Add to Wishlist</h3>
            <p className="text-sm text-gray-500 mb-2">Write a private note about this property:</p>
            
            <textarea 
              className="w-full border p-2 rounded-md h-24 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Near my favorite cafe..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={() => addToWishlist(_id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
