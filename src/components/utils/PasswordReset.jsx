import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const PasswordReset = () => {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the "password" field to compare it with "confirmPassword"
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerMessage({ type: '', text: '' });

    try {
      const res = await axios.put('https://pg-finder-backend-ejx4.onrender.com/user/password-reset',
        {
          newPassword: data.password,
          token: token
        })

      setServerMessage({ type: 'success', text: `Password reset successful! Redirecting to login...` });
      
      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setServerMessage({ type: 'error', text: 'Link expired or invalid. Please request a new one.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Set New Password</h2>
          <p className="text-slate-500 mt-2">Please enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Must include uppercase, lowercase, number, and special character"
                }
              })}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                errors.password ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500'
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match"
              })}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500'
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Status Message */}
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all disabled:opacity-70"
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};
