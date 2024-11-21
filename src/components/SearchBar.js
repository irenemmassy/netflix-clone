import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { searchMovies } from '../utils/api'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        searchMovies(query).then(setResults)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
        <Search className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Titles, people, genres"
          className="bg-transparent text-white px-3 py-2 w-64 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
      </div>
      {showResults && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-gray-800 rounded-md shadow-lg max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div key={result.id} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              <p className="text-white">{result.title || result.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}