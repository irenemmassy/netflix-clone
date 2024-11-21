import React from 'react'
import MovieCard from './MovieCard'

export default function Row({ title, movies }) {
  return (
    <div className="px-4 space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            addToMyList={() => console.log('Add to my list:', movie.id)} 
            removeFromMyList={() => console.log('Remove from my list:', movie.id)} 
            isInMyList={false} 
          />
        ))}
      </div>
    </div>
  )
}