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

export const fetchActionMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`
  );
  const data = await response.json();
  return data.results;
};

export const fetchComedyMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`
  );
  const data = await response.json();
  return data.results;
};