import React from 'react'
import { X } from 'lucide-react'

export const FileCard = ({ fileUrl, fileName, onClose }) => {
  return (
    // Fixed inset-0 covers the whole screen. backdrop-blur-sm blurs the background data.
    <div 
      className='fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
      onClick={onClose}
    >
      <div 
        className='relative bg-white p-2 rounded-lg shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-200'
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the image itself
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className='absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors'
        >
          <X size={30} />
        </button>

        {/* Image Container */}
        <div className='overflow-hidden rounded-md'>
          <img 
            src={fileUrl} 
            alt={fileName} 
            className='w-full h-auto max-h-[80vh] object-contain mx-auto' 
          />
          <p className='text-center py-2 font-semibold text-gray-700 capitalize'>{fileName}</p>
        </div>
      </div>
    </div>
  )
}
