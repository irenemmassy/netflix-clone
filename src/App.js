import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { auth, onAuthStateChanged } from './utils/firebase'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Row from './components/Row'
import Footer from './components/Footer'
import Kids from './components/Kids'
import MyList from './components/MyList'
import LoadingSpinner from './components/LoadingSpinner'
import Account from './components/Account'
import Settings from './components/Settings'
import NewAndPopular from './components/NewAndPopular'

import { 
  fetchTrending, 
  fetchNetflixOriginals, 
  fetchTopRated, 
  fetchMovieGenres, 
  fetchTVGenres, 
  fetchMoviesByGenre, 
  fetchTVShowsByGenre, 
  fetchNewAndPopular, 
  fetchMovieTrailer 
} from './utils/api'

export default function App() {
  const [user, setUser] = useState(null)
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    newAndPopular: [],
    moviesByGenre: [],
    tvShowsByGenre: []
  })
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [movieGenres, setMovieGenres] = useState([])
  const [tvGenres, setTVGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [myList, setMyList] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [trending, netflixOriginals, topRated, movieGenres, tvGenres, newAndPopular] = await Promise.all([
          fetchTrending(),
          fetchNetflixOriginals(),
          fetchTopRated(),
          fetchMovieGenres(),
          fetchTVGenres(),
          fetchNewAndPopular()
        ])

        setMovies({
          trending,
          netflixOriginals,
          topRated,
          newAndPopular,
          moviesByGenre: [],
          tvShowsByGenre: []
        })

        setMovieGenres(movieGenres)
        setTVGenres(tvGenres)

        const randomMovie = netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
        const trailer = await fetchMovieTrailer(randomMovie.id)
        setFeaturedMovie({ ...randomMovie, trailer })
      } catch (error) {
        console.error("Error fetching initial data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  useEffect(() => {
    const fetchFilteredContent = async () => {
      if (selectedGenre) {
        try {
          setLoading(true)
          const filteredContent = filter === 'movies' 
            ? await fetchMoviesByGenre(selectedGenre.id)
            : await fetchTVShowsByGenre(selectedGenre.id)
          
          setMovies(prevMovies => ({
            ...prevMovies,
            [filter === 'movies' ? 'moviesByGenre' : 'tvShowsByGenre']: filteredContent
          }))
        } catch (error) {
          console.error("Error fetching filtered content:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchFilteredContent()
  }, [filter, selectedGenre])

  const filteredContent = () => {
    if (selectedGenre) {
      return [
        { title: `${filter === 'movies' ? 'Movies' : 'TV Shows'} - ${selectedGenre.name}`, content: movies[filter === 'movies' ? 'moviesByGenre' : 'tvShowsByGenre'] || [] }
      ]
    }

    switch (filter) {
      case 'movies':
        return [
          { title: "Trending Movies", content: movies.trending.filter(item => item.media_type === 'movie') },
          { title: "Top Rated Movies", content: movies.topRated },
        ]
      case 'tvShows':
        return [
          { title: "Trending TV Shows", content: movies.trending.filter(item => item.media_type === 'tv') },
          { title: "Netflix Originals", content: movies.netflixOriginals },
        ]
      case 'latest':
        return [
          { title: "New & Popular", content: movies.newAndPopular },
        ]
      default:
        return [
          { title: "Trending Now", content: movies.trending },
          { title: "Netflix Originals", content: movies.netflixOriginals },
          { title: "Top Rated", content: movies.topRated },
          { title: "New & Popular", content: movies.newAndPopular },
        ]
    }
  }

  const addToMyList = (movie) => {
    setMyList((prevList) => [...prevList, movie])
  }

  const removeFromMyList = (movieId) => {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId))
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Navbar 
          user={user} 
          setFilter={setFilter} 
          movieGenres={movieGenres} 
          tvGenres={tvGenres} 
          setSelectedGenre={setSelectedGenre}
        />
        <Routes>
          <Route path="/" element={
            <main className="pt-16">
              {user ? (
                <>
                  <Hero movie={featuredMovie} />
                  {filteredContent().map((row, index) => (
                    <Row 
                      key={index} 
                      title={row.title} 
                      movies={row.content} 
                      addToMyList={addToMyList}
                      removeFromMyList={removeFromMyList}
                      myList={myList}
                    />
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
                  <h1 className="text-4xl font-bold mb-4">Welcome to Netflix Clone</h1>
                  <p className="text-xl mb-8">Sign in to start watching</p>
                </div>
              )}
            </main>
          } />
          <Route path="/kids" element={<Kids />} />
          <Route path="/my-list" element={<MyList myList={myList} removeFromMyList={removeFromMyList} />} />
          <Route path="/new-and-popular" element={<NewAndPopular />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="/settings" element={<Settings user={user} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}