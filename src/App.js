import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Row from './components/Row'
import Footer from './components/Footer'
import { fetchTrending, fetchNetflixOriginals, fetchTopRated, fetchActionMovies, fetchComedyMovies } from './utils/api'

export default function App() {
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    action: [],
    comedy: []
  })

  useEffect(() => {
    const fetchMovies = async () => {
      const [trending, netflixOriginals, topRated, action, comedy] = await Promise.all([
        fetchTrending(),
        fetchNetflixOriginals(),
        fetchTopRated(),
        fetchActionMovies(),
        fetchComedyMovies()
      ])

      setMovies({
        trending,
        netflixOriginals,
        topRated,
        action,
        comedy
      })
    }

    fetchMovies()
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero movie={movies.netflixOriginals[0]} />
      <Row title="Trending Now" movies={movies.trending} />
      <Row title="Netflix Originals" movies={movies.netflixOriginals} />
      <Row title="Top Rated" movies={movies.topRated} />
      <Row title="Action Movies" movies={movies.action} />
      <Row title="Comedies" movies={movies.comedy} />
      <Footer />
    </div>
  )
}