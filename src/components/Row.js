import React, { useRef, useState } from 'react'
import MovieCard from './MovieCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Row({ title, movies }) {
  const rowRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="space-y-0.5 md:space-y-2 px-4 lg:px-16 relative group">
      <h2 className="text-sm md:text-2xl font-semibold cursor-pointer hover:text-gray-300">
        {title}
      </h2>

      {/* Scroll Buttons */}
      <div className="group relative md:-ml-2">
        <ChevronLeft 
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 
            cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 
            ${!isScrolled && 'hidden'}`}
          onClick={() => handleScroll('left')}
        />

        {/* Movies Row */}
        <div 
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
          onScroll={(e) => setIsScrolled(e.target.scrollLeft > 0)}
        >
          {movies.map((movie) => (
            <div className="flex-none w-[280px] md:w-[340px] lg:w-[380px]">
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                addToMyList={() => console.log('Add to my list:', movie.id)} 
                removeFromMyList={() => console.log('Remove from my list:', movie.id)} 
                isInMyList={false} 
              />
            </div>
          ))}
        </div>

        <ChevronRight 
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 
            cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleScroll('right')}
        />
      </div>
    </div>
  )
}