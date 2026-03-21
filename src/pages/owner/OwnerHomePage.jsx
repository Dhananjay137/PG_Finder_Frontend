import React from 'react'
import { OwnerSidebar } from "../../components/owner/OwnerSidebar"
import { Outlet } from 'react-router-dom'

export const OwnerHomePage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <OwnerSidebar/>
      <div className='w-full flex-1 overflow-x-auto overflow-y-auto'>
        <Outlet/>
      </div>
      
    </div>
  )
}
