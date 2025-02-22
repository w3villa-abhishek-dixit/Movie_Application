import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const API_KEY = "d909114f";
  const API_URL = "https://www.omdbapi.com/";

  const fetchMovies = async (query, setterFunction) => {
    try {
      const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${query}&type=movie`);
      setterFunction(data?.Search || []);
    } catch (error) {
      console.error(`Error fetching ${query} movies:`, error);
    }
  };

  useEffect(() => {
    fetchMovies("new", setLatestMovies);
    fetchMovies("Marvel", setPopularMovies);
    fetchMovies("Inception", setTopRatedMovies);
    fetchMovies("Comedy", setComedyMovies);
    fetchMovies("Horror", setHorrorMovies);
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      setIsSearching(true);
      fetchMovies(searchKeyword, setSearchResults);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchKeyword]);

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      setSearchKeyword(inputValue);
      setIsSearching(true);
    }
  };

  return (
    <div className="container-fluid">
      <LatestMoviesCarousel latestMovies={latestMovies} />
      <div className="row px-4 mt-4">
        <div className="col-md-6">
          <div className="d-flex gap-2">
            <input type="text" className="form-control w-75" placeholder="Search movies..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button className="btn btn-primary w-25" onClick={handleSearch}><i className="bi bi-search"></i> Search</button>
          </div>
        </div>
      </div>
      <MovieSection title={<><i className="bi bi-camera-reels"></i> {isSearching ? "Search Results" : selectedCategory + " Movies"}</>} movies={isSearching ? searchResults : popularMovies} wishlist={wishlist} dispatch={dispatch} />
    </div>
  );
};

const LatestMoviesCarousel = ({ latestMovies }) => (
  <div className="row mt-4">
    <div className="col-12">
      {latestMovies.length > 0 ? (
        <Carousel>
          {latestMovies.map((movie, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={movie.Poster.replace("SX300", "SX1080")} alt={movie.Title} style={{ height: "500px", objectFit: "cover" }} />
              <Carousel.Caption>
                <h3>{movie.Title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div className="text-center text-light">No latest movies available...</div>
      )}
    </div>
  </div>
);

const MovieSection = ({ title, movies, wishlist, dispatch }) => (
  <div className="row mt-5">
    <h2 className="text-light mb-3">{title}</h2>
    {movies && movies.length > 0 ? (
      movies.map((movie, index) => {
        const isWishlisted = wishlist.some((item) => item.imdbID === movie.imdbID);
        return (
          <div key={index} className="col-md-3 mb-4">
            <div className="card movie-card h-100 shadow-sm">
              <NavLink to={`/page/${movie.imdbID}`} className="text-decoration-none">
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} style={{ height: "350px", objectFit: "cover", cursor: "pointer" }} />
              </NavLink>
              <div className="card-body text-center">
                <h5 className="card-title">{movie.Title}</h5>
                <button className={`btn ${isWishlisted ? "btn-danger" : "btn-primary"}`} onClick={() => isWishlisted ? dispatch(removeFromWishlist(movie.imdbID)) : dispatch(addToWishlist(movie))}>
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="text-center text-light">No movies found...</div>
    )}
  </div>
);

export default Home;
