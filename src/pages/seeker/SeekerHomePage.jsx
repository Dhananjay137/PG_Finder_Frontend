import React from 'react'
import { SeekerNavbar } from "../../components/seeker/SeekerNavbar"
import { Outlet } from 'react-router-dom'

export const SeekerHomePage = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <SeekerNavbar/>
      <Outlet/>
    </div>
  )
}
