import React from 'react'
import { useForm } from 'react-hook-form'

export const AddProperty = () => {
  const { register, handleSubmit, formState: { errors }} = useForm()

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
  const submitHandler = (data) => {
    console.log(data)
  }
  return (
    <div>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit(submitHandler)}>

        {/* property name */}
        <div>
          <label>Property Name</label>
          <input type='text' {...register('propertyName', { required: 'Property Name is required' })} />
          {errors.propertyName && <p>{errors.propertyName.message}</p>}
        </div>

        {/* property type */}
        <div>
          <label>Property Type</label>
          <input type='radio' value='PG' {...register('propertyType', { required: 'Property Type is required' })} /> PG
          <input type='radio' value='Flat' {...register('propertyType', { required: 'Property Type is required' })} /> Flat
          {errors.propertyType && <p>{errors.propertyType.message}</p>}
        </div>

        {/* landmark */}
        <div>
          <label>Landmark</label>
          <input type='text' {...register('landmark', { required: 'Landmark is required' })} />
          {errors.landmark && <p>{errors.landmark.message}</p>}
        </div>

        {/* city */}
        <div>
          <label>City</label>
          <input type='text' {...register('city', { required: 'City is required' })} />
          {errors.city && <p>{errors.city.message}</p>}
        </div>

        <div>
          <label>Location</label>
          <input type='text' {...register('location', { required: 'Location is required' })} />
          {errors.location && <p>{errors.location.message}</p>}
        </div>
        <div>
          <label>Contact</label>
          <input type='text' {...register('contact', validationSchema.contactValidator)} />
          {errors.contact && <p>{errors.contact.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type='text' {...register('email', validationSchema.emailValidator)} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div><label>Status</label></div>
        <div><label></label></div>
      </form>
    </div>
  )
}
