import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UpdateProfileForm = ({user, token, setIsEditing}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 1. Initialize useForm
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // 2. Pre-fill form with existing data
  useEffect(() => {
    //const user = JSON.parse(localStorage.getItem('user'));
    // console.log('---->',user)
    // console.log(token)
    if (user) {
      setValue('firstName', user.firstName);
      setValue('middleName',user.middleName)
      setValue('lastName', user.lastName);
      setValue('contact', user.contact);
      setValue('lookingForPartner', user.lookingForPartner);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    
    // Append fields to FormData
    formData.append('firstName', data.firstName);
    formData.append('middleName', data.middleName || '');
    formData.append('lastName', data.lastName);
    formData.append('contact', data.contact);
    formData.append('lookingForPartner', data.lookingForPartner);
    
    if (data.profilePhoto?.[0]) {
      formData.append('profilePic', data.profilePhoto[0]);
    }

    try {
      const res = await axios.put(`http://localhost:3000/user/user/${user._id}`, formData, {
        headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
        }
      });
      //console.log(res)
      if(res.status == 200){
        toast.success('Profile Updated!')
        const updatedUser = {
          token: res?.data?.token,
          role: res?.data?.role,
          firstName: res?.data?.firstName,
          lastName: res?.data?.lastName
        }

        localStorage.setItem('user',JSON.stringify(updatedUser))
        setIsEditing(false)
      }
      
    } catch (err) {
      toast.error('Update failed')
      //console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>

        {/* Profile Photo */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-600">Profile Photo</label>
          <input 
            type="file" 
            {...register("profilePhoto")} 
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" 
          />
        </div>

        {/* Name Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First Name */}
          <div>
            <label className="text-sm font-bold text-gray-600">First Name</label>
            <input 
              {...register("firstName", { required: "First name is required", minLength: { value: 2, message: "Too short" } })} 
              className={`w-full p-2 border rounded-md mt-1 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Middle Name */}
          <div>
            <label className="text-sm font-bold text-gray-600">Middle Name</label>
            <input 
              {...register("middleName")} 
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-bold text-gray-600">Last Name</label>
            <input 
              {...register("lastName", { required: "Last name is required" })} 
              className={`w-full p-2 border rounded-md mt-1 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-sm font-bold text-gray-600">Phone Number</label>
          <input 
            {...register("contact", { 
              required: "Phone number is required", 
              pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" } 
            })} 
            className={`w-full p-2 border rounded-md mt-1 ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
        </div>

        {/* Looking for Partner */}
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <input 
            type="checkbox" 
            id="lookingForPartner" 
            {...register("lookingForPartner")} 
            className="h-5 w-5 text-blue-600 rounded"
          />
          <label htmlFor="lookingForPartner" className="text-sm font-semibold text-blue-900 cursor-pointer">
            Looking for a Partner?
          </label>
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-all disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};
