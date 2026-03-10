import React from 'react'
import { AdminSidebar } from "../../components/admin/AdminSidebar"
import { Outlet } from 'react-router-dom'

export const AdminHomePage = () => {
  return (
    <div className='flex'>
      <AdminSidebar/>
      <Outlet/>
    </div>
  )
}
