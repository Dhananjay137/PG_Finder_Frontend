import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, userRoles}) => {
  const [token, setToken] = useState()
  const [role, setRole] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setToken(localStorage?.getItem('token'))
    setRole(localStorage?.getItem('role'))
    setLoading(false)
  },[])

  if(loading){
    return <h1>Loading....</h1>
  }
  if(!token){
    return <Navigate to='/'/>
  }
  if(!userRoles.includes(role)){
    return <Navigate to='/'/>
  }
  return children
}
export default ProtectedRoutes
