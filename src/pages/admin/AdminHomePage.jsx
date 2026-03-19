import React from 'react'
import { AdminSidebar } from "../../components/admin/AdminSidebar"
import { Outlet } from 'react-router-dom'

export const AdminHomePage = () => {
  return (
    <div className='flex flex-row'>
      <AdminSidebar/>
      <div className='w-full overflow-x-auto'>
        <Outlet/>
      </div>
    </div>
  )
}
