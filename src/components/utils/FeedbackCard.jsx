import React from 'react'
import { Star } from 'lucide-react'

export const FeedbackCard = ({ feedback }) => {
  // Destructure for cleaner access within the component
  const { userID, propertyID, rating, comment, createdAt, _id } = feedback

  return (
    <div key={_id} className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden mb-0">
      
      {/* HEADER: User Profile & Meta Data */}
      <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="h-12 w-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-blue-100 flex-shrink-0">
            {userID?.fileUrl ? (
              <img src={userID.fileUrl} alt="User" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-blue-700 font-bold text-lg">
                {userID?.firstName?.at(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              {userID?.firstName} {userID?.lastName}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium lowercase">
              {userID?.email}
            </p>
          </div>
        </div>

        {/* Created At Date */}
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Reviewed On</p>
          <p className="text-xs font-semibold text-gray-600">
            {new Date(createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* BODY: Property Info & Review */}
      <div className="p-6 space-y-4">
        
        {/* Property Info Row */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-black text-blue-600 uppercase tracking-wide">
              {propertyID?.propertyName}
            </h4>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
              {propertyID?.propertyType}
            </span>
          </div>

          {/* Rating Display */}
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

        {/* Review Content */}
        <div className="pt-2">
          <p className="text-gray-700 text-sm leading-relaxed border-l-4 border-blue-100 pl-4 italic">
            "{comment}"
          </p>
        </div>

      </div>
    </div>
  )
}
