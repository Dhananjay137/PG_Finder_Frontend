import { BookmarkCheck, Heart, HelpCircle, icons, Info, LogOut, MessageSquare, MessageSquareWarning, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const SeekerNavbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // const dekstopProfileTags = ['Details','Update','Reports','Feedback','Log Out']
  const profileTabs = [
    {name:'Details',path:'/seeker/profile',icon:<User size={16}/>},
    {name:'Update',path:'/seeker/profile',icon:<User size={16}/>},
    {name:'Report',path:'/seeker/reports',icon:<MessageSquareWarning size={16}/>},
    {name:'Feedback',path:'/seeker/feedback',icon:<MessageSquare size={16}/>},
  ]
  // const navTabs = ['About Us','Wishlist','Bookings','Help']
  const navTabs = [
    {name:'About Us',path:'/seeker/aboutUs',icon:<Info size={18}/>},
    {name:'Wishlist',path:'/seeker/wishlist',icon:<Heart size={18}/>},
    {name:'Bookings',path:'/seeker/bookings',icon:<BookmarkCheck size={18}/>},
    {name:'Help',path:'/seeker/help',icon:<HelpCircle size={18}/>}
  ]

  return (
    <nav className='border-b border-gray-200 z-50 shadow-sm'>
      {/* desktop */}
      <div className='flex flex-row justify-between mx-3 my-2'>

        {/* logo */}
        <div className='flex items-center text-md'>
          <h2 className='font-bold text-blue-600'>PG Finder</h2>
        </div>

        {/* navigation link */}
        <div className='hidden md:flex flex-row items-center space-x-8 text-sm'>

          {navTabs.map((tab, index) => { return(
            <Link className='underline decoration-transparent underline-offset-[6px] decoration-2 hover:decoration-blue-500 transition-all duration-300 font-medium' to={tab.path} key={index}>{tab.name}</Link>
          )})}

          {/* profile - details, update profile, my reports, my feedback, logout */}
          <div className='relative'>
            <button className='flex item-center' onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-medium'>
              P
              </div>
            </button>

            {isProfileOpen && <div className='absolute right-0 z-50 shadow-sm bg-white border border-gray-200 p-3 rounded-sm w-48'>
              {profileTabs.map((tag, index) => { return(
                <Link to={tag.path} key={index} className='flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors gap-4 px-6 py-3 mb-2'>
                  <span>{tag.icon}</span>
                  {tag.name}
                </Link>
              )})}
              <div className='text-gray-700 bg-gray-100 px-6 py-3 rounded-sm transition-all duration-200 cursor-pointer text-center hover:text-red-700 hover:bg-red-100 border border-transparent hover:border-red-200'>
                <button>Log Out</button>
              </div>
            </div>}

          </div>
        </div> 
          
        <div className='md:hidden'>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)}>=</button>
        </div>
      </div>

      {/* mobile */}
      {isMobileOpen && <div className='md:hidden flex flex-col'>
        <div className='grid grid-cols-2 gap-4 m-2'>
          {navTabs.map((tab, index) => { return(
          <Link to={tab.path} key={index} className='flex flex-col items-center gap-2 p-4 bg-gray-50 text-gray-700 hover:bg-blue-50 active:text-blue-700 transition-all text-sm'>
            {tab.icon}
            <span className='text-xs font-semibold tracking-wider'>{tab.name}</span>
          </Link>
        )})}
        </div>

        <div className='m-2 bg-gray-50'>
          <Link to='/seeker/profile' className='flex items-center gap-4 px-6 py-3 text-sm' onClick={() => setIsProfileOpen(!isProfileOpen)}><User size={16}/>Profile</Link>
          <div className='flex flex-col ml-8 border-l-2 border-gray-200'>
            {isProfileOpen && profileTabs.map((tab) => { return(
              <Link className='flex items-center gap-4 px-6 py-3 text-sm' to={tab.path}>
                <span className='opacity-60'>{tab.icon}</span>
                {tab.name}
              </Link>
            )})}
          </div>
        </div>

        <div className='m-2 bg-gray-50 active:bg-red-50 active:text-red-700 transition-all duration-200'>
          <Link to='#' className='flex items-center gap-4 px-6 py-3 text-sm w-auto'><LogOut size={16}/>Log Out</Link>
        </div>

      </div>}
      
    </nav>
  )
}
