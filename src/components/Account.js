import React, { useState } from 'react'
import { signOutUser, auth } from '../utils/firebase'
import { User } from 'lucide-react'
import { updateProfile } from "firebase/auth";

export default function Account({ user }) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [username, setUsername] = useState(user?.displayName || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSaveChanges = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: username,
        email: email
      });
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <div className="pt-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Account</h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <div className="flex items-center mb-4">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
          ) : (
            <User className="w-20 h-20 p-4 bg-gray-700 rounded-full mr-4" />
          )}
          <div>
            <h2 className="text-2xl font-semibold">{user?.displayName || 'User'}</h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
        >
          Edit Profile
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Membership & Billing</h3>
        <p className="mb-2"><strong>Plan:</strong> Premium</p>
        <p><strong>Billing cycle:</strong> Monthly</p>
      </div>
      <button
        onClick={signOutUser}
        className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600 transition duration-200"
      >
        Sign out
      </button>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-4"
              placeholder="Username"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-4"
              placeholder="Email"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}