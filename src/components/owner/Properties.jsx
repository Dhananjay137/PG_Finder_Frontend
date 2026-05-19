import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Property } from './Property'
import api from '../../api/axiosInstance'

export const Properties = () => {
  const { status } = useParams()
  
  // Initialize properties as an empty array to prevent mapping crashes
  const [properties, setProperties] = useState([])
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit] = useState(6) // Set to 6 since grids look best in multiples of 2 or 3

  // Reset to page 1 whenever the category/status route parameter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [status])

  // Fetch new data when the active page or status updates
  useEffect(() => {
    getAllProperties()
  }, [status, currentPage])

  const getAllProperties = async () => {
    try {
      const res = await api.get(`/property/properties`, {
        params: {
          status: status,
          page: currentPage,
          limit: limit
        }
      })
      
      if (res?.status === 200) {
        setProperties(res?.data?.data || [])
        setTotalPages(res?.data?.totalPages || 1)
      }
    } catch (err) {
      //console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <h2 className='text-lg text-gray-700 font-bold mb-4 uppercase'>{status} Properties</h2>
      
      {/* Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {properties.map((property) => (
          <Property key={property._id} property={property} />
        ))}
      </div>

      {/* Empty State */}
      {properties.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No properties found with status: {status}
        </div>
      )}

      {/* Pagination Controls — Only display if data exists */}
      {properties.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-200 gap-4">
          <span className="text-sm text-gray-600">
            Showing page <span className="font-semibold text-gray-800">{currentPage}</span> of <span className="font-semibold text-gray-800">{totalPages}</span>
          </span>
          
          <div className="inline-flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
