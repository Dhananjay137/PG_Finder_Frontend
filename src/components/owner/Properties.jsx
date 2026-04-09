import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Property } from './Property'
import api from '../../api/axiosInstance'

export const Properties = () => {
  const { status } = useParams()
  const [properties, setProperties] = useState()

  useEffect(() => {
    getAllProperties()
  },[status])

  const getAllProperties = async() => {
    try{
      const res = await api.get(`/property/properties`,{
        params: {
          status: status
        }
      })
      console.log(res.data.data)
      if(res?.status == 200){
        //toast.success(res?.data?.message)
        setProperties(res?.data?.data)
      }

    } catch(err){
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    /* grid-cols-1 for mobile, md:grid-cols-2 for tablets, lg:grid-cols-3 for desktop */
<div className='p-4'>
  <h2 className='text-lg text-gray-700 font-bold mb-4 uppercase'>{status} Properties</h2>
  
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {properties?.map((property) => (
      <Property key={property._id} property={property} />
    ))}
  </div>

  {/* Optional: Empty State */}
  {properties?.length === 0 && (
    <div className="text-center py-20 text-gray-500">
      No properties found with status: {status}
    </div>
  )}
</div>

  )
}
