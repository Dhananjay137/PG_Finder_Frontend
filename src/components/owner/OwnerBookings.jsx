import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const OwnerBookings = () => {
  const { status } = useParams()
  useEffect(() => {
    getAllBooking()
  },[status])

  const getAllBooking = async() => {
    try{
      const req = await axios.get('/booking/booking',{
        params: {
          ownerId: '69b3a9c5dedfbdfd03c51f89',
          status: status
        }
      })
      console.log(req)

    } catch(err) {
      console.log(err?.response)
      toast.error(err?.response?.data?.message)
    }
  }
  return (
    <div>OwnerBookings: {status}</div>
  )
}
