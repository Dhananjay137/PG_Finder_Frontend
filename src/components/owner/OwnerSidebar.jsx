import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  CircleChevronRight, Frame, LogOut, LayoutDashboard, 
  Info, User, HelpCircle, Building2, BookCheck 
} from 'lucide-react'

export const OwnerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation() // Optional: for highlighting active tab

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Properties', icon: Building2, path: '/properties' },
    { name: 'Bookings', icon: BookCheck, path: '/bookings' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'About Us', icon: Info, path: '/about' },
    { name: 'Help', icon: HelpCircle, path: '/help' },
  ]

  return (
    <aside className={`flex flex-col h-screen border-r bg-white shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      
      {/* Header: Logo & Toggle */}
      <div className='flex items-center justify-between p-4 mb-4 relative'>
        <div className='flex items-center gap-3 overflow-hidden'>
          <Frame size={28} className='text-blue-600 shrink-0' />
          <span className={`font-bold text-xl transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            PG Finder
          </span>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className='absolute -right-3 top-6 bg-white border rounded-full p-1 hover:bg-gray-50 shadow-sm z-10'
        >
          <CircleChevronRight 
            size={18} 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* Navigation Tabs */}
      <nav className='flex-1 px-3 space-y-1'>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors group
              ${pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <item.icon size={22} className='shrink-0' />
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer: Logout */}
      <div className='p-3 border-t'>
        <button className='w-full flex items-center gap-4 px-3 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors'>
          <LogOut size={22} className='shrink-0' />
          <span className={`transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
            Log Out
          </span>
        </button>
      </div>
    </aside>
  )
}
