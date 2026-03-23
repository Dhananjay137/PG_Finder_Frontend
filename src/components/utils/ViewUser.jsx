import React, { useState } from 'react'
import { toast } from 'react-toastify'

export const ViewUser = () => {
  const [user, setUser] = useState(null)
  const getUser = async() => {
    try{

    } catch(err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div>ViewUser</div>
  )
}
