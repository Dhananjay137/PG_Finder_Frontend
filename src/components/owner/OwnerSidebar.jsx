import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  ChevronRight, Frame, LogOut, LayoutDashboard, 
  Info, Building2, BookCheck, ChevronDown, PlusCircle, 
  Clock, XCircle, CheckCircle2 
} from 'lucide-react'

export const OwnerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPropertyOpen, setIsPropertyOpen] = useState(false) // State for dropdown
  const { pathname } = useLocation()

  const menuItems = [
    { name: 'Dashboard', path: '/owner/dashboard', icon: <LayoutDashboard size={20} /> },
    { 
      name: 'Properties', 
      path: '/owner/properties', 
      icon: <Building2 size={20} />,
      hasSubmenu: true,
      submenu: [
        { name: 'Add Property', path: '/owner/properties/add', icon: <PlusCircle size={18} /> },
        { name: 'Pending', path: '/owner/properties/pending', icon: <Clock size={18} /> },
        { name: 'Accepted', path: '/owner/properties/accepted', icon: <CheckCircle2 size={18} /> },
        { name: 'Rejected', path: '/owner/properties/rejected', icon: <XCircle size={18} /> },
      ]
    },
    { name: 'Bookings', path: '/owner/bookings', icon: <BookCheck size={20} /> },
    { name: 'About Us', path: '/owner/aboutUs', icon: <Info size={20} /> },
  ]

  return (
    <aside className={`relative flex flex-col h-screen border-r bg-white shadow-sm transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      
      {/* Header */}
      <div className='flex items-center h-16 px-4 mb-4 border-b shrink-0 overflow-hidden'>
        <div className='flex items-center gap-3'>
          <Frame size={28} className='text-blue-600 shrink-0' />
          <span className={`font-bold text-xl text-gray-800 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            PG Finder
          </span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className='absolute -right-3 top-5 bg-white border rounded-full p-1 hover:bg-gray-50 shadow-md z-20'>
          <ChevronRight size={16} className={`text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-3 space-y-1 '>
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.path)
          
          if (item.hasSubmenu) {
            return (
              <div key={item.name} className="flex flex-col">
                <button
                  onClick={() => {
                    setIsOpen(true) // Open sidebar if it's closed
                    setIsPropertyOpen(!isPropertyOpen)
                  }}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all group
                    ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="shrink-0">{item.icon}</span>
                    <span className={`font-medium transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                      {item.name}
                    </span>
                  </div>
                  {isOpen && (
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isPropertyOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Dropdown Items */}
                <div className={`overflow-hidden transition-all duration-300 ${isPropertyOpen && isOpen ? 'max-h-60 mt-1' : 'max-h-0'}`}>
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className={`flex items-center gap-4 pl-11 pr-3 py-2 rounded-lg text-sm transition-colors
                        ${pathname === sub.path ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                    >
                      <span>{sub.icon}</span>
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              title={!isOpen ? item.name : ""}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-all group relative
                ${pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className='p-3 border-t'>
        <button className='w-full flex items-center gap-4 px-3 py-3 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors'>
          <LogOut size={20} className='shrink-0' />
          <span className={`font-medium transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Log Out</span>
        </button>
      </div>
    </aside>
  )
}
