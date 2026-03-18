import { Search } from 'lucide-react'
import React from 'react'

export const Home = () => {
  return (
    // flex-1 here tells the Home content to expand and center itself 
    // within the space provided by the parent
    <div className='flex-1 flex flex-col justify-center items-center'>
      <h2 className='text-3xl font-bold mb-6 text-gray-700'>Find Your Desired Place</h2>
      
      <div className='flex items-center w-full max-w-md bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-blue-500 transition-all'>
        <input 
          type="search" 
          placeholder="Search locations..."
          className='grow px-4 py-2 outline-none' 
        />
        <button className='bg-blue-600 text-white p-3'>
          <Search size={18} />
        </button>
      </div>
    </div>
  )
}

