import React, { useRef, useEffect, useState } from 'react'
import { Play, Info, VolumeX, Volume2 } from 'lucide-react'

export default function Hero({ movie }) {
  const [muted, setMuted] = useState(true)
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    if (movie && movie.trailer) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        const newPlayer = new window.YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: movie.trailer.key,
          playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            loop: 1,
            modestbranding: 1,
            playlist: movie.trailer.key
          },
          events: {
            onReady: (event) => {
              setPlayer(event.target)
            },
          },
        })
      }
    }

    return () => {
      if (player) {
        player.destroy()
      }
    }
  }, [movie])

  useEffect(() => {
    if (player) {
      muted ? player.mute() : player.unMute()
    }
  }, [muted, player])

  if (!movie) return null

  const backdropPath = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  return (
    <header className="relative h-[80vh]">
      {movie.trailer ? (
        <div className="absolute inset-0 overflow-hidden">
          <div id="youtube-player" className="w-full h-full"></div>
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