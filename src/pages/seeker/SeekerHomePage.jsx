import React from 'react'
import { SeekerNavbar } from "../../components/seeker/SeekerNavbar"
import { Outlet } from 'react-router-dom'

export const SeekerHomePage = () => {
  return (
    <div>
      <h1>SeekerHomePage</h1>
      <SeekerNavbar/>
      <Outlet/>
    </div>
  )
}
