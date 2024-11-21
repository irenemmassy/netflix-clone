import React from 'react'
import { Link } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'

export default function ProfileDropdown({ onClose }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg overflow-hidden z-50">
      <div className="py-1">
        <Link to="/account" onClick={onClose} className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
          Account
        </Link>
        <Link to="/settings" onClick={onClose} className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
          Settings
        </Link>
        <Link to="/kids" onClick={onClose} className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
          Kids
        </Link>
        <button
          onClick={() => {
            signOutUser()
            onClose()
          }}
          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}