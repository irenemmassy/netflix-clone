import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Info, Plus, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'

export default function MovieCard({ movie, addToMyList, removeFromMyList, isInMyList }) {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const handleAddToMyList = (e) => {
    e.stopPropagation()
    if (isInMyList) {
      removeFromMyList(movie.id)
    } else {
      addToMyList(movie)
    }
  }

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div 
      className="relative w-[200px] h-[300px] overflow-hidden rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 mx-2 my-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 p-4 flex flex-col justify-between transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div>
            <h3 className="text-lg font-bold mb-2">{movie.title || movie.name}</h3>
            <p className="text-sm mb-2 line-clamp-3">{movie.overview}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {movie.genre_ids.slice(0, 3).map((genreId) => (
                <span key={genreId} className="text-xs bg-gray-700 px-2 py-1 rounded">
                  Genre {genreId}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" aria-label="Play">
                  <Play size={16} />
                </button>
                <button 
                  className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors duration-200" 
                  onClick={handleAddToMyList}
                  aria-label={isInMyList ? "Remove from My List" : "Add to My List"}
                >
                  {isInMyList ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <button className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors duration-200" aria-label="Like">
                  <ThumbsUp size={16} />
                </button>
                <button className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors duration-200" aria-label="Dislike">
                  <ThumbsDown size={16} />
                </button>
              </div>
              <button className="bg-gray-600 p-2 rounded-full hover:bg-gray-500 transition-colors duration-200" aria-label="More Information">
                <Info size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-500 font-bold">{movie.vote_average * 10}% Match</span>
              <span className="border border-gray-500 px-2 py-1 text-xs">
                {movie.adult ? '18+' : 'PG-13'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}