import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FeedbackForm } from './FeedbackForm'
import { FeedbackCard } from '../utils/FeedbackCard'
import { MessageSquare, ArrowLeft, Clock, AlertCircle } from 'lucide-react'
import api from '../../api/axiosInstance'

export const Feedbacks = () => {
  const location = useLocation()
  const [existingFeedbacks, setExistingFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Retrieve pending feedbacks passed via Link state from Navbar
  const pendingFeedbacks = location.state?.pendingFeedbacks || []

  useEffect(() => {
    fetchMyFeedbacks()
  }, [])

  const fetchMyFeedbacks = async () => {
    try {
      const res = await api.get('/feedback/feedbacks')
      if (res.status === 200) {
        setExistingFeedbacks(res.data.data)
      }
    } catch (err) {
      console.error("Error fetching feedback history:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
              <MessageSquare size={22} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Feedback Center</h1>
          </div>
          <Link to="/seeker/home" className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Back
          </Link>
        </div>

        {/* SECTION 1: ACTION REQUIRED (Pending Forms) */}
        {pendingFeedbacks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="animate-pulse" />
              Action Required ({pendingFeedbacks.length})
            </h2>
            <div className="space-y-6">
              {pendingFeedbacks.map((item) => (
                <FeedbackForm 
                  key={item.bookingID} 
                  bookingID={item.bookingID} 
                  propertyID={item.propertyID} 
                />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: FEEDBACK HISTORY (Cards) */}
        <div className="mt-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Clock size={16} />
            Your Review History
          </h2>
          
          {loading ? (
            <div className="flex flex-col items-center py-10 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-400">Loading your history...</p>
            </div>
          ) : existingFeedbacks.length > 0 ? (
            <div className="space-y-4">
              {existingFeedbacks.map((fb) => (
                <FeedbackCard key={fb._id} feedback={fb} />
              ))}
            </div>
          ) : (
            <div className="bg-white py-16 rounded-2xl border border-dashed border-gray-200 text-center">
              <MessageSquare size={40} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm font-medium">You haven't shared any reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
