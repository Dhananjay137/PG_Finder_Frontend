import React, { useEffect, useState } from 'react';
import { getUser } from './getUser';

export const Profile = () => {
  const [userId] = useState('69b3a9c5dedfbdfd03c51f89');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getUser(userId);
      setUserData(data);
    };
    fetch();
  }, [userId]);

  const handleUpdate = () => {
    console.log("Redirecting to update profile for:", userData._id);
    // Add your navigation or modal logic here
  };

  if (!userData) return <div className="p-4 animate-pulse bg-white/20 rounded-2xl w-72 h-80"></div>;

  return (
    
    <div className='bg-gray-50 h-screen flex items-center justify-center'>
    <div className="md:w-2xl w-full  p-6 rounded-md bg-white/80 backdrop-blur-2xl border border-white/40 ring-1 ring-black/5 text-gray-800">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/50 text-blue-900 font-bold text-2xl mb-3 shadow-xl">
          {userData.firstName?.at(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          {userData.firstName} {userData.lastName}
        </h2>
        <span className="mt-1 px-3 py-1 rounded-full bg-white/40 border border-white/60 text-[10px] font-black text-gray-700 uppercase tracking-widest">
          {userData.role}
        </span>
      </div>

      {/* Details List */}
      <div className="space-y-3.5 mb-8">
        <InfoRow label="Email" value={userData.email} />
        <InfoRow label="Phone" value={userData.contact} />
        <InfoRow 
          label="Status" 
          value={userData.status} 
          color={userData.status === 'ACTIVE' ? 'text-green-600' : 'text-amber-600'} 
        />
        <InfoRow label="Partner" value={userData.lookingForPartner ? "Yes" : "No"} />
        <InfoRow label="Joined" value={new Date(userData.createdAt).toLocaleDateString()} />
      </div>

      {/* Glassy Update Button */}
      <button 
        onClick={handleUpdate}
        className="w-full py-3 px-4 rounded-md bg-white/40 hover:bg-white/60 border border-white/60 text-gray-900 font-bold text-sm transition-all duration-300 active:scale-95 shadow-md backdrop-blur-md flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Update Profile
      </button>
    </div>
    </div>
  );
};

// Sub-component for clean rows
const InfoRow = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex justify-between items-center text-sm border-b border-white/10 pb-1">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className={`font-semibold truncate max-w-[180px] ${color}`}>{value}</span>
  </div>
);
