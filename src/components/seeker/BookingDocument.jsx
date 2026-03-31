import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'

export const BookingDocument = () => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    getBookingDocument()
  },[])

  const getBookingDocument = async() => {
    try{
      const res = await api.get('/bookingDocument/bookingDocuments')
      
      if(res?.status == 200){
        setDocuments(res?.data?.data)
      }

    } catch(err){
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div>
      <h2 className='font-black text-2xl text-gray-700'>BookingDocument</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
        {documents?.map((document) => { return (
          <div 
  key={document?._id} 
  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
>
  {/* 1. Document Image Preview */}
  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
    {document?.fileUrl ? (
      <img 
        src={document.fileUrl} 
        alt={document.documentName} 
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="flex items-center justify-center h-full text-gray-400">
        📄
      </div>
    )}
  </div>

  {/* 2. Document Details */}
  <div className="flex-1">
    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
      {document?.documentName || "Document Name"}
    </h3>
    <p className="text-xs text-gray-400 mt-1">
      Uploaded: {new Date(document?.createdAt).toLocaleDateString()}
    </p>
  </div>

  {/* 3. Status Badge */}
  <div>
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
      document?.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' :
      document?.verificationStatus === 'REJECTED' ? 'bg-red-100 text-red-700' :
      'bg-yellow-100 text-yellow-700'
    }`}>
      {document?.verificationStatus || 'Pending'}
    </span>
  </div>
</div>

        )})}
      </div>
    </div>
  )
}
