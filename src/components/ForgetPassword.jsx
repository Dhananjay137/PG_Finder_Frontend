import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const ForgetPassword = () => {
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerMessage({ type: '', text: '' });

    try {
      // data.email contains the input value
      //console.log("Sending request to backend for:", data.email);
      
      const res = await axios.post('http://localhost:3000/user/password-forget',{ email: data.email})
      //console.log(res)

      setServerMessage({
        type: 'success',
        text: res?.data?.message,
      });
    } catch (error) {
      setServerMessage({
        type: 'error',
        text: 'Failed to send reset link. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Forgot Password?</h2>
          <p className="text-slate-500 mt-2">Enter your email to receive a reset link.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              // Register input with validation rules
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                errors.email 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
            />
            {/* Validation Error Message */}
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Backend Response Message */}
          {serverMessage.text && (
            <div className={`p-3 rounded-lg text-sm font-medium ${
              serverMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {serverMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm font-medium text-blue-600 hover:underline">
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};
