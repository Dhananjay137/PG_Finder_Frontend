import React from 'react'
import { AdminSidebar } from "../../components/admin/AdminSidebar"
import { Outlet } from 'react-router-dom'

export const AdminHomePage = () => {
  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='m-3 border-2 w-full'>
        <Outlet/>
      </div>
    </div>
  )
}
