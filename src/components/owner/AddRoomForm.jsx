import axios from 'axios'
import { Info, LayoutList } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'

export const AddRoomForm = () => {
  const { id } = useParams()
  const { register, handleSubmit,watch, formState: { errors }} = useForm()

  const amenities = ["TELEVISION", "AC_HEATING", "SINGLE_BED", "MATTRESS_PILLOW", "BLANKET", "TABLE_CHAIR", "SIDE_TABLE", "CUPBOARD", "HOT_WATER"]

  const submitHandler = async(data) => {
    try {
      console.log(data)
      const res = await api.post(`/pg/pg/room`,{...data, propertyId: id})
      
      if(res?.status == 201) {
        toast.success(res?.data?.message)
      }

    } catch(err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center p-3 bg-gray-50'>
    <div className='w-full h-auto p-8 bg-white'>
      <h1 className='mb-4 text-2xl font-bold text-gray-700'>Add Room: {id}</h1>
      <form onSubmit={handleSubmit(submitHandler)} className='space-y-5 text-gray-700 border border-gray-300 p-4 '>
        <div className='border-0 border-gray-300 rounded-md p-3 space-y-3'>

          <div className='flex space-x-1 items-center border p-2 mb-3 mt-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
            <Info size={16}/>
            <h3 className='font-medium'>Basic Details</h3>
          </div>
          <section className=' grid grid-cols-3 gap-4 border-0'>
            <div>
              <label className='block text-sm font-medium'>Room Type</label>
              <select {...register('roomType', { required: 'Room type is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1'>
                <option value="">Select</option>
                <option value="SINGLE">Single</option>
                <option value="DOUBLE">Double</option>
                <option value="TRIPLE">Triple</option>
                <option value="FOUR SHARING">Four Sharing</option>
                <option value="OTHER">Other</option>
              </select>
              {errors.roomType && <p className='text-red-500 text-sm mt-1'>{errors.roomType.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Total Beds</label>
              <input type='number' {...register('totalBeds', { required: 'Monthly Rent is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.totalBeds && <p className='text-red-500 text-sm mt-1'>{errors.totalBeds.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Available Beds</label>
              <input type='number' {...register('availableBeds', { required: 'Monthly Rent is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.availableBeds && <p className='text-red-500 text-sm mt-1'>{errors.availableBeds.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Monthly Rent</label>
              <input type='number' {...register('monthlyRent', { required: 'Monthly Rent is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.monthlyRent && <p className='text-red-500 text-sm mt-1'>{errors.monthlyRent.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Deposit Amount</label>
              <input type='number' {...register('securityDeposit', { required: 'Monthly Rent is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.securityDeposit && <p className='text-red-500 text-sm mt-1'>{errors.securityDeposit.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Available From</label>
              <input type='date' {...register('availableFrom', { required: 'Notice Period is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.availableFrom && <p className='text-red-500 text-sm mt-1'>{errors.availableFrom.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>is Available</label>
              <input type='checkbox' {...register('isAvailable', { required: 'Notice Period is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
            </div>
          </section>

          <div className='flex space-x-1 items-center border p-2 mb-3 mt-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
            <LayoutList size={16}/>
            <h3 className='font-medium'>Amenities </h3>
          </div>
          <section className='grid grid-cols-5 mb-5 gap-2 border-0'>
            {amenities.map((amenity) => {
              return <div key={amenity} className=' rounded-md flex gap-2'>
              <input type="checkbox" value={amenity} {...register(`amenities`)} />
              <label className='block text-sm font-medium'>{amenity.replaceAll('_',' ')}</label>
            </div>
            })}
          </section>
        </div>

        <button type='submit' className='w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600'>SUBMIT</button>
      </form>
    </div>
    </div>
  )
}
