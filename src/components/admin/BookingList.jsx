import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { STATUS_STYLES } from '../utils/statusStyles'
import api from '../../api/axiosInstance'

export const BookingList = () => {
  const [bookings, setBookings] = useState([])
  const tableHeaders = ["Sr.","Seeker ID","Owner ID","Property ID","PG Room ID","Amount","Booking Date|Time","Check In Date","Status"]
  
  useEffect(() => {
    getAllBooking()
  },[])
  const getAllBooking = async() => {
    try{
      const res = await api.get('/booking/bookings')
      if(res?.status == 200){
        // toast.success(res?.data?.message)
        setBookings(res?.data?.data)
      }
      //console.log(res)

    } catch(err) {
      //console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">Booking Management</h2>
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
              <td className="p-2">{booking.seekerID}</td>
              <td className='p-2'>{booking.ownerID}</td>
              <td className="p-2">{booking.propertyID}</td>
              <td className="p-2">{booking.pgRoomPricingID}</td>
              <td className='p-2'>₹ {booking.bookingAmount}</td>
              <td className="p-2">{new Date(booking.bookingDate).toLocaleString()}</td>
              <td className="p-2">{new Date(booking.expectedCheckInDate).toLocaleString()}</td>
              <td className="p-1">
                <span className={`p-1 font-bold text-xs rounded-md ${STATUS_STYLES[booking.status] || STATUS_STYLES.DEFAULT}`}>
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  )
}
