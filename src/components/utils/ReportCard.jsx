import React from 'react';
import { Calendar, MessageSquare, AlertCircle, Clock } from 'lucide-react';

const ReportCard = ({ report }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const statusStyles = {
    PENDING: "bg-amber-50 text-amber-600 border-amber-100",
    RESOLVED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    REJECTED: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow max-w-lg">
      {/* Header: Status & Date */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[report?.status] || statusStyles.PENDING}`}>
          {report?.status}
        </span>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <Calendar size={14} />
          {formatDate(report?.createdAt)}
        </div>
      </div>

      {/* Original Comment Section */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-1 text-blue-800 font-semibold text-sm">
          <MessageSquare size={14} />
          <span>Reported Feedback</span>
        </div>
        <p className="text-gray-600 text-sm italic">"{report?.feedbackID?.comment}"</p>
        <div className="mt-2 flex items-center gap-2">
           <span className="text-xs font-medium text-blue-500">Rating: {report?.feedbackID?.rating}/5</span>
        </div>
      </div>

      {/* Your Reason Section */}
      <div className="flex gap-3">
        <div className="mt-1 text-blue-800">
          <AlertCircle size={18} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Reason</span>
          <p className="text-gray-800 text-sm leading-relaxed">
            {report?.reason}
          </p>
        </div>
      </div>

      {/* Footer: ID info */}
      <div className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400 font-mono">
        <span>REPORT ID: {report?._id.slice(-8).toUpperCase()}</span>
        <div className="flex items-center gap-1">
          <Clock size={10} />
          <span>Updated: {formatDate(report?.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
