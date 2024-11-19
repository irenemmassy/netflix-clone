import React from 'react'
import MovieCard from './MovieCard'

export default function Row({ title, movies = [] }) {
  return (
    <div className="px-8 space-y-0.5 md:space-y-2">
      <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
      <div className="relative group">
        <div className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}