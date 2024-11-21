import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, ChevronDown, User } from 'lucide-react'
import { signInWithGoogle, signOutUser } from '../utils/firebase'
import NotificationsDropdown from './NotificationsDropdown'
import ProfileDropdown from './ProfileDropdown'
import SearchBar from './SearchBar'

export default function Navbar({ user, setFilter, movieGenres, tvGenres, setSelectedGenre }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMovieGenres, setShowMovieGenres] = useState(false)
  const [showTVGenres, setShowTVGenres] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleGenreSelect = (genre, type) => {
    setSelectedGenre(genre)
    setFilter(type)
    setShowMovieGenres(false)
    setShowTVGenres(false)
  }

  const handleHomeClick = () => {
    setFilter('all')
    setSelectedGenre(null)
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleHomeClick}>
              <img 
                src="/placeholder.svg?height=40&width=120" 
                alt="Netflix" 
                className="h-8"
              />
            </Link>
            {user && (
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <button onClick={handleHomeClick} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</button>
                  <div className="relative">
                    <button 
                      onClick={() => setShowTVGenres(!showTVGenres)} 
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      TV Shows
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {showTVGenres && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {tvGenres.map((genre) => (
                            <button
                              key={genre.id}
                              onClick={() => handleGenreSelect(genre, 'tvShows')}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
                              role="menuitem"
                            >
                              {genre.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setShowMovieGenres(!showMovieGenres)} 
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      Movies
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {showMovieGenres && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {movieGenres.map((genre) => (
                            <button
                              key={genre.id}
                              onClick={() => handleGenreSelect(genre, 'movies')}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
                              role="menuitem"
                            >
                              {genre.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <Link to="/new-and-popular" onClick={() => setFilter('latest')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">New & Popular</Link>
                  <Link to="/my-list" onClick={() => setFilter('myList')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My List</Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <button 
                  onClick={() => setShowSearch(!showSearch)}
                  className="text-gray-300 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Search</span>
                  <Search className="h-6 w-6" aria-hidden="true" />
                </button>
                {showSearch && <SearchBar />}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="text-gray-300 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-3"
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {showNotifications && <NotificationsDropdown />}
                </div>
                <div className="relative ml-3">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    {user.photoURL ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.photoURL}
                        alt="User profile"
                      />
                    ) : (
                      <User className="h-8 w-8 p-1 rounded-full bg-gray-700" />
                    )}
                  </button>
                  {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} />}
                </div>
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