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

  // Check if movie is new (within the last 30 days)
  const isNew = () => {
    const releaseDate = new Date(movie.release_date || movie.first_air_date)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return releaseDate >= thirtyDaysAgo
  }

  return (
    <div className="flex flex-col">
      <div 
        className="relative h-[140px] md:h-[170px] lg:h-[190px] min-w-[280px] md:min-w-[340px] lg:min-w-[380px] 
          overflow-hidden rounded-md transition-all duration-300 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Base Card with Image */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Recently Added Badge - Flush with bottom of image */}
        {isNew() && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-[#e50914] px-3 py-1">
              <span className="text-[11px] font-medium text-white whitespace-nowrap tracking-wide">
                Recently Added
              </span>
            </div>
          </div>
        )}
        
        {/* Hover Content */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10">
            <div className="absolute bottom-0 left-0 right-0 p-3 space-y-3">
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button 
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Play"
                >
                  <Play size={18} className="text-black ml-0.5" />
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToMyList(e)
                  }}
                  className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors"
                  aria-label={isInMyList ? "Remove from My List" : "Add to My List"}
                >
                  {isInMyList ? <Minus size={18} /> : <Plus size={18} />}
                </button>

                <button 
                  className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-colors ml-auto"
                  aria-label="More Information"
                >
                  <Info size={18} />
                </button>
              </div>

              {/* Movie Info */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-semibold">
                  {movie.vote_average * 10}% Match
                </span>
                <span className="border border-gray-500 px-1.5 py-0.5">
                  {movie.adult ? '18+' : 'PG-13'}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genre_ids.slice(0, 2).map((genreId) => (
                  <span 
                    key={genreId} 
                    className="text-xs text-gray-300"
                  >
                    Genre {genreId}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Title below the card */}
      <div className="mt-2 px-1">
        <h3 className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
          {movie.title || movie.name}
        </h3>
      </div>
    </div>
  )
}