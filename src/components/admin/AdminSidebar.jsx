import { CircleChevronRight, Frame, Users, LayoutDashboard, Settings, LogOut, Building2, MessageCircle, FileText, Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Property', path: '/admin/properties', icon: <Building2 size={20}/>},
    { name: 'Bookings', path: '/admin/bookings', icon: <Frame size={20} /> },
    { name: 'Doc Verification', path: '/admin/document-verification', icon: <CircleChevronRight size={20} /> },
    { name: 'Feedback', path: '/admin/feedbacks', icon: <MessageCircle size={20} /> },
    { name: 'Feedback Report', path: '/admin/feedback-reports', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ]

  return (
    <aside className={`min-h-screen flex flex-col border-r-2 border-gray-100 space-y-1 p-3 transition-all duration-300 ${isOpen? 'w-64':'w-20'}`}>
      {/* header */}
      <div className='flex px-3 py-3 mb-2 gap-4 items-center text-blue-600'>
        <Menu size={20} className='cursor-pointer shrink-0' onClick={() => {setIsOpen(!isOpen)}}/>
        <span className={`text-md font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen? 'opacity-100':'opacity-0 w-0 overflow-hidden'}`}>PG FINDER</span>
      </div>

      {/* navigation */}
      <nav className='flex flex-col space-y-1 flex-1 no-scrollbar'>
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return(
            <Link key={item.name} to={item.path} title={!isOpen? item.name :''}>
              <div className={`flex text-sm w-full items-center px-3 py-3 gap-4 transition-all duration-300 rounded-md ${isActive? 'text-blue-600 bg-blue-50':'text-gray-600 hover:bg-gray-100'}`}>
                <div className='self-center'>{item.icon}</div>
                <span className={`whitespace-nowrap ${isOpen? 'opacity-100':'opacity-0 w-0 overflow-hidden'}`}>{item.name}</span>
              </div>
            </Link>
          )})}
      </nav>

      {/* footer */}
      <div className='border-t'>
        <button className='flex w-full items-center px-3 py-3 gap-4 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors'>
          <LogOut size={20} className='shrink-0' />
          <span className={`font-medium text-sm transition-all duration-300 whitespace-nowrap ${!isOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Log Out
          </span>
        </button>
      </div>
    </aside>
  )
}
