import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'
import { Property } from '../owner/Property';

export const Wishlist = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    getWishlist()
  },[])

  const getWishlist = async() => {
    try{
      const res = await api.get('/wishlist/wishes')
      console.log(res)
      if(res?.status == 200){
        
        setProperties(res?.data?.data)
      }

    } catch(err) {
      console.log(err?.message)
      toast.error(err?.message)
    }
  }
  return (
    <div>
      <h2 className='font-black text-2xl text-gray-700'>Wishlist</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
      {properties?.map((property, i) => { return(
        <Property key={property._id} property={property.propertyID} wishID={property._id} savedNote={property.note} />
      )})}
      </div>
    </div>
  )
}
