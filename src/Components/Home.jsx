import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = ({ searchKeyword }) => {
  const [movies, setMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
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
    fetchMovies("new", setLatestMovies); // Fetch latest movies for carousel
    if (searchKeyword) {
      fetchMovies(searchKeyword, setMovies);
    } else {
      fetchMovies("movie", setMovies);
    }
  }, [searchKeyword]);

  return (
    <div className="container-fluid">
      {/* Latest Movies Carousel */}
      <LatestMoviesCarousel latestMovies={latestMovies} />

      <h2 className="text-light mt-3">{searchKeyword ? `Results for "${searchKeyword}"` : "Popular Movies"}</h2>
      <div className="row mt-4">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card movie-card h-100 shadow-sm">
                <NavLink to={`/page/${movie.imdbID}`} className="text-decoration-none">
                  <img src={movie.Poster} className="card-img-top" alt={movie.Title} style={{ height: "350px", objectFit: "cover", cursor: "pointer" }} />
                </NavLink>
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.Title}</h5>
                  <button className={`btn ${wishlist.some((item) => item.imdbID === movie.imdbID) ? "btn-danger" : "btn-primary"}`} 
                    onClick={() => wishlist.some((item) => item.imdbID === movie.imdbID) ? dispatch(removeFromWishlist(movie.imdbID)) : dispatch(addToWishlist(movie))}>
                    {wishlist.some((item) => item.imdbID === movie.imdbID) ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-light">No movies found...</div>
        )}
      </div>
    </div>
  );
};

// Latest Movies Carousel Component
const LatestMoviesCarousel = ({ latestMovies }) => (
  <div className="row mt-4">
    <div className="col-12">
      {latestMovies.length > 0 ? (
        <Carousel>
          {latestMovies.map((movie, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={movie.Poster.replace("SX300", "SX1080")}
                alt={movie.Title}
                style={{ height: "500px", objectFit: "cover" }}
              />
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

export default Home;
