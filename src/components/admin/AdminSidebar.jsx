import { CircleChevronRight, Frame } from 'lucide-react'
import React, { useState } from 'react'

export const AdminSidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  return (
    <aside className='flex flex-col h-screen border shadow-md'>
      {/* logo,name & collapse */}
      <div className={`relative flex gap-2 p-4 items-center transition-all duration-300 ${isOpenSidebar ? 'w-42' : 'w-15'}`}>

        <Frame size={22}/>

        <span className={`font-bold transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpenSidebar ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
          PG Finder
        </span>

        <button 
        className='absolute -right-3 top-5 bg-white rounded-full transition-transform duration-300 hover:scale-110 shadow-sm'
        style={{ transform: isOpenSidebar ? 'rotate(180deg)' : 'rotate(0deg)' }}
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
          <CircleChevronRight size={18}/>
        </button>
        
      </div>
      {/* tabs */}
      <div></div>

      {/* log out */}
      <div></div>
    </aside>
  )
}
