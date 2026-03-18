import React from 'react'

export const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-gray-200 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} PG Finder. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  )
}
