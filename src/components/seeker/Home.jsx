import { Search, Filter } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { Property } from '../owner/Property';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';

export const Home = () => {
  const detailsRef = useRef(null);
  
  // States
  const [city, setCity] = useState('Surat');
  const [type, setType] = useState(''); // New State for Filter
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load properties on initial mount
  useEffect(() => {
    fetchProperties(true);
  }, []);

  const fetchProperties = async (isInitial = false) => {
    setLoading(true);
    try {
      const res = await api.get(`/property/properties`, {
        params: { 
          city: city,
          type: type || undefined // Only sends 'PG' or 'FLAT' if selected
        }
      });
      
      if (res?.status === 200) {
        setProperties(res?.data?.data);
        // Only scroll if the user manually clicked search
        if (!isInitial) {
          detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!city.trim()) {
      toast.warn("Please enter a city name");
      return;
    }
    fetchProperties();
  };

  return (
    <>
      {/* Hero Section */}
      <div className='h-[80vh] flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white px-2 md:px-4'>
        <h2 className='text-4xl md:text-5xl font-extrabold mb-8 text-gray-800 text-center'>
          Find Your <span className="text-blue-600">Perfect Stay.</span>
        </h2>
        
        {/* Search & Filter Bar */}
        <div className='flex flex-col md:flex-row items-center w-full max-w-2xl bg-white border-2 border-blue-100 rounded-md md:rounded-md overflow-hidden shadow-lg focus-within:border-blue-400 transition-all'>
          {/* City Input */}
          <input 
            type="search" 
            placeholder="Search City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className='grow px-6 py-4 outline-none text-lg text-gray-700 w-full' 
          />

          {/* Type Filter Dropdown */}
          <div className="flex items-center border-t md:border-t-0 md:border-l-2 border-gray-100 px-4 py-3 bg-gray-50 md:bg-transparent w-full md:w-auto">
            <Filter size={18} className="text-gray-400 mr-2" />
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className="outline-none bg-transparent text-gray-600 font-semibold cursor-pointer w-full min-w-[100px]"
            >
              <option value="BOTH">All Types</option>
              <option value="PG">PG</option>
              <option value="FLAT">Flat</option>
            </select>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch} 
            disabled={loading}
            className='bg-blue-600 text-white p-5 hover:bg-blue-700 transition-all disabled:bg-blue-300 w-full md:w-auto flex justify-center'
          >
            <Search size={24} />
          </button>
        </div>

        <p className="mt-4 text-gray-500">
          Showing <span className="font-semibold text-blue-600">{type || 'all types'}</span> in <span className="font-semibold text-blue-600">{city || 'your area'}</span>
        </p>
      </div>

      {/* Results Section */}
      <div ref={detailsRef} className='min-h-screen bg-gray-50 px-2 py-12 md:px-16 border-t border-gray-200'>
        <div className="flex flex-col gap-2 md:flex-row justify-between items-center mb-10">
          <h3 className='text-3xl font-bold text-gray-800'>
            Available <span className="text-blue-600">Properties</span>
          </h3>
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-md text-sm font-semibold">
            {properties.length} Results Found
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {properties.map((property) => (
              <div key={property._id} className="transform hover:scale-[1.02] transition-transform duration-300">
                <Property property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <p className="text-xl text-gray-500 italic">
              No {type} found in "{city}". Try searching for another city or type!
            </p>
          </div>
        )}
      </div>
    </>
  );
};
