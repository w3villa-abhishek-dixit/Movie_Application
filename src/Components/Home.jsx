import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [movieAllData, setMovieAllData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("movie");

  // Fetch movie data
  const getMovieData = async () => {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=d909114f&s=${searchKeyword}`
      );
      setMovieAllData(data?.Search || []);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [searchKeyword]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchKeyword(inputValue);
  };

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row px-4">
        <div className="col-6">
          <div className="title-text">
            <h1 className="text-light heading">Welcome to Home</h1>
            <p className="text-light">
              Find your favorite movies and TV shows here.
            </p>
          </div>
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

      {/* Movie Cards Section */}
      <div className="row mt-5">
        {movieAllData.length > 0 ? (
          movieAllData.map((movie, index) => (
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

     
      
    </div>
  );
};

export default Home;
