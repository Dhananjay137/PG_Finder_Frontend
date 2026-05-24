import React, { useEffect, useState, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { 
  BookmarkCheck, ChevronDown, Dock, Heart, HelpCircle, 
  House, Info, LogOut, Menu, MessageSquare, 
  MessageSquareWarning, User, X 
} from 'lucide-react'
import { useLogout } from '../../hooks/useLogout'
import api from '../../api/axiosInstance'

export const SeekerNavbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [pendingFeedbacks, setPendingFeedbacks] = useState([]) // Stores { bookingId, propertyId }
  const [hasFeedbackPending, setHasFeedbackPending] = useState(false)

  const profileRef = useRef(null)
  const logOut = useLogout()

  // 1. Initial Load & Outside Click Handler
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
    
    fetchBookingNotifications()

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 2. Optimized Notification Logic
  const fetchBookingNotifications = async () => {
    try {
      const res = await api.get('/booking/booking')
      if (res?.status === 200) {
        const bookings = res?.data?.data || []
        const twoDaysInMs = 2 * 24 * 60 * 60 * 1000
        const now = new Date().getTime()

        // 1. Filter bookings that meet the "2-day post check-in" criteria
        const pendingData = bookings
          .filter(booking => {
            if (['PENDING','REJECTED','CANCELLED'].includes(booking?.status) || booking?.isFeedbackGiven) return false
            const checkIn = new Date(booking?.expectedCheckInDate).getTime()
            return now >= (checkIn + twoDaysInMs)
          })
          // 2. Map to a clean object containing both IDs
          .map(booking => ({
            bookingID: booking._id,
            propertyID: booking.propertyID?._id
          }))
          console.log(pendingData)

        setPendingFeedbacks(pendingData)
        setHasFeedbackPending(pendingData.length > 0)
      }
    } catch (err) {
      console.error("Notification Error:", err)
    }
  }

  const navTabs = [
    { name: 'Home', path: '/seeker/home', icon: <House size={18} /> },
    { name: 'About Us', path: '/seeker/aboutUs', icon: <Info size={18} /> },
    { name: 'Wishlist', path: '/seeker/wishlist', icon: <Heart size={18} /> },
    { name: 'Bookings', path: '/seeker/bookings', icon: <BookmarkCheck size={18} /> },
    { name: 'Help', path: '/seeker/help', icon: <HelpCircle size={18} /> }
  ]

  const profileTabs = [
    { name: 'Profile', path: '/seeker/profile', icon: <User size={16} /> },
    { name: 'Booking Doc', path: '/seeker/bookingDoc', icon: <Dock size={16} /> },
    { name: 'Report', path: '/seeker/reports', icon: <MessageSquareWarning size={16} /> },
    { 
      name: 'Feedback',
      path: '/seeker/feedback',
      icon: <MessageSquare size={16} />,
      hasBadge: hasFeedbackPending,
      state: { pendingFeedbacks: pendingFeedbacks }
    },
  ]

  // Shared class logic for NavLinks
  const getNavLinkClass = ({ isActive }) => 
    `text-sm font-medium transition-all duration-300 underline underline-offset-[6px] decoration-2 ${
      isActive ? 'text-blue-600 decoration-blue-500' : 'text-gray-600 decoration-transparent hover:decoration-gray-300'
    }`

  return (
    <header className='border-b border-gray-200 sticky top-0 z-50 shadow-sm bg-white'>
      <nav className='flex items-center justify-between mx-auto max-w-7xl px-4 h-16' aria-label="Main Navigation">
        
        {/* Logo */}
        <Link to="/seeker/home" className='flex items-center text-lg font-bold text-blue-600'>
          PG Finder
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center space-x-8'>
          {navTabs.map((tab) => (
            <NavLink key={tab.path} to={tab.path} className={getNavLinkClass}>
              {tab.name}
            </NavLink>
          ))}

          {/* Profile Dropdown */}
          <div className='relative' ref={profileRef}>
            <button 
              className='flex items-center gap-2 bg-gray-50 p-1 pr-2 rounded-full hover:bg-gray-100 transition-colors'
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold relative'>
                {user?.firstName?.at(0).toUpperCase() || '@'}
                {hasFeedbackPending && (
                  <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-red-500 border-2 border-white rounded-full" title="Pending Feedback" />
                )}
              </div>
              <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className='absolute right-0 mt-2 z-50 shadow-xl bg-white border border-gray-100 p-2 rounded-lg w-52 animate-in fade-in zoom-in duration-200'>
                {profileTabs.map((tab) => (
                  <Link 
                    key={tab.path} 
                    to={tab.path}
                    state={tab.state}
                    onClick={() => setIsProfileOpen(false)}
                    className='flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors'
                  >
                    <div className='flex items-center gap-3'>
                      <span className="text-gray-400 group-hover:text-blue-600" aria-hidden="true">{tab.icon}</span>
                    {tab.name}
                    </div>
                    
                    {tab.hasBadge && (
                      <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </Link>
                ))}
                <div className='mt-2 pt-2 border-t border-gray-100'>
                  <button 
                    onClick={logOut}
                    className='flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium'
                  >
                    <LogOut size={16} aria-hidden="true" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden'>
          <button 
            className='p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 p-4 space-y-4 animate-in slide-in-from-top duration-300'>
          <div className='grid grid-cols-2 gap-3'>
            {navTabs.map((tab) => (
              <NavLink 
                key={tab.path} 
                to={tab.path} 
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) => 
                  `flex flex-col items-center gap-2 p-4 rounded-xl transition-all text-xs font-bold uppercase tracking-wider ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {tab.icon}
                {tab.name}
              </NavLink>
            ))}
          </div>
          
          <div className='bg-gray-50 rounded-xl overflow-hidden'>
            <p className='px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Account</p>
            {profileTabs.map((tab) => (
              <Link 
                key={tab.path} 
                to={tab.path}
                state={tab.state}
                onClick={() => setIsMobileOpen(false)}
                className='flex items-center justify-between gap-4 px-6 py-3 text-sm text-gray-700 border-b border-white hover:bg-blue-50'
              >
                <span className='flex items-center gap-4'>{tab.icon} {tab.name}</span>
                
                {tab.hasBadge && (
                  <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </Link>
            ))}
            <button 
              onClick={logOut}
              className='flex items-center gap-4 px-6 py-4 text-sm text-red-600 w-full hover:bg-red-50 transition-colors font-semibold'
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
