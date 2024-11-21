import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Play, Plus, ThumbsUp } from "lucide-react";
import { fetchMovieDetails, fetchMovieTrailer } from "../utils/api";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [myList, setMyList] = useState(() => JSON.parse(localStorage.getItem("myList")) || []);
  const [userRating, setUserRating] = useState(0);

  // Fetch movie details and trailer on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
        const trailerData = await fetchMovieTrailer(id);
        setTrailer(trailerData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchData();
  }, [id]);

  // Add or remove movie from "My List"
  const handleAddToMyList = () => {
    if (myList.some((item) => item.id === movie.id)) {
      setMyList((prevList) => prevList.filter((item) => item.id !== movie.id));
    } else {
      setMyList((prevList) => [...prevList, movie]);
    }
  };

  // Save "My List" to localStorage when updated
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  // Handle user rating
  const handleRatingChange = (rating) => {
    setUserRating(rating);
    alert(`Thanks for rating this movie ${rating} stars!`);
  };

  // Close modal and navigate back
  const closeModal = () => {
    // Ensure it navigates back to the previous page
    navigate(-1);
  };

  // Fallback: If the modal is not inside routing, use a forced state update
  const forceClose = () => {
    // This assumes you're controlling the modal rendering from a parent
    if (typeof navigate === "function") closeModal();
    else window.location.reload(); // Fallback if routing is misconfigured
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-y-auto">
      <div className="relative max-w-5xl mx-auto my-10 bg-gray-900 rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Movie Trailer or Backdrop */}
        <div className="relative aspect-video">
          {trailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Movie Content */}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-green-500 font-bold">{movie.vote_average * 10}% Match</span>
            <span>{movie.release_date.split("-")[0]}</span>
            <span className="border border-gray-500 px-2 py-1 text-xs">
              {movie.adult ? "18+" : "PG-13"}
            </span>
            <span>{movie.runtime} min</span>
          </div>
          <p className="text-gray-300 mb-4">{movie.overview}</p>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
              onClick={() =>
                trailer
                  ? window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank")
                  : alert("Trailer unavailable")
              }
            >
              <Play size={20} className="mr-2" />
              Play
            </button>
            <button
              className="flex items-center bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200"
              onClick={handleAddToMyList}
            >
              <Plus size={20} className="mr-2" />
              {myList.some((item) => item.id === movie.id) ? "Remove from My List" : "My List"}
            </button>
            <button
              className="flex items-center bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200"
              onClick={() => handleRatingChange(userRating || 5)}
            >
              <ThumbsUp size={20} className="mr-2" />
              Rate
            </button>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
