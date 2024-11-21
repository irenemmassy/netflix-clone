import React, { useState, useEffect } from 'react'
import { fetchNewAndPopular } from '../utils/api'
import MovieCard from './MovieCard'

export default function NewAndPopular() {
  const [category, setCategory] = useState('trending')
  const [content, setContent] = useState([])

  useEffect(() => {
    const fetchContent = async () => {
      const data = await fetchNewAndPopular(category)
      setContent(data)
    }
    fetchContent()
  }, [category])

  return (
    <div className="pt-16 px-4">
      <h1 className="text-3xl font-bold mb-4">New & Popular</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setCategory('trending')}
          className={`px-4 py-2 rounded ${category === 'trending' ? 'bg-red-600' : 'bg-gray-800'}`}
        >
          Trending
        </button>
        <button
          onClick={() => setCategory('this_week')}
          className={`px-4 py-2 rounded ${category === 'this_week' ? 'bg-red-600' : 'bg-gray-800'}`}
        >
          This Week
        </button>
        <button
          onClick={() => setCategory('coming_soon')}
          className={`px-4 py-2 rounded ${category === 'coming_soon' ? 'bg-red-600' : 'bg-gray-800'}`}
        >
          Coming Soon
        </button>
      </div>
      <div className="flex overflow-x-scroll space-x-4 pb-4">
        {content.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  )
}