import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Home = () => {
  //  Movie states
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // User input states
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Popular"); // Default to Popular

  const API_KEY = "d909114f";
  const API_URL = "https://www.omdbapi.com/";

  // Function to fetch movies
  const fetchMovies = async (query, setterFunction) => {
    try {
      const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${query}`);
      setterFunction(data?.Search || []);
    } catch (error) {
      console.error(`Error fetching ${query} movies:`, error);
    }
  };

  // Fetch default movies on page load
  useEffect(() => {
    fetchMovies("popular", setPopularMovies); // Load Popular Movies by default
    fetchMovies("top rated", setTopRatedMovies);
    fetchMovies("comedy", setComedyMovies);
    fetchMovies("horror", setHorrorMovies);
  }, []);

  //  Fetch searched movies when searchKeyword changes
  useEffect(() => {
    if (searchKeyword) {
      setIsSearching(true);
      fetchMovies(searchKeyword, setSearchResults);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchKeyword]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchKeyword(inputValue);
  };

  //  Get movies based on selected category
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
      {/*  Header Section */}
      <div className="row px-4">
        <div className="col-6">
          <h1 className="text-light heading">Welcome to Home</h1>
          <p className="text-light">Find your favorite movies and TV shows here.</p>

          {/*  Search Input */}
          <div className="d-flex gap-2 input">
            <input
              type="text"
              className="form-control w-75 border-0 px-2"
              placeholder="Search here..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary w-25" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div className="row mt-4">
        <div className="col-12">
          <label className="text-light me-2">Sort By:</label>
          <select
            className="form-select w-25"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Popular">Popular</option> {/* Popular is first */}
            <option value="Top Rated">Top Rated</option>
            <option value="Comedy">Comedy</option>
            <option value="Horror">Horror</option>
          </select>
        </div>
      </div>

      {/*  Display Movies (Search Results First, Otherwise Category) */}
      {isSearching ? (
        <MovieSection title="Search Results" movies={searchResults} />
      ) : (
        <MovieSection title={`${selectedCategory} Movies`} movies={getFilteredMovies()} />
      )}
    </div>
  );
};

//  Movie Section Component
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
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year: {movie.Year}</p>
              </div>
            </div>
          </NavLink>
        </div>
      ))
    ) : (
      <div className="text-center text-light">No movies found...</div>
    )}
  </div>
);

export default Home;
