import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Star, Send, CheckCircle, MessageSquare } from 'lucide-react'
import api from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const FeedbackForm = ({ bookingID, propertyID }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      rating: 0,
      comment: ''
    }
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await api.post(`/feedback/feedback/${bookingID}`, {
        propertyID: propertyID,
        rating: data.rating,
        comment: data.comment
      })

      if (response.status === 200 || response.status === 201) {
        setIsSubmitted(true)
        toast.success('Feedback submitted successfully !')
        navigate(-1)
      }
    } catch (err) {
      //console.error("Feedback error:", err)
      alert("Failed to submit feedback for this booking.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 p-6 rounded-xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
        <CheckCircle className="text-green-600" size={32} />
        <div>
          <h3 className="font-bold text-green-800">Feedback Submitted!</h3>
          <p className="text-sm text-green-700">Thank you for reviewing booking #{bookingID.slice(-6)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Small Header for ID */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Booking ID: {bookingID}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        
        {/* Star Rating Section */}
        <div className="flex flex-col items-center gap-3">
          <label className="text-sm font-semibold text-gray-600">Rate your experience</label>
          <Controller
            name="rating"
            control={control}
            rules={{ required: "Please select a rating", min: 1 }}
            render={({ field: { onChange, value } }) => (
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    className="transform transition-transform active:scale-90"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                      } transition-colors duration-150`}
                    />
                  </button>
                ))}
              </div>
            )}
          />
          {errors.rating && <p className="text-red-500 text-xs font-medium">{errors.rating.message}</p>}
        </div>

        {/* Comment Section */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <MessageSquare size={16} /> Your Review
          </label>
          <Controller
            name="comment"
            control={control}
            rules={{ 
              required: "Comment is required",
              minLength: { value: 10, message: "Tell us a bit more (min 10 chars)" }
            }}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="How was the stay? Cleanliness, amenities, food..."
                className={`w-full p-4 bg-gray-50 border rounded-xl outline-none transition-all resize-none h-28 text-sm ${
                  errors.comment ? 'border-red-300 focus:ring-red-50' : 'border-gray-200 focus:ring-4 focus:ring-blue-50'
                }`}
              />
            )}
          />
          {errors.comment && <p className="text-red-500 text-xs font-medium">{errors.comment.message}</p>}
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isSubmitting 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? "Submitting..." : <><Send size={18} /> Submit Review</>}
        </button>
      </form>
    </div>
  )
}
