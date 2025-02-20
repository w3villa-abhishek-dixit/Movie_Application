import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-bootstrap"; // Import Bootstrap Carousel
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  // Movie states
  const [latestMovies, setLatestMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // User input states
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  const API_KEY = "d909114f";
  const API_URL = "https://www.omdbapi.com/";

  // Fetch movies
  const fetchMovies = async (query, setterFunction) => {
    try {
      const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${query}&type=movie`);
      setterFunction(data?.Search || []);
    } catch (error) {
      console.error(`Error fetching ${query} movies:`, error);
    }
  };

  // Fetch latest released movies for the carousel
  const fetchLatestMovies = async () => {
    try {
      const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=2024&type=movie`);
      setLatestMovies(data?.Search || []);
    } catch (error) {
      console.error("Error fetching latest movies:", error);
    }
  };

  // Fetch default movies on page load
  useEffect(() => {
    fetchLatestMovies();
    fetchMovies("Marvel", setPopularMovies);
    fetchMovies("Inception", setTopRatedMovies);
    fetchMovies("Comedy", setComedyMovies);
    fetchMovies("Horror", setHorrorMovies);
  }, []);

  // Fetch searched movies
  useEffect(() => {
    if (searchKeyword) {
      setIsSearching(true);
      fetchMovies(searchKeyword, setSearchResults);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchKeyword]);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleSearch = () => setSearchKeyword(inputValue);

  // Get movies based on selected category
  const getFilteredMovies = () => {
    switch (selectedCategory) {
      case "Top Rated":
        return topRatedMovies;
      case "Popular":
        return popularMovies;
      case "Comedy":
        return comedyMovies;
      case "Horror":
        return horrorMovies;
      default:
        return [];
    }
  };

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row px-4">
        <div className="col-md-6">
          <h1 className="text-light heading">Welcome to Movie Hub
          </h1>
          <p className="text-light">
            <i className="bi bi-camera-reels"></i> Find the latest and greatest movies here!
          </p>

          {/* Search Input */}
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control w-75 border-0 px-2"
              placeholder="Search movies..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary w-25" onClick={handleSearch}>
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>
      </div>

      {/* Bootstrap Carousel for Latest Movies */}
      <div className="row mt-4">
        <div className="col-md-12">
          <h2 className="text-light text-center">
            <i className="bi bi-calendar2-week"></i> Latest Releases
          </h2>
          <Carousel>
            {latestMovies.slice(0, 5).map((movie, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 carousel-img"
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ height: "500px", objectFit: "cover", borderRadius: "10px" }}
                />
                <Carousel.Caption>
                  <h3 className="bg-dark p-2 rounded">{movie.Title}</h3>
                  <p className="bg-dark p-2 rounded">
                    <i className="bi bi-calendar-date"></i> Year: {movie.Year}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div className="row mt-4">
        <div className="col-12">
          <label className="text-light me-2">
            <i className="bi bi-funnel"></i> Sort By:
          </label>
          <select
            className="form-select w-25"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Popular">Popular</option>
            <option value="Top Rated">Top Rated</option>
            <option value="Comedy"> Comedy</option>
            <option value="Horror"> Horror</option>
          </select>
        </div>
      </div>

      {/* Display Movies */}
      {isSearching ? (
        <MovieSection title={<><i className="bi bi-search"></i> Search Results</>} movies={searchResults} />
      ) : (
        <MovieSection title={<><i className="bi bi-camera-reels"></i> {selectedCategory} Movies</>} movies={getFilteredMovies()} />
      )}
    </div>
  );
};

// Movie Section Component
const MovieSection = ({ title, movies }) => (
  <div className="row mt-5">
    <h2 className="text-light mb-3">{title}</h2>
    {movies.length > 0 ? (
      movies.map((movie, index) => (
        <div key={index} className="col-md-3 mb-4">
          <NavLink to={`/page/${movie?.imdbID}`} className="text-decoration-none">
            <div className="card movie-card h-100 shadow-sm">
              <img
                src={movie.Poster}
                className="card-img-top"
                alt={movie.Title}
                style={{ height: "350px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">
                  <i className="bi bi-film"></i> {movie.Title}
                </h5>
                <p className="card-text">
                  <i className="bi bi-calendar-date"></i> Year: {movie.Year}
                </p>
              </div>
            </div>
          </NavLink>
        </div>
      ))
    ) : (
      <div className="text-center text-light">
        <i className="bi bi-exclamation-circle"></i> No movies found...
      </div>
    )}
  </div>
);

export default Home;
