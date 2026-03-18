import React from 'react'
import { SeekerNavbar } from "../../components/seeker/SeekerNavbar"
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/utils/Footer'

export const SeekerHomePage = () => {
  return (
    // h-screen prevents the page from being taller than the window initially
    <div className='flex flex-col w-full'>
      <SeekerNavbar />

      {/* flex-1 makes this area grow to fill all space between Nav and Footer */}
      {/* overflow-y-auto allows ONLY this area to scroll if content is long */}
      <main className='flex-1 bg-gray-50 overflow-y-auto'>
        <div className='max-w-7xl mx-auto px-2 md:px-6 min-h-[calc(100vh-64px)] flex flex-col'>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}

