import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  // Destructure errors from formState
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const validationSchema = {
    emailValidator: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format"
      }
    },
    passwordValidator: {
      required: { value: true, message: "Password is required" },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8}/,
        message: 'Must contain: 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special character'
      }
    }
  }

  const submitHandler = (data) => {
    console.log(data)
    navigate("/seeker")
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='bg-white max-w-[550px] p-8 rounded-xl shadow-lg w-full max-w-2xl'>
        
        <header className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Login</h2>
          <p className='text-gray-500'>Please login to continue</p>
        </header>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

          {/* Email Field */}
          <div>
            <label className='block text-sm font-medium mb-1 text-gray-700'>Email Address</label>
            <input 
              className={`w-full border rounded-md p-2 outline-blue-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
              type="email" 
              placeholder="name@company.com"
              {...register("email", validationSchema.emailValidator)} 
            />
            {/* Show Email Error */}
            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div>
            <label className='block text-sm font-medium mb-1 text-gray-700'>Password</label>
            <input 
              className={`w-full border rounded-md p-2 outline-blue-500 transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`} 
              type="password" 
              placeholder="••••••••"
              {...register("password", validationSchema.passwordValidator)} 
            />
            {/* Show Password Error */}
            {errors.password && <span className="text-red-500 text-xs mt-1 leading-tight block">{errors.password.message}</span>}
          </div>

          <button 
            className='w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition-colors mt-4' 
            type='submit'
          >
            Login
          </button>
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signUp" 
                className="text-blue-700 font-semibold hover:text-blue-900 hover:underline transition-colors"
              >
                Sign Up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
