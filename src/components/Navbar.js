import React, { useState, useEffect } from 'react'
import { Bell, Search } from 'lucide-react'
import { signInWithGoogle, signOutUser } from '../utils/firebase'

export default function Navbar({ user }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="/placeholder.svg?height=40&width=120" 
              alt="Netflix" 
              className="h-8"
            />
            {user && (
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">TV Shows</a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Movies</a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">New & Popular</a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My List</a>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <button className="text-gray-300 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Search</span>
                  <Search className="h-6 w-6" aria-hidden="true" />
                </button>
                <button className="text-gray-300 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-3">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                </button>
                <img
                  className="ml-3 h-8 w-8 rounded-full"
                  src={user.photoURL || "/placeholder.svg?height=32&width=32"}
                  alt="User profile"
                />
                <button
                  onClick={signOutUser}
                  className="ml-4 bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}