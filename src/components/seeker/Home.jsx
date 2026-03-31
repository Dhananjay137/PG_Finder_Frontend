import { Search } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Property } from '../owner/Property';
import { toast } from 'react-toastify';
import axios from 'axios';
import api from '../../api/axiosInstance';

export const Home = () => {
  // 1. Create the reference
  const detailsRef = useRef(null);
  const [city, setCity] = useState('')
  const [properties, setProperties] = useState([])

  // 2. Function to handle the scroll
  const handleSearch = async() => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    try{
      const res = await api.get(`/property/properties`,{
        params: {
          city: city,
          // status: 'APPROVED'
        }
      })
      console.log(res)
      if(res?.status == 200){
        setProperties(res?.data?.data)
      }

    } catch(err){
      console.log(err)
      toast.error(err?.message)
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className='h-screen flex flex-col justify-center items-center bg-gray-50'>
        <h2 className='text-3xl font-bold mb-6 text-gray-700'>Find Your Desired Place</h2>
        
        <div className='flex items-center w-full max-w-md bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm'>
          <input 
            type="search" 
            placeholder="Search by City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='grow px-4 py-2 outline-none' 
          />
          {/* 3. Attach click handler to the button */}
          <button 
            onClick={handleSearch} 
            className='bg-blue-600 text-white p-3 hover:bg-blue-700 transition-colors'
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* 4. Attach the ref to the target section */}
      <div ref={detailsRef} className='min-h-screen p-0 md:p-10 border-t border-gray-200'>
        <h3 className='text-2xl font-bold text-gray-700 mt-12'>Property Details</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
           {properties?.map((property) => { return(
            <Property key={property._id} property={property}/>
           )})}
        </div>
      </div>
    </>
  );
};
