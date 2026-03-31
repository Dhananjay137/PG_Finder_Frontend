import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UpdateProfileForm } from './UpdateProfileForm';

export const Profile = () => {
  const [decodedUser, setDecodedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [token, setToken] = useState('')

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser?.token) {
      setDecodedUser(jwtDecode(savedUser?.token));
      setToken(savedUser?.token)
      //console.log(savedUser.token)
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true); 
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (confirmDelete) {
      console.log("Deleting account:", decodedUser?._id);
    }
  };

  if (isEditing) {
    return (
      <div className="relative">
        {/* Back Button to exit edit mode */}
        <button 
          onClick={() => setIsEditing(false)} 
          className="absolute top-10 left-10 text-sm font-bold text-blue-600 hover:underline"
        >
          ← Back to Profile
        </button>
        <UpdateProfileForm user={decodedUser} token={token} setIsEditing={setIsEditing} />
      </div>
    );
  }

  if (!decodedUser) return <div className="p-4 animate-pulse bg-white/20 rounded-2xl w-72 h-80"></div>;

  return (
    <div className='bg-gray-50 h-screen flex items-center justify-center p-4'>
      <div className="md:w-2xl w-full p-6 rounded-md bg-white/80 backdrop-blur-2xl border border-white/40 ring-1 ring-black/5 text-gray-800 shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full overflow-hidden border border-white/50 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-900 font-bold text-2xl mb-3 shadow-xl">
            {decodedUser?.profilePic ? (
              <img src={decodedUser.profilePic} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              decodedUser?.firstName?.at(0).toUpperCase()
            )}
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {decodedUser?.firstName} {decodedUser?.lastName}
          </h2>
          <span className="mt-1 px-3 py-1 rounded-full bg-white/40 border border-white/60 text-[10px] font-black text-gray-700 uppercase tracking-widest">
            {decodedUser?.role}
          </span>
        </div>

        {/* Details List */}
        <div className="space-y-3.5 mb-8">
          <InfoRow label="Email" value={decodedUser?.email} />
          <InfoRow label="Phone" value={decodedUser?.contact} />
          <InfoRow 
            label="Status" 
            value={decodedUser?.status} 
            color={decodedUser?.status === 'ACTIVE' ? 'text-green-600' : 'text-amber-600'} 
          />
          <InfoRow label="Partner" value={decodedUser?.lookingForPartner ? "Yes" : "No"} />
          <InfoRow label="Joined" value={new Date(decodedUser?.createdAt).toLocaleDateString()} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleEdit}
            className="flex-1 py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all duration-300 active:scale-95 shadow-md flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>

          <button 
            onClick={handleDelete}
            className="flex-1 py-3 px-4 rounded-md bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className={`font-semibold truncate max-w-[180px] ${color}`}>{value || 'N/A'}</span>
  </div>
);
