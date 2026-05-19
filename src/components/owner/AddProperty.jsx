import { Calendar, Info } from 'lucide-react'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../../api/axiosInstance'

export const AddProperty = () => {
  const { register, handleSubmit,control, formState: { errors }} = useForm({
    defaultValues: {
      gallery: [{ fileUrl: "", mediaType: "PHOTO", label: "" }]
    }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'gallery'})

  const validationSchema = {
    contactValidator: {
      required: {
        value: true,
        message: 'Contact is required'
      },
      minLength: {
        value: 10,
        message: 'Contact must be at least 10 digits'
      },
      maxLength: {
        value: 10,
        message: 'Contact must be at most 10 digits'
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Contact must be a number'
      }
    },
    emailValidator: {
      required: {
        value: true,
        message: 'Email is required'
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Email is not valid'
      }
    }
  }

  const submitHandler = async (data) => {
  const formData = new FormData();

  // 1. Append text fields & nested objects as Strings
  formData.append('ownerId','69b3a9c5dedfbdfd03c51f89')
  formData.append('propertyName', data.propertyName);
  formData.append('propertyType', data.propertyType);
  formData.append('houseNo', data.houseNo);
  formData.append('landmarkStreet', data.landmark);
  formData.append('city', data.city);
  formData.append('address',data.address)
  formData.append('propertyContact', data.contact);
  formData.append('propertyEmail', data.email);
  
  // Stringify the nested object for easy parsing on backend
  formData.append('visitSchedule', JSON.stringify(data.visitSchedule));

  // 2. Append Gallery Files and Metadata
  data.gallery.forEach((item, index) => {
    // Append the actual file from the FileList
    if (item.fileUrl && item.fileUrl[0]) {
      formData.append('images', item.fileUrl[0]); 
    }
    // Append corresponding metadata (label/type)
    formData.append(`gallery`, JSON.stringify({mediaType: item.mediaType,label: item.label }));
  });

  try {
    // IMPORTANT: Use multipart/form-data for files
    //console.log(Object.fromEntries(formData))
    const res = await api.post('/property/property', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (res.status === 201) {
      toast.success(res?.data?.message);
    }
  } catch (err) {
    //console.error(err);
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className='min-h-screen flex items-center justify-center p-3 bg-gray-50'>
    <div className='w-full h-auto p-8 bg-white'>
      <h1 className='mb-4 text-2xl font-bold text-gray-700'>Add Property</h1>
      <form onSubmit={handleSubmit(submitHandler)} className='space-y-5 text-gray-700 border border-gray-300 p-4 '>

        {/* form-1 */}
        <div className='border-0 border-gray-300 rounded-md p-3 space-y-3'>
          <div className='flex space-x-1 items-center border p-2 mb-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
            <Info size={16}/>
            <h3 className='font-medium'>Basic Details</h3>
          </div>
          
          {/* name & type */}
          <div className=' grid grid-cols-2 gap-4 border-0'>
            {/* property name */}
            <div className=''>
              <label className='block text-sm font-medium'>Property Name</label>
              <input type='text' {...register('propertyName', { required: 'Property Name is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.propertyName && <p className='text-xs text-red-500'>{errors.propertyName.message}</p>}
            </div>
            {/* property type */}
            <div className=''>
              <label className='block text-sm font-medium'>Type</label>
              <div className='w-full rounded-md p-2 mt-1 space-x-4'>
                <label className='space-x-1'>
                  <input type='radio' value='PG' {...register('propertyType', { required: 'Property Type is required' })} />
                  <span>PG</span>
                </label>
                <label className='space-x-1'>
                  <input type='radio' value='FLAT' {...register('propertyType', { required: 'Property Type is required' })} />
                  <span>FLAT</span>
                </label>
              </div>
              
              {errors.propertyType && <p className='text-xs text-red-500'>{errors.propertyType.message}</p>}
            </div>          
          </div>

          {/* address */}
          <div className='border-0 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium'>House/Bulding No.</label>
              <input type="text" {...register('houseNo', { })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
            </div>
            {/* landmark */}
            <div>
              <label className='block text-sm font-medium'>Landmark</label>
              <input type='text' {...register('landmark', { required: 'Landmark is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500'/>
              {errors.landmark && <p className='text-xs text-red-500'>{errors.landmark.message}</p>}
            </div>
            {/* city */}
            <div>
              <label className='block text-sm font-medium'>City</label>
              <input type='text' {...register('city', { required: 'City is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.city && <p className='text-xs text-red-500'>{errors.city.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium'>Address</label>
              <textarea {...register('address', {required: 'address is required'})} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' ></textarea>
              {errors?.address && <p className='text-xs text-red-500'>{errors?.address.message}</p>}
            </div>
          </div>

          {/* contact & email */}
          <div className='border-0 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium'>Contact</label>
              <input type='text' {...register('contact', validationSchema.contactValidator)} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.contact && <p className='text-xs text-red-500'>{errors.contact.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium'>Email</label>
              <input type='text' {...register('email', validationSchema.emailValidator)} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
            </div>
          </div>
        </div>
        
        {/* form-2 */}
        <div className="border-0 border-gray-300 rounded-md p-3 space-y-3">
          <div className='flex space-x-1 items-center border p-2 mb-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
            <Info size={16}/>
            <h3 className='font-medium'>Basic Details</h3>
          </div>
          <div className="flex flex-row-reverse items-center">
            <button 
              type="button" 
              onClick={() => append({ fileUrl: "", mediaType: "PHOTO", label: "" })}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              + Add More
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className='p-3 grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-200 rounded-md relative'>
              {/* File Input */}
                <div>
                  <label className='block text-sm font-medium'>File</label>
                  <input 
                    type="file" 
                    {...register(`gallery.${index}.fileUrl`, { required: 'File required' })} 
                    className='border border-gray-300 w-full rounded-md p-2 mt-1' 
                  />
                  {errors.gallery?.[index]?.fileUrl && <p className='text-xs text-red-500'>{errors.gallery[index].fileUrl.message}</p>}
                </div>

                {/* Media Type */}
                <div>
                  <label className='block text-sm font-medium'>Type</label>
                  <select 
                    {...register(`gallery.${index}.mediaType`, { required: true })} 
                    className='border border-gray-300 w-full rounded-md p-2 mt-1'
                  >
                    <option value="PHOTO">PHOTO</option>
                    <option value="VIDEO">VIDEO</option>
                  </select>
                </div>

                {/* Label */}
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className='block text-sm font-medium'>Label</label>
                    <input 
                      type="text" 
                      {...register(`gallery.${index}.label`, { required: 'Label required' })} 
                      className='border border-gray-300 w-full rounded-md p-2 mt-1' 
                    />
                  </div>
        
                  {/* Remove Button (don't show if only one row) */}
                  {fields.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => remove(index)}
                      className="bg-red-100 text-red-600 p-2.5 rounded-md hover:bg-red-200"
                    >
                      🗑️
                    </button>
                  )}
                </div>
            </div>
          ))}
        </div>

        {/* form-3 */}
        <div className='border-0 border-gray-200 rounded-md p-3 space-y-3'>
          <div className='flex space-x-1 items-center border p-2 mb-5 border-gray-300 rounded-md bg-gray-200 text-gray-700'>
            <Calendar size={16}/>
            <h3 className='font-medium'>Schedule</h3>
          </div>
          {/* schedule */}
          <div>
            <label className='block text-sm font-medium'>Visit</label>
            <div className='w-full rounded-md p-2 mt-1 space-x-4'>
              <label className='space-x-1'>
                <input type="radio" value='EVERYDAY' {...register('visitSchedule.dayType', { required: 'required'})} />
                <span>EVERYDAY</span>
              </label>
              <label className='space-x-1'>
                <input type="radio" value='WEEKDAYS' {...register('visitSchedule.dayType', { required: 'required'})} />
                <span>WEEKDAYS</span>
              </label>
              <label className='space-x-1'>
                <input type="radio" value='WEEKENDS' {...register('visitSchedule.dayType', { required: 'required'})} />
                <span>WEEKENDS</span>
              </label>
              {errors.visitSchedule && <p className='text-xs text-red-500'>{errors.visitSchedule.message}</p>}
            </div>
          </div>

          {/* time */}
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium'>Start Time</label>
              <input type="time" {...register('visitSchedule.startTime', { required: 'time is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500'/>
              {errors.startTime && <p className='text-xs text-red-500'>{errors.startTime.message}</p>}
            </div>
            
            <div>
              <label className='block text-sm font-medium'>End Time</label>
              <input type="time" {...register('visitSchedule.endTime', { required: 'time is required' })} className='border border-gray-300 w-full rounded-md p-2 mt-1 outline-blue-500' />
              {errors.startTime && <p className='text-xs text-red-500'>{errors.startTime.message}</p>}
            </div>
            <div className='w-full rounded-md '>
              <label className='block text-sm font-medium'>Avilable</label>
              <div className='w-full rounded-md p-2 mt-1'><input type="checkbox" {...register('visitSchedule.allDayAccess')} /> <span>24 / 7</span></div>
              
            </div>
          </div>
        </div>

        <button type='submit' className='w-full p-3 bg-blue-500 text-white rounded-md'>SUBMIT</button>
      </form>
    </div>
    </div>
  )
}
