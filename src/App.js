import React, { useState, useEffect } from 'react'
import { auth, onAuthStateChanged } from './utils/firebase'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Row from './components/Row'
import Footer from './components/Footer'
import { fetchTrending, fetchNetflixOriginals, fetchTopRated, fetchMoviesByGenre, fetchTVShows, fetchNewAndPopular, fetchMovieTrailer } from './utils/api'

export default function App() {
  const [user, setUser] = useState(null)
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    action: [],
    comedy: [],
    tvShows: [],
    newAndPopular: []
  })
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, netflixOriginals, topRated, action, comedy, tvShows, newAndPopular] = await Promise.all([
          fetchTrending(),
          fetchNetflixOriginals(),
          fetchTopRated(),
          fetchMoviesByGenre(28), // Action movies
          fetchMoviesByGenre(35), // Comedy movies
          fetchTVShows(),
          fetchNewAndPopular()
        ])

        setMovies({
          trending,
          netflixOriginals,
          topRated,
          action,
          comedy,
          tvShows,
          newAndPopular
        })

        const randomMovie = netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
        const trailer = await fetchMovieTrailer(randomMovie.id)
        setFeaturedMovie({ ...randomMovie, trailer })
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-black text-white">Loading...</div>
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar user={user} />
      <main className="pt-16">
        {user ? (
          <>
            <Hero movie={featuredMovie} />
            <Row title="Trending Now" movies={movies.trending} />
            <Row title="Netflix Originals" movies={movies.netflixOriginals} />
            <Row title="Top Rated" movies={movies.topRated} />
            <Row title="Action Movies" movies={movies.action} />
            <Row title="Comedies" movies={movies.comedy} />
            <Row title="TV Shows" movies={movies.tvShows} />
            <Row title="New & Popular" movies={movies.newAndPopular} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
            <h1 className="text-4xl font-bold mb-4">Welcome to Netflix Clone</h1>
            <p className="text-xl mb-8">Sign in to start watching</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}