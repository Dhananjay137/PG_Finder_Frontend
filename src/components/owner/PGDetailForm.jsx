import { Info, LayoutList } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'

export const PGDetailForm = () => {
  const { id } = useParams()
  const { register, handleSubmit,watch, formState: { errors }} = useForm()
  const isFoodIncluded = watch('foodIncluded')

  const amenities = ["LAUNDRY", "RO_WATER", "ROOM_CLEANING", "KITCHEN_ACCESS", "POWER_BACKUP", "LIFT", "WIFI", "WATER_COOLER", "FRIDGE", "MICROWAVE", "FIRST_AID", "WARDEN", "SECURITY_GUARD", "CCTV", "GYM"]
  const submitHandler = async(data) => {
    try{
      const res = await api.post('/pg/pg',{...data, propertyId: id})

      if(res?.status == 201){
        toast.success(res?.data?.message)
      }

    } catch(err){
      //console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center p-3 bg-gray-50'>
    <div className='w-full h-auto p-8 bg-white'>
      <h1 className='mb-4 text-2xl font-bold text-gray-700'>Add PG Details</h1>
      <form onSubmit={handleSubmit(submitHandler)} className='space-y-5 text-gray-700 border border-gray-300 p-4 '>
        <div className='border-0 border-gray-300 rounded-md p-3 space-y-3'>

          <div className='flex space-x-1 items-center border p-2 mb-3 mt-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
            <Info size={16} />
            <h3 className='font-medium'>Basic Details</h3>
          </div>
          <section>
            <label className='block text-sm font-medium'>Description</label>
            <textarea {...register('description',{ required: 'description is required '})} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500'></textarea>
            {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>}
          </section>
          <section className=' grid grid-cols-3 gap-4 border-0'>

            <div>
              <label className='block text-sm font-medium'>Available For</label>
              <select {...register('availableFor', { required: 'Available For is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1'>
                <option value="">Select</option>
                <option value="BOYS">Boys</option>
                <option value="GIRLS">Girls</option>
                <option value="CO-LIVING">Co-living</option>
              </select>
              {errors.availableFor && <p className='text-red-500 text-sm mt-1'>{errors.availableFor.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Preferred Guest</label>
              <select {...register('preferredGuest', { required: 'preferred guest is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1'>
                <option value="">Select</option>
                <option value="STUDENT">Student</option>
                <option value="WORKING">Working</option>
                <option value="BOTH">Both</option>
              </select>
              {errors.preferredGuest && <p className='text-red-500 text-sm mt-1'>{errors.preferredGuest.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Gate Closing Time</label>
              <input type='time' {...register('gateClosingTime', { required: 'Gate Closing Time is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.gateClosingTime && <p className='text-red-500 text-sm mt-1'>{errors.gateClosingTime.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Notice Period</label>
              <input type='number' {...register('noticePeriodDays', { required: 'Notice Period is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.noticePeriodDays && <p className='text-red-500 text-sm mt-1'>{errors.noticePeriodDays.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Rent Lock In Month</label>
              <input type='number' {...register('rentLockInMonth', { required: 'Rent Lock In Month is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.rentLockInMonth && <p className='text-red-500 text-sm mt-1'>{errors.rentLockInMonth.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>no guardian stay</label>
              <div className='flex items-center space-x-2 mt-2 border-0 border-gray-300 rounded-md p-2 w-fit px-4 cursor-pointer hover:bg-gray-50'>
                <input 
                  type='checkbox' 
                  id="noGuardianStay"
                  {...register('noGuardianStay')} 
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>
          </section>

          <section className=' grid grid-cols-4 gap-4 border-0'>
            <div>
              <label className='block text-sm font-medium'>Food Included</label>
              <div className='flex items-center space-x-2 mt-2 border-0 border-gray-300 rounded-md p-2 w-fit px-4 cursor-pointer hover:bg-gray-50'>
                <input 
                  type='checkbox' 
                  id="foodIncluded"
                  {...register('foodIncluded')} 
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>
            {isFoodIncluded && <div>
              <label className='block text-sm font-medium'>Breakfast</label>
              <div className='flex items-center space-x-2 mt-2 border-0 border-gray-300 rounded-md p-2 w-fit px-4 cursor-pointer hover:bg-gray-50'>
                <input 
                  type='checkbox' 
                  id="breakfast"
                  {...register('breakfast')} 
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>}
            
            {isFoodIncluded && <div>
              <label className='block text-sm font-medium'>Lunch</label>
              <div className='flex items-center space-x-2 mt-2 border-0 border-gray-300 rounded-md p-2 w-fit px-4 cursor-pointer hover:bg-gray-50'>
                <input 
                  type='checkbox' 
                  id="lunch"
                  {...register('lunch')} 
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>}
            
            {isFoodIncluded && <div>
              <label className='block text-sm font-medium'>Dinner</label>
              <div className='flex items-center space-x-2 mt-2 border-0 border-gray-300 rounded-md p-2 w-fit px-4 cursor-pointer hover:bg-gray-50'>
                <input 
                  type='checkbox' 
                  id="dinner"
                  {...register('dinner')} 
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>}
            
          </section>

          <div className='flex space-x-1 items-center border p-2 mb-3 mt-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
            <LayoutList size={16}/>
            <h3 className='font-medium'>Aminites </h3>
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
