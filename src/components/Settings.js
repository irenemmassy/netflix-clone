import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Settings({ user }) {
  const [autoplayTrailers, setAutoplayTrailers] = useState(true)
  const [language, setLanguage] = useState('en')
  const [darkMode, setDarkMode] = useState(false)
  const [settingsChanged, setSettingsChanged] = useState(false)

  const handleSettingChange = () => {
    setSettingsChanged(true)
  }

  const handleSaveChanges = () => {
    localStorage.setItem('autoplayTrailers', autoplayTrailers);
    localStorage.setItem('language', language);
    localStorage.setItem('darkMode', darkMode);
    setSettingsChanged(false);
  }

  return (
    <div className="pt-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="mb-6 flex justify-between items-center">
          <span className="text-lg">Autoplay trailers</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={autoplayTrailers}
              onChange={() => {
                setAutoplayTrailers(!autoplayTrailers)
                handleSettingChange()
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="mb-6 flex justify-between items-center">
          <span className="text-lg">Language</span>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value)
              handleSettingChange()
            }}
            className="bg-gray-700 text-white px-3 py-2 rounded"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div className="mb-6 flex justify-between items-center">
          <span className="text-lg">Dark Mode</span>
          <button
            onClick={() => {
              setDarkMode(!darkMode)
              handleSettingChange()
            }}
            className="bg-gray-700 p-2 rounded-full"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
        {settingsChanged && (
          <button
            onClick={handleSaveChanges}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 mt-4"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  )
}