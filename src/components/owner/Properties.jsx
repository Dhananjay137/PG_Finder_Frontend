import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Properties = () => {
  const { status } = useParams()

  useEffect(() => {
    getAllProperties()
  },[status])

  const getAllProperties = async() => {
    try{
      const res = await axios.get(`/property/properties`,{
        params: {
          ownerId:'69b3a9c5dedfbdfd03c51f89',
          status: status
        }
      })
      console.log(res)

    } catch(err){
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div>Properties: {status}</div>
  )
}
