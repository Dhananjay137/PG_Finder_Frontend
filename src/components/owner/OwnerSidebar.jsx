import { 
  Frame, LayoutDashboard, LogOut, Building2, FileText, Menu, User, 
  ChevronDown, PlusCircle, Clock, CheckCircle2, XCircle 
} from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const OwnerSidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [openMenus, setOpenMenus] = useState({})
  const { pathname } = useLocation()

  const menuItems = [
    { name: 'Dashboard', path: '/owner/dashboard', icon: <LayoutDashboard size={20} /> },
    { 
      name: 'Property', 
      icon: <Building2 size={20}/>, 
      subMenu: [
        { name: 'Add', path: '/owner/add-property', icon: <PlusCircle size={16} /> },
        { name: 'Pending', path: '/owner/properties/pending', icon: <Clock size={16} /> },
        { name: 'Approved', path: '/owner/properties/approved', icon: <CheckCircle2 size={16} /> },
        { name: 'Rejected', path: '/owner/properties/rejected', icon: <XCircle size={16} /> }
      ] 
    },
    { 
      name: 'Bookings', 
      icon: <Frame size={20} />, 
      subMenu: [
        { name: 'Pending', path: '/owner/bookings/pending', icon: <Clock size={16} /> },
        { name: 'Confirmed', path: '/owner/bookings/confirmed', icon: <CheckCircle2 size={16} /> },
        { name: 'Rejected', path: '/owner/bookings/rejected', icon: <XCircle size={16} /> }
      ] 
    },
    { name: 'Feedback Report', path: '/owner/feedback-reports', icon: <FileText size={20} /> },
    { name: 'Profile', path: '/owner/profile', icon: <User size={20}/> },
  ]

  const toggleSubMenu = (name) => {
    if (!isOpen) setIsOpen(true)
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <aside className={`min-h-screen flex flex-col border-r-2 border-gray-100 space-y-1 p-3 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      {/* header */}
      <div className='flex px-3 py-3 mb-2 gap-4 items-center text-blue-600'>
        <Menu size={20} className='cursor-pointer shrink-0' onClick={() => setIsOpen(!isOpen)} />
        <span className={`text-md font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>PG FINDER</span>
      </div>

      {/* navigation */}
      <nav className='flex flex-col space-y-1 flex-1 no-scrollbar overflow-y-auto'>
        {menuItems.map((item) => {
          const hasSubMenu = !!item.subMenu
          const isExpanded = openMenus[item.name]
          const isActive = pathname === item.path

          return (
            <div key={item.name} className="flex flex-col">
              {hasSubMenu ? (
                /* Submenu Trigger */
                <div 
                  onClick={() => toggleSubMenu(item.name)}
                  title={!isOpen ? item.name : ''}
                  className={`flex text-sm w-full items-center px-3 py-3 gap-4 transition-all duration-300 rounded-md cursor-pointer text-gray-600 hover:bg-gray-100`}
                >
                  <div className='self-center shrink-0'>{item.icon}</div>
                  <div className={`flex flex-1 items-center justify-between transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                    <span className="whitespace-nowrap">{item.name}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              ) : (
                /* Regular Link */
                <Link to={item.path} title={!isOpen ? item.name : ''}>
                  <div className={`flex text-sm w-full items-center px-3 py-3 gap-4 transition-all duration-300 rounded-md ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <div className='self-center shrink-0'>{item.icon}</div>
                    <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>{item.name}</span>
                  </div>
                </Link>
              )}

              {hasSubMenu && isExpanded && isOpen && (
                <div className="flex flex-col ml-6 mt-1 space-y-1 border-l-2 border-gray-50">
                  {item.subMenu.map((sub) => (
                    <Link key={sub.name} to={sub.path}>
                      <div className={`flex items-center gap-3 px-4 py-2 text-sm transition-all rounded-md ${pathname === sub.path ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}>
                        {sub.icon}
                        <span className="whitespace-nowrap">{sub.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
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
