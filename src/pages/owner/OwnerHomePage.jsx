import React from 'react'
import { OwnerSidebar } from "../../components/owner/OwnerSidebar"
import { Outlet } from 'react-router-dom'

export const OwnerHomePage = () => {
  return (
    <div>
      <h1>OwnerHomePage</h1>
      <OwnerSidebar/>
      <Outlet/>
    </div>
  )
}
