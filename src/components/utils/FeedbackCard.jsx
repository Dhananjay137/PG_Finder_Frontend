import React from 'react'
import { Star, Flag, ShieldAlert } from 'lucide-react' 
import { useNavigate } from 'react-router-dom'

export const FeedbackCard = ({ feedback }) => {
  const navigate = useNavigate()
  const { userID, propertyID, rating, comment, createdAt, _id, status } = feedback
  
  const isBlocked = status === "BLOCKED"

  return (
    <div key={_id} className={`relative bg-white rounded-md border shadow-sm overflow-hidden mb-8 transition-all ${isBlocked ? 'border-red-200 bg-gray-50' : 'border-gray-100'}`}>
      
      {/* BLOCKED OVERLAY & BADGE */}
      {isBlocked && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-lg">
          <ShieldAlert size={12} />
          Blocked
        </div>
      )}

      {/* HEADER */}
      <div className={`p-4 border-b flex items-center justify-between ${isBlocked ? 'bg-red-50/50 border-red-100' : 'bg-gray-50/50 border-gray-100'}`}>
        <div className={`flex items-center gap-3 ${isBlocked ? 'opacity-50' : ''}`}>
          <div className="h-12 w-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-blue-100 flex-shrink-0">
            {userID?.profilePic ? (
              <img src={userID.profilePic} alt="User" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-blue-700 font-bold text-lg">
                {userID?.firstName?.at(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              {userID?.firstName} {userID?.lastName}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium lowercase italic">
              {isBlocked ? "User Restricted" : userID?.email}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Reviewed On</p>
          <p className="text-xs font-semibold text-gray-600">
            {new Date(createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className={`p-6 space-y-4 ${isBlocked ? 'opacity-60 grayscale-[0.5]' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className={`text-sm font-black uppercase tracking-wide ${isBlocked ? 'text-gray-500' : 'text-blue-600'}`}>
              {propertyID?.propertyName}
            </h4>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
              {propertyID?.propertyType}
            </span>
          </div>

          <div className="flex gap-0.5 bg-yellow-50 px-2 py-1 rounded-lg">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
              />
            ))}
          </div>
        </div>

        <div className="pt-2">
          <p className={`text-sm leading-relaxed border-l-4 pl-4 italic ${isBlocked ? 'text-gray-400 border-red-200 line-through' : 'text-gray-700 border-blue-100'}`}>
            "{isBlocked ? "This content has been removed due to a violation." : comment}"
          </p>
        </div>

        {/* FOOTER ACTION */}
        <div className="pt-4 mt-2 border-t border-gray-50 flex justify-end">
          {isBlocked ? (
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1">
               Review Hidden
            </span>
          ) : (
            <button 
              onClick={() => navigate(`/report-feedback/${_id}`)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              <Flag size={12} />
              Report Review
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
