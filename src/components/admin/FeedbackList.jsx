import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'
import { STATUS_STYLES } from '../utils/statusStyles'

export const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const tableHeaders = ['Sr.','Property','User','User Email','Rating','Comment','Created At','Status','Action']

  useEffect(() => {
    getAllFeedback()
  },[])

  const updateStatus = async(id, status) => {
    try {
      const res = await api.put(`/feedback/feedback/${id}`,{ status: status })

      if(res?.status == 200){
        toast.success('feedback is updated')
        getAllFeedback()
      }

    } catch(err) {
      //console.log(err.message)
      toast.error(err?.response?.data?.message || err.message)
    }
  }
  const getAllFeedback = async() => {
    try {
      const res = await api.get('/feedback/feedbacks')
      //console.log(res)

      if(res.status == 200){
        setFeedbacks(res?.data?.data)
      }
    } catch(err){
      //console.log(err.message)
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">Feedback Management</h2>
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
            {feedbacks.map((feedback, i) => (
            <tr key={feedback._id} className={`text-center text-sm ${i%2 == 0 ? 'bg-gray-50':'bg-white'} hover:bg-gray-100`}>
              <td className='p-2'>{i+1}</td>
              <td className="p-2">{feedback?.propertyID?.propertyName}</td>
              <td className='p-2'>
                {feedback?.userID?.firstName} {feedback?.userID?.lastName}
              </td>
              <td className="p-2">{feedback?.userID?.email}</td>
              <td className="p-2">{feedback?.rating}/5</td>
              <td className='p-2'>{feedback?.comment}</td>
              <td className="p-2">{new Date(feedback.createdAt).toLocaleString()}</td>
              <td className="p-1">
                <span className={`p-1 font-bold text-xs rounded-md ${STATUS_STYLES[feedback.status] || STATUS_STYLES.DEFAULT}`}>
                  {feedback?.status}
                </span>
              </td>
              <td className="p-2 text-white space-x-1 flex">
                <button
                  className="p-2 bg-gray-500 hover:bg-gray-700 rounded-md"
                  onClick={() => updateStatus(feedback._id, feedback.status == 'BLOCKED' ? 'OK': 'BLOCKED')}
                >
                  {feedback.status == 'BLOCKED' ? 'Unblock': 'Block'}
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
