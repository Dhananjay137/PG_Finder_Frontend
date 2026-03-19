import axios from 'axios'
import { Edit, Trash, View } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const VerificationDocumentList = () => {
  const [ documents, setDocuments ] = useState([])
  const tableHeaders = ["Sr","User ID","Doc Name","Doc","Verification Status","Created At","Action"]
  
  useEffect(() => {
    getAllDocument()
  },[])
  const getAllDocument = async() => {
    try {
      const res = await axios.get('/bookingDocument/bookingDocuments')
      //console.log(res)
      if(res?.status == 200){
        toast.success(res?.data?.message)
        setDocuments(res?.data?.data)
      }

    } catch(err) {
      console.log(err)
      toast.error("error while fetching")
    }
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">Document Verification Management</h2>
      <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-gray-600 table-auto rounded-md">
        <thead className="font-semibold text-sm bg-blue-500 text-white divide-y divide-gray-200">
          <tr className="border-b-2 border-white">
            {tableHeaders.map((header) => (
              <th key={header} className="p-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {documents.map((document, i) => (
            <tr key={document._id} className={`text-center text-sm transition-all duration-300 ${i%2 == 0 ? 'bg-gray-50':'bg-white'} hover:bg-gray-100`}>
              <td className='p-2'>{i+1}</td>
              <td className='p-2'>{document.userID}</td>
              <td className='p-2'>{document.documentName}</td>
              <td className='p-2 text-white'>
                {/* {document.fileUrl} */}
                <button className='cursor-pointer transition-all duration-300 bg-gray-500 hover:bg-gray-600 p-2 rounded-md'>
                  <View size={16}/>
                </button>
              </td>
              <td className='p-2 font-bold'>{document.verificationStatus}</td>
              <td className='p-2'>{new Date(document.createdAt).toLocaleString()}</td>
              <td className='p-2 text-white space-x-1'>
                <button className="bg-red-500 hover:bg-red-600 p-2 rounded-md cursor-pointer transition-all duration-300">
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
