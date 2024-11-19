import React from 'react'

export default function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <img 
        src={imageUrl}
        alt={movie.title || movie.name}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  )
}