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
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const API_KEY = "d909114f";
  const API_URL = "https://www.omdbapi.com/";

  // Optimized function: Fetches all details in one request (no extra calls)
  const fetchMovies = async (query) => {
    try {
      const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${query}&type=movie`);
      return data.Search || []; // ✅ Directly return movie list without extra API calls
    } catch (error) {
      console.error(`Error fetching ${query} movies:`, error);
      return [];
    }
  };

  useEffect(() => {
    fetchMovies("new").then(setLatestMovies); // ✅ Fetch only once on mount
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      fetchMovies(searchKeyword).then(setMovies);
      setSelectedGenre(""); // Reset genre when searching
    } else {
      fetchMovies("movie").then(setMovies);
    }
  }, [searchKeyword]); // ✅ Only fetch when `searchKeyword` changes

  useEffect(() => {
    setGenres(["Action", "Thriller", "Comedy", "Horror", "Sci-Fi", "Love"]);
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchMovies(selectedGenre).then(setMovies);
    }
  }, [selectedGenre]);

  const handleFilterByGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  // Sorting logic remains unchanged
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === "popularity") return parseInt(b.imdbVotes || 0) - parseInt(a.imdbVotes || 0);
    if (sortOption === "rating") return parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0);
    if (sortOption === "release") return parseInt(b.Year || 0) - parseInt(a.Year || 0);
    return 0;
  });

  return (
    <div className="container-fluid">
      <LatestMoviesCarousel latestMovies={latestMovies} />

      <div className="filters d-flex justify-content-center my-3 gap-3">
        <select className="form-select w-auto" onChange={(e) => handleFilterByGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
        <select className="form-select w-auto" onChange={(e) => handleSort(e.target.value)}>
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="release">Release Date</option>
        </select>
      </div>

      {/* 🔹 Corrected Dynamic Heading */}
      <h2 className="text-light mt-3 text-center">
        {selectedGenre
          ? `Showing "${selectedGenre}" Movies`
          : searchKeyword
          ? `Results for "${searchKeyword}"`
          : "Popular Movies"}
      </h2>

      <div className="row mt-4">
        {sortedMovies.length > 0 ? (
          sortedMovies.map((movie, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4 d-flex">
              <div className="card movie-card w-100 h-100 shadow-sm">
                <NavLink to={`/page/${movie.imdbID}`} className="text-decoration-none">
                  <img
                    src={movie.Poster}
                    className="card-img-top"
                    alt={movie.Title}
                    style={{ maxHeight: "350px", objectFit: "cover", cursor: "pointer" }}
                  />
                </NavLink>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p>{movie.Genre || "Unknown Genre"}</p>
                  <button
                    className={`btn ${wishlist.some((item) => item.imdbID === movie.imdbID) ? "btn-danger" : "btn-primary"}`}
                    onClick={() =>
                      wishlist.some((item) => item.imdbID === movie.imdbID)
                        ? dispatch(removeFromWishlist(movie.imdbID))
                        : dispatch(addToWishlist(movie))
                    }
                  >
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

// Keep LatestMoviesCarousel unchanged (just fix the `t` function if translations are used)
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
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3 className="fs-5">{movie.Title}</h3>
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
