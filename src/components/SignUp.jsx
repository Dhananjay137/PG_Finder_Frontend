import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SignUp = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const validationSchema = {
    nameValidator: { 
      required: { value:true, message:"name is required"},
      minLength: { value: 3, message: "Name must be at least 3 characters" }
    },
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
    },
    contactValidator: {
      required: {value:true, message:"contact is required"},
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Must be exactly 10 digits"
      }
    },
    roleValidator: { required:{value:true, message: "role is required"}},
    lookingForPartnerValidator: { required:{value:true, message:"atleast one option is required"}}
  }

  const submitHandler = async (data) => {
    // console.log(data);
    // navigate("/")
    
    try {
      const res = await axios.post("/user/register",data)
      console.log(res)
      if(res.status == 201){
        toast.success(res.data.message)
        //console.log('register user: ',res.data.data)
        navigate("/")
      }


    } catch(err) {
      //console.log(err.response)
      toast.error(err.response.data.message)

    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create an Account</h2>
        
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Name Section - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input {...register("firstName", validationSchema.nameValidator)} className="w-full border rounded-md p-2 mt-1" />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input {...register("middleName", validationSchema.nameValidator)} className="w-full border rounded-md p-2 mt-1" />
              {errors.middleName && <p className="text-red-500 text-xs">{errors.middleName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input {...register("lastName", validationSchema.nameValidator)} className="w-full border rounded-md p-2 mt-1" />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" {...register("email", validationSchema.emailValidator)} className="w-full border rounded-md p-2 mt-1" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input type="tel" {...register("contact", validationSchema.contactValidator)} className="w-full border rounded-md p-2 mt-1" />
              {errors.contact && <p className="text-red-500 text-xs">{errors.contact.message}</p>}
            </div>
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Role</label>
            <select {...register("role", validationSchema.roleValidator)} className="w-full border rounded-md p-2 mt-1 bg-white">
              <option value="seeker">Seeker</option>
              <option value="owner">Owner</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
          </div>

          {/* Radio Buttons: Looking for Partner */}
          <div className="py-2">
            <span className="block text-sm font-medium text-gray-700 mb-2">Looking for Partner?</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="yes" {...register("lookingForPartner", validationSchema.lookingForPartnerValidator)} className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="no" {...register("lookingForPartner" ,validationSchema.lookingForPartnerValidator)} className="w-4 h-4 text-blue-600" />
                <span className="text-sm">No</span>
              </label>
              {errors.lookingForPartner && <p className="text-red-500 text-xs">{errors.lookingForPartner.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" {...register("password", validationSchema.passwordValidator)} className="w-full border rounded-md p-2 mt-1" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors" 
                to="/"
              >
                Sign Up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
