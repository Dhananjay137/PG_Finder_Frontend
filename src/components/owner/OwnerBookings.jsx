import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { STATUS_STYLES } from '../utils/statusStyles'
import { FileCard } from '../utils/FileCard'
import api from '../../api/axiosInstance'

export const OwnerBookings = () => {
  const { status } = useParams()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [displayFile, setDisplayFile] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const tableHeaders = ["Sr.","Seeker Name","Document","Property Name","Room Type","Amount","Booking Date|Time","Check In Date","Status","Actions"]
  //seeker id, property id , property type

  useEffect(() => {
    getAllBooking()
  },[status])

  const handleFile = (url, name) => {
    console.log(url, name);
    setFileUrl(url);
    setFileName(name);
    setDisplayFile(!displayFile);
  };

  const viewDetailNavigate = (id, type) => {
    if(type === 'PG'){
      navigate(`/owner/detail/pg/${id}`)
    }
    if(type === 'FLAT'){
      navigate(`/owner/detail/flat/${id}`)
    }
  }
  const updateBooking = async(id, status) => {
    try {
      const res = await api.put(`/booking/booking/${id}`,{status: status})
      console.log(res)
      if(res.status == 201){
        toast.success(res?.data?.message)
        getAllBooking()
      }
    } catch(err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const getAllBooking = async() => {
    try{
      const res = await api.get('/booking/booking',{
        params: {
          ownerId: '69b3a9c5dedfbdfd03c51f89',
          status: status
        }
      })

      console.log(res)
      if(res?.status == 200){
        setBookings(res?.data?.data)
      }

    } catch(err) {
      console.log(err?.response)
      toast.error(err?.response?.data?.message)
    }
  }
  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-gray-600 font-extrabold text-2xl mb-2">Booking Management</h2>
        {displayFile && (
                <FileCard
                  fileUrl={fileUrl}
                  fileName={fileName}
                  onClose={() => setDisplayFile(false)}
                />
              )}
        <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full text-gray-600 table-auto divide-y divide-gray-200">
          <thead className="font-semibold text-sm bg-blue-500 text-white">
            <tr className="border-b-2 border-white">
              {tableHeaders.map((header) => (
                <th key={header} className="p-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {bookings.map((booking, i) => (
              <tr key={booking._id} className={`text-center text-sm ${i%2 == 0 ? 'bg-gray-50':'bg-white'} hover:bg-gray-100`}>
                <td className='p-2'>{i+1}</td>
                <td className="p-2">
                  <p>{booking.seekerID.firstName} {booking.seekerID.lastName}</p>
                </td>
                <td 
                  className='p-2 cursor-pointer'
                  onClick={() => handleFile(booking.bookingDocumentID.fileUrl,booking.bookingDocumentID.documentName)}
                >
                  {booking.bookingDocumentID.documentName}
                </td>
                {/* <td className='p-2'>{booking.ownerID}</td> */}
                <td 
                  className="p-2 cursor-pointer"
                  onClick={() => viewDetailNavigate(booking?.propertyID?._id,booking?.propertyID.propertyType)}
                >
                  {booking.propertyID.propertyName}
                </td>
                <td className="p-2">{booking.pgRoomPricingID.roomType}</td>
                <td className='p-2'>₹ {booking.bookingAmount}</td>
                <td className="p-2">{new Date(booking.bookingDate).toLocaleString()}</td>
                <td className="p-2">{new Date(booking.expectedCheckInDate).toLocaleString()}</td>
                <td className="p-1">
                  <span className={`p-1 font-bold text-xs rounded-md ${STATUS_STYLES[booking.status] || STATUS_STYLES.DEFAULT}`}>
                    {booking.status}
                  </span>
                </td>
                <td className='text-white p-1 space-x-1'>
                  <button 
                  onClick={() => updateBooking(booking._id,'CONFIRMED')}
                  className="p-2 bg-blue-500 hover:bg-blue-700 rounded-md"
                  disabled={booking.status === 'CONFIRMED' ? true: false}
                  >
                    Confirm
                  </button>
                  <button
                  onClick={() => updateBooking(booking._id,'REJECTED')}
                  className="p-2 bg-red-500 hover:bg-red-700 rounded-md"
                  disabled={booking.status === 'REJECTED' ? true: false}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    )
}
