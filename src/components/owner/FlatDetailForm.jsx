import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { BadgeIndianRupee, Info, LayoutList, Settings2, Watch } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import api from '../../api/axiosInstance';

export const FlatDetailForm = () => {
  const { id } = useParams()
  const { register, handleSubmit,watch, formState: { errors }} = useForm()
  let parkingAvailable = watch('parking')

  const aminities = ["GYM","NON_VEG_ALLOWED","LIFT","INTERCOM","SWIMMING_POOL","CLUB_HOUSE","SERVANT_ROOM","PIPED_GAS","PARK","SHOPPING_CENTER","RESERVED_PARKING","POWER_BACKUP","CCTV_SECURITY","VISITOR_PARKING", "FIRE_SAFETY"]

  const submitHandler = async(data) => {
    //console.log(data)
    try {
      const res = await api.post('/flat/flat',{...data, propertyId: id})

      if(res?.status == 201){
        toast.success(res?.data?.message)
      }

    } catch(err){
      //console.log(err?.message)
      toast.error(err?.message)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center p-3 bg-gray-50'>
    <div className='w-full h-auto p-8 bg-white'>
      <h1 className='mb-4 text-2xl font-bold text-gray-700'>Add Flat Details</h1>
      <form onSubmit={handleSubmit(submitHandler)} className='space-y-5 text-gray-700 border border-gray-300 p-4 '>
        <div className='border-0 border-gray-300 rounded-md p-3 space-y-3'>

          <div className='flex space-x-1 items-center border p-2 mb-3 mt-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
              <Info size={16}/>
              <h3 className='font-medium'>Basic Details</h3>
          </div>
          <section className=' grid grid-cols-3 gap-4 border-0'>

            <div>
              <label className='block text-sm font-medium'>Apartment Type</label>
              <select {...register('apartmentType', { required: 'Apartment type is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1'>
                <option value="">Select</option>
                <option value="VILLA">Vila</option>
                <option value="HOUSE GATED SOCITY">House Gated Socity</option>
              </select>
              {errors.apartmentType && <p className='text-red-500 text-sm mt-1'>{errors.apartmentType.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>BHK</label>
              <select {...register('bhkType', { required: 'BHK is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1'>
                <option value="">Select</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="4BHK">4BHK</option>
                <option value="PENTHOUSE">Penthouse</option>
                <option value="OTHER">Other</option>
              </select>
              {errors.bhkType && <p className='text-red-500 text-sm mt-1'>{errors.bhkType.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Facing</label>
              <select {...register('facing', { required: 'Facing is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1'>
                <option value="">Select</option>
                <option value="EAST">East</option>
                <option value="WEST">West</option>
                <option value="SOUTH">South</option>
                <option value="NORTH">North</option>
                <option value="NORTHEST">Northeast</option>
                <option value="SOUTHEAST">Southeast</option>
                <option value="SOUTHWEST">Southwest</option>
                <option value="NORTHWEST">Northwest</option>
              </select>
              {errors.facing && <p className='text-red-500 text-sm mt-1'>{errors.facing.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Floor No.</label>
              <input type='number' {...register('floorNo', { required: 'Floor number is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.floorNo && <p className='text-red-500 text-sm mt-1'>{errors.floorNo.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Total Floor</label>
              <input type='number' {...register('totalFloor', { required: 'Total floor is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.totalFloor && <p className='text-red-500 text-sm mt-1'>{errors.totalFloor.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Property Age</label>
              <input type='number' {...register('propertyAge', { required: 'Property age is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.propertyAge && <p className='text-red-500 text-sm mt-1'>{errors.propertyAge.message}</p>}
            </div> 

            <div>
              <label className='block text-sm font-medium'>Total Room</label>
              <input type='number' {...register('totalRoom', { required: 'Total room is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.totalRoom && <p className='text-red-500 text-sm mt-1'>{errors.totalRoom.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium'>Bathroom Count</label>
              <input type='number' {...register('bathroomCount', { required: 'Bathroom count is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.bathroomCount && <p className='text-red-500 text-sm mt-1'>{errors.bathroomCount.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium'>Balcony Count</label>
              <input type='number' {...register('balconyCount', { required: 'Balcony count is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.balconyCount && <p className='text-red-500 text-sm mt-1'>{errors.balconyCount.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium'>Build UP area</label>
              <input type='number' {...register('buildUpArea', { required: 'Build up area is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.buildUpArea && <p className='text-red-500 text-sm mt-1'>{errors.buildUpArea.message}</p>}
            </div>
          </section>

          <div className='flex space-x-1 items-center border p-2 mb-3 mt-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
              <BadgeIndianRupee size={16}/>
              <h3 className='font-medium'>Financial Details</h3>
          </div>
          <section className='grid grid-cols-4 gap-4 border-0'>
            <div>
              <label className='block text-sm font-medium'>Expected Rent</label>
              <input type='number' {...register('expectedRent', { required: 'Expected rent is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.expectedRent && <p className='text-red-500 text-sm mt-1'>{errors.expectedRent.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Security Deposit</label>
              <input type='number' {...register('securityDeposit', { required: 'Security deposit is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.securityDeposit && <p className='text-red-500 text-sm mt-1'>{errors.securityDeposit.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Maintenance Amount</label>
              <input type='number' {...register('maintenanceAmount',{ required: 'maintenance amount is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.maintenanceAmount && <p className='text-red-500 text-sm mt-1'>{errors.maintenanceAmount.message}</p>}
            </div>
            <div className='w-full rounded-md '>
              <label className='block text-sm font-medium'>Rent Negotiable</label>
              <div className='w-full rounded-md p-2 mt-1'><input type="checkbox" {...register('rentNegotiable')} /> <span>YES</span></div>
            </div>
          </section>

          <div className='flex space-x-1 items-center border p-2 mb-3 mt-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
              <LayoutList size={16}/>
              <h3 className='font-medium'>Aminites</h3>
          </div>

          <section className='grid grid-cols-3 mb-5 border-0'>
            <div>
              <label className='block text-sm font-medium'>Parking</label>
              <div className='flex items-center space-x-2 mt-2 border-0 border-gray-300 rounded-md p-2 w-fit px-4 cursor-pointer hover:bg-gray-50'>
                <input 
                  type='checkbox' 
                  id="parking"
                  {...register('parking')} 
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="parking" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Available
                </label>
              </div>
            </div>
            {parkingAvailable && 
            <div>
              <label className='block text-sm font-medium'>Bike Parking</label>
              <div className='flex items-center space-x-2 mt-2 border-0 border-gray-300 rounded-md p-2 w-fit px-4 cursor-pointer hover:bg-gray-50'>
                <input 
                  type='checkbox' 
                  id="bike"
                  {...register('bike')} 
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="bike" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Available
                </label>
              </div>
            </div>}
            
            {parkingAvailable && 
            <div>
              <label className='block text-sm font-medium'>Car Parking</label>
              <div className='flex items-center space-x-2 mt-2 border-0 border-gray-300 rounded-md p-2 w-fit px-4 cursor-pointer hover:bg-gray-50'>
                <input 
                  type='checkbox' 
                  id="car"
                  {...register('car')} 
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="car" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Available
                </label>
              </div>
            </div>}
          </section>

          <section className='grid grid-cols-5 mb-5 gap-2 border-0'>
            {aminities.map((amenity) => {
              return <div key={amenity} className=' rounded-md flex gap-2'>
              <input type="checkbox" value={amenity} {...register(`amenities`)} />
              <label className='block text-sm font-medium'>{amenity.replaceAll('_',' ')}</label>
            </div>
            })}
          </section>

          <div className='flex space-x-1 items-center border p-2 mb-3 mt-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
              <Settings2 size={16}/>
              <h3 className='font-medium'>Preferences</h3>
          </div>

          <section className='grid grid-cols-3 mb-5 gap-4 border-0'>
            <div>
              <label className='block text-sm font-medium'>Preferred Tenant</label>
              <select {...register('preferredTenant', { required: 'Preferred tenant is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1'>
                <option value="">Select</option>
                <option value="ANYONE">Anyone</option>
                <option value="FAMILY">Family</option>
                <option value="BACHELOR">Bachelor</option>
              </select>
              {errors.preferredTenant && <p className='text-red-500 text-sm mt-1'>{errors.preferredTenant.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Furnishing</label>
              <select {...register('furnishingStatus', { required: 'Furnishing is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1'>
                <option value="">Select</option>
                <option value="FULLY">Fully Furnished</option>
                <option value="SEMI">Semi-Furnished</option>
                <option value="UNFURNISHED">Unfurnished</option>
              </select>
              {errors.furnishingStatus && <p className='text-red-500 text-sm mt-1'>{errors.furnishingStatus.message}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium'>Available From</label>
              <input type='date' {...register('availableFrom', { required: 'Available from is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.availableFrom && <p className='text-red-500 text-sm mt-1'>{errors.availableFrom.message}</p>}
            </div>
          </section>

          <section>
            <label className='block text-sm font-medium'>Description</label>
            <textarea {...register('description',{ required: 'description is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500'></textarea>
            {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>}
          </section>
        </div>

        <button type='submit' className='w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600'>SUBMIT</button>
      </form>
    </div>
    </div>
  )
}
