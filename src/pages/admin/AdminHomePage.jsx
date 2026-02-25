import React from 'react'
import { AdminSidebar } from "../../components/admin/AdminSidebar"
import { Outlet } from 'react-router-dom'

export const AdminHomePage = () => {
  return (
    <div>
      <h1>AdminHomePage</h1>
      <AdminSidebar/>
      <Outlet/>
    </div>
  )
}
