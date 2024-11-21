import axios from 'axios';

const API_KEY = "47837b662d7a3785cb2e0b55196fba77";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
};

export const fetchNetflixOriginals = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`
  );
  const data = await response.json();
  return data.results;
};

export const fetchTopRated = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
};

export const fetchMoviesByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`
  );
  const data = await response.json();
  return data.results;
};

export const fetchTVShows = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
};

export const fetchNewAndPopular = async (category = 'trending') => {
  let url;
  switch (category) {
    case 'trending':
      url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
      break;
    case 'this_week':
      url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;
      break;
    case 'coming_soon':
      url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`;
      break;
    default:
      url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    const trailers = response.data.results.filter(video => video.type === 'Trailer');
    return trailers.length > 0 ? trailers[0] : null;
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.genres;
};

export const fetchTVGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.genres;
};

export const fetchTVShowsByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
  );
  const data = await response.json();
  return data.results;
};