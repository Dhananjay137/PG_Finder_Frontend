import React from 'react'

export const StatCard = ({ title, value, color, subText }) => {
  return (
    <div className={`bg-white p-5 rounded-xl shadow-sm border-t-4 ${color}`}>
      <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      {subText && <p className="text-xs text-red-500 mt-1">{subText}</p>}
    </div>
  )
}
