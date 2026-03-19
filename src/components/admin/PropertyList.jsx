import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Delete, Edit, Trash } from 'lucide-react'

export const PropertyList = () => {

  const tableHeaders = ["Sr.","Name","City","Gallery","House No","Owner ID","Contact","Email","Type","Status","Verified","Created At","Action"];
  const [properties, setProperties] = useState([])

  useEffect(() => {
    getAllPropertyies()
  },[])
  const handleDelete = async(id) => {
    try {
      const res = await axios.delete(`/property/property/${id}`)
      console.log(res?.data?.data)
      if(res.status == 200){
        toast.success(res?.data?.message)
        getAllPropertyies()
      }
    } catch(err) {
      console.log(err?.response)
      toast.error("error while deleting data")
    }
  }
  const getAllPropertyies = async() => {
    try {
      const res = await axios.get('/property/properties')
      //console.log(res?.data?.data)
      if(res.status == 200){
        toast.success(res?.data?.message)
        setProperties(res?.data?.data)
      }
    } catch(err) {
      console.log(err?.response)
      toast.error("error while fetching data")
    }
  }
  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">Property Management</h2>
      <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-gray-600 table-auto rounded-md">
        <thead className="text-sm font-semibold bg-blue-500 text-white divide-y divide-gray-200">
          <tr className="border-b-2 border-white">
            {tableHeaders.map((header) => (
              <th key={header} className="p-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {properties.map((property, i) => (
            <tr key={property._id} className={`text-center text-sm transition-all duration-300 ${i%2 == 0 ? 'bg-gray-50':'bg-white'} hover:bg-gray-100`}>
              <td className='p-2'>{i+1}</td>
              <td className="p-2">{property.propertyName}</td>
              <td className="p-2">{property.city}</td>
              <td className="p-2">{property.gallery?.length || 0} images</td>
              <td className="p-2">{property.houseNo}</td>
              <td className="p-2">{property.ownerId}</td>
              <td className="p-2">{property.propertyContact}</td>
              <td className="p-2">{property.propertyEmail}</td>
              <td className="p-2">{property.propertyType}</td>
              <td className="p-2 font-bold">{property.status}</td>
              <td className="p-2">{property.isVerified ? 'Yes' : 'No'}</td>
              <td className="p-2">{new Date(property.createdAt).toLocaleDateString()}</td>
              <td className='p-2 text-white space-x-1 flex'>
                <button className="bg-red-500 hover:bg-red-600 p-2 rounded-md cursor-pointer transition-all duration-300" onClick={ () => handleDelete(property._id)}>
                  <Trash size={16}/>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md cursor-pointer transition-all duration-300">
                  <Edit size={16}/>
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
