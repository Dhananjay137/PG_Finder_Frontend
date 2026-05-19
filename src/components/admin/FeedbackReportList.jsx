import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'
import { STATUS_STYLES } from '../utils/statusStyles'

export const FeedbackReportList = () => {
  const [reports, setReports] = useState([])
  const tableHeaders = ['Sr.','Feedback ID','Report ID','Reporter','Reporter Email','reason','Created At','Status','Action']

  useEffect(() => {
    getAllFeedbackReports()
  },[])

  const updateStatus = async(id, status) => {
    try {
      const res = await api.put(`/feedbackReport/feedbackReport/${id}`,{ status: status })

      if(res?.status == 200){
        toast.success('report is updated')
        getAllFeedbackReports()
      }

    } catch(err) {
      //console.log(err.message)
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  const getAllFeedbackReports = async() => {
    try {
      const res = await api.get('/feedbackReport/feedbackReports')
      //console.log(res)

      if(res.status == 200){
        setReports(res?.data?.data)
      }
    } catch(err){
      //console.log(err.message)
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">Report Management</h2>
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
            {reports.map((report, i) => (
              <tr key={report._id} className={`text-center text-sm ${i%2 == 0 ? 'bg-gray-50':'bg-white'} hover:bg-gray-100`}>
                <td className='p-2'>{i+1}</td>
                <td className="p-2">{report?.feedbackID?._id}</td>
                <td className="p-2">{report?._id}</td>
                <td className='p-2'>
                  {report?.reporterID?.firstName} {report?.reporterID?.lastName}
                </td>
                <td className="p-2">{report?.reporterID?.email}</td>
                <td className="p-2">{report?.reason}/5</td>
                <td className="p-2">{new Date(report?.createdAt).toLocaleString()}</td>
                <td className="p-1">
                  <span className={`p-1 font-bold text-xs rounded-md ${STATUS_STYLES[report?.status] || STATUS_STYLES.DEFAULT}`}>
                    {report?.status}
                  </span>
                </td>
                <td className="p-2 text-white space-x-1 flex">
                  <button
                    className="p-2 bg-blue-500 hover:bg-blue-700 rounded-md"
                      onClick={() => updateStatus(report._id, 'RESOLVED')}
                  >
                    Resolve
                  </button>
                  <button
                    className="p-2 bg-red-500 hover:bg-red-700 rounded-md"
                    onClick={() => updateStatus(report._id, 'DISMISSED')}
                  >
                    Dismiss
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
