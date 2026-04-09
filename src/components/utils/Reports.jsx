import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader2, AlertCircle } from 'lucide-react'
import api from '../../api/axiosInstance'
import ReportCard from './ReportCard'

export const Reports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReports()
  }, [])

  const getReports = async () => {
    try {
      setLoading(true)
      const res = await api.get('/feedbackReport/feedbackReports')
      
      if (res?.status === 200) {
        setReports(res?.data?.data || [])
      }
    } catch (err) {
      console.error(err.message)
      toast.error(err?.response?.data?.message || "Failed to load reports")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Your Reports</h1>
          <p className="text-gray-500">Track the status of your submitted feedback reports</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-blue-600 font-medium">Fetching reports...</p>
          </div>
        ) : reports.length > 0 ? (
          // Grid layout: 1 column on mobile, 2 on tablets, 3 on large screens
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <ReportCard key={report?._id} report={report} />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
            <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
              <AlertCircle className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No reports found</h3>
            <p className="text-gray-500">You haven't reported any feedback yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
