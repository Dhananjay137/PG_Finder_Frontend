import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, userRoles}) => {
  // const [token, setToken] = useState()
  // const [role, setRole] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    // setToken(localStorage?.getItem('token'))
    // setRole(localStorage?.getItem('role'))
    setLoading(false)
  },[])

  if(loading){
    return <h1>Loading....</h1>
  }
  if(!user?.token){
    return <Navigate to='/'/>
  }
  if(!userRoles.includes(user?.role)){
    return <Navigate to='/'/>
  }
  return children
}
export default ProtectedRoutes
