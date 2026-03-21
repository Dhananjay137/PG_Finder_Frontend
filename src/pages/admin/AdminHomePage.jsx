import React from 'react'
import { AdminSidebar } from "../../components/admin/AdminSidebar"
import { Outlet } from 'react-router-dom'

export const AdminHomePage = () => {
  return (
    <div className='flex h-screen overflow-hidden'>
      <AdminSidebar/>
      <div className='w-full flex-1 overflow-y-auto overflow-x-auto'>
        <Outlet/>
      </div>
    </div>
  )
}
