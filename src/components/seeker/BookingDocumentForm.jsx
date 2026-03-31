import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import axios from 'axios';

export const BookingDocumentForm = ({ previousSetpData,ownerID,propertyID,propertyType,pgRoomPricingID,onBack}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const onSubmit = async(data) => {
    console.log("Form Data:", data);
    console.log("Selected File:", data.fileUrl[0]); // Access the file object
    let bookingDocumentID = await addBookingDocument(data)
    console.log(bookingDocumentID)
    console.log('propertyType ',propertyType,' propertyID ',propertyID)

    let expectedCheckInDate = previousSetpData?.expectedCheckInDate
    let bookingAmount = previousSetpData?.bookingAmount
    console.log(bookingAmount,expectedCheckInDate,pgRoomPricingID)

    if(bookingDocumentID){
      let data 
      //set data for pg also
      if(pgRoomPricingID){
        data = {
          ownerID,
          propertyID,
          bookingDocumentID,
          pgRoomPricingID,
          bookingAmount,
          expectedCheckInDate
        }
      } else {
        data = {
          ownerID,
          propertyID,
          bookingDocumentID,
          bookingAmount,
          expectedCheckInDate
        }
      }
      
      try{
        const res = await api.post('/booking/booking',data)
        if(res?.status == 201){
          toast.success(res?.data?.message)
          navigate('/seeker/home')
        }
      } catch(err){
        console.log(err?.message)
        toast.success(err?.message)
      }
    }
  };

  const addBookingDocument = async(data) => {
    const formData = new FormData()
    try{
      formData.append('documentName',data?.documentName)
      formData.append('fileUrl',data?.fileUrl[0])

      const res = await api.post('/bookingDocument/bookingDocument',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if(res?.status == 201){
        toast.success(res?.data?.message)
        return res?.data?.data?._id

      } 

    } catch(err){
      console.log(err?.message)
      toast.error(err?.message)
    }
  }

  return (
    // Centered Overlay with Blur
    <div className="flex items-center justify-center">
      
      {/* Form Card */}
      <div className="bg-white w-full max-w-full p-6 rounded-b-md animate-in zoom-in duration-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Upload Document</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Select Type */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">ID Type</label>
            <select 
              {...register("documentName", { required: "Please select a document type" })}
              className="text-sm w-full border border-gray-300 p-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="AADHAR">AADHAR</option>
              <option value="PAN">PAN</option>
              <option value="PASSPORT">PASSPORT</option>
              <option value="OTHER">OTHER</option>
            </select>
            {errors.documentName && <p className="text-red-500 text-xs mt-1">{errors.documentName.message}</p>}
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Choose File</label>
            <input 
              type="file" 
              {...register("fileUrl", { required: "A file is required" })}
              className="w-full text-sm border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700"
            />
            {errors.fileUrl && <p className="text-red-500 text-xs mt-1">{errors.fileUrl.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onBack} 
              className="px-4 py-2 text-gray-500 hover:underline"
            >
              ← Back to Details
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Upload & Book
            </button>
            <button 
              type="button"
              onClick={() => {navigate(`/seeker/detail/${propertyType}/${propertyID}`)}}
              className="flex-1 py-2.5 text-white bg-gray-600 font-medium hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
