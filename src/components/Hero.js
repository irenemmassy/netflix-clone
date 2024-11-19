import React, { useRef, useEffect } from 'react'
import { Play, Info, VolumeX, Volume2 } from 'lucide-react'

export default function Hero({ movie }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = React.useState(true)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted
    }
  }, [muted])

  if (!movie) return null

  const backdropPath = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  return (
    <header className="relative h-[80vh]">
      {movie.trailer ? (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={`https://www.youtube.com/watch?v=${movie.trailer.key}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => setMuted(!muted)}
              className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{backgroundImage: `url(${backdropPath})`}}
        ></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
      <div className="absolute bottom-0 left-0 p-8 space-y-4 max-w-xl">
        <h1 className="text-5xl font-bold">{movie.title || movie.name}</h1>
        <p className="text-lg">{movie.overview}</p>
        <div className="space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded flex items-center">
            <Play className="mr-2" size={20} />
            Play
          </button>
          <button className="bg-gray-500 bg-opacity-50 text-white px-6 py-2 rounded flex items-center">
            <Info className="mr-2" size={20} />
            More Info
          </button>
        </div>
      </div>
    </header>
  )
}