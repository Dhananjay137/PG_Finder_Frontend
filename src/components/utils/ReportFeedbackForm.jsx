import React from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'

export const ReportFeedbackForm = () => {
  const navigate = useNavigate()
  const { feedbackID } = useParams()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: { feedback: '' }
  })

  const onSubmit = async (data) => {
    try{
      //console.log('submitting')
      const res = await api.post('/feedbackReport/feedbackReport',{...data, feedbackID: feedbackID})

      if(res?.status == 201){
        toast.success('report submitted successfully !')
        navigate(-1)
      }

    } catch(err) {
      //console.log(err.message)
      toast.error(err?.response?.data?.message || err?.message)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-50/30 p-4">
      <div className="flex flex-col gap-5 p-8 rounded-2xl bg-white shadow-xl shadow-blue-100 max-w-md w-full border border-blue-100">
        <header className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-blue-900">Report Feedback</h2>
          <p className="text-sm text-blue-500 font-medium tracking-wide uppercase">
            Feedback ID: {feedbackID}
          </p>
        </header>
    
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <textarea 
              {...register("reason", { 
                required: "Feedback description is required.",
                minLength: { value: 10, message: "Please provide a bit more detail." }
              })}
              className={`w-full p-4 border rounded-xl focus:ring-4 outline-none min-h-[140px] transition-all resize-none ${
                errors.reason 
                  ? 'border-red-400 focus:ring-red-500/10' 
                  : 'border-blue-200 focus:border-blue-500 focus:ring-blue-500/10'
              }`}
              placeholder="Tell us what happened..."
            />
            {errors.reason && (
              <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                {errors.feedback.message}
              </span>
            )}
          </div>
      
          <div className="flex items-center gap-4">
            <button 
              type="button"
              className="flex items-center justify-center gap-2 p-3 px-5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 transition-all border border-blue-200 font-semibold"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18}/>
              <span>Back</span>
            </button>
        
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all font-bold shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                'SUBMIT'
              )}
            </button>
          </div>
        </form> 
      </div>
    </div>
  )
}
