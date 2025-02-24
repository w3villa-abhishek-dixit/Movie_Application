import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { useTranslation } from "react-i18next"; // Import translations
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = ({ searchKeyword }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [movies, setMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); // Ensure selectedGenre state exists
  const [sortOption, setSortOption] = useState("popularity");

  const API_KEY = "d909114f";
  const API_URL = "https://www.omdbapi.com/";

  // ✅ Fetch movies
  const fetchMovies = async (query) => {
    try {
      const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${query}&type=movie`);
      if (data.Search) {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const details = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${movie.imdbID}`);
            return details.data;
          })
        );
        return detailedMovies;
      }
      return [];
    } catch (error) {
      console.error(`Error fetching ${query} movies:`, error);
      return [];
    }
  };

  useEffect(() => {
    fetchMovies("new").then(setLatestMovies);
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      fetchMovies(searchKeyword).then(setMovies);
      setSelectedGenre(""); // Reset genre when searching
    } else {
      fetchMovies("movie").then(setMovies);
    }
  }, [searchKeyword]);

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

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === "popularity") return parseInt(b.imdbVotes || 0) - parseInt(a.imdbVotes || 0);
    if (sortOption === "rating") return parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0);
    if (sortOption === "release") return parseInt(b.Year || 0) - parseInt(a.Year || 0);
    return 0;
  });

  return (
    <div className="container-fluid">
      <LatestMoviesCarousel latestMovies={latestMovies} />

      {/* 🔹 Filters Section */}
      <div className="filters d-flex justify-content-center my-3 gap-3">
        <select className="form-select w-auto" onChange={(e) => handleFilterByGenre(e.target.value)}>
          <option value="">{t("allGenres")}</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{t(genre.toLowerCase())}</option>
          ))}
        </select>

        <select className="form-select w-auto" onChange={(e) => handleSort(e.target.value)}>
          <option value="popularity">{t("popularity")}</option>
          <option value="rating">{t("rating")}</option>
          <option value="release">{t("releaseDate")}</option>
        </select>
      </div>

      {/* 🔹 Dynamic Heading */}
      <h2 className="text-light mt-3 text-center">
        {selectedGenre
          ? `${t("showing")} "${selectedGenre}" ${t("movies")}`
          : searchKeyword
          ? `${t("resultsFor")} "${searchKeyword}"`
          : t("popularMovies")}
      </h2>

      {/* 🔹 Movie Cards */}
      <div className="row mt-4">
        {sortedMovies.length > 0 ? (
          sortedMovies.map((movie, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4 d-flex">
              <div className="card movie-card w-100 h-100 shadow-sm">
                <NavLink to={`/page/${movie.imdbID}`} className="text-decoration-none">
                  <img
                    src={movie?.Poster ? movie.Poster : "/assets/images/no-image.jpg"}
                    className="card-img-top"
                    alt={movie?.Title || t("noTitle")}
                    style={{ maxHeight: "350px", objectFit: "cover" }}
                  />
                </NavLink>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title">{movie?.Title}</h5>

                  <p>
                    {movie?.Genre
                      ? movie.Genre.split(", ").map((genre, idx) => (
                          <span key={idx} className="badge bg-secondary me-1">
                            {t(genre.toLowerCase())}
                          </span>
                        ))
                      : t("unknownGenre")}
                  </p>

                  <button
                    className={`btn ${wishlist.some((item) => item.imdbID === movie.imdbID) ? "btn-danger" : "btn-primary"}`}
                    onClick={() =>
                      wishlist.some((item) => item.imdbID === movie.imdbID)
                        ? dispatch(removeFromWishlist(movie.imdbID))
                        : dispatch(addToWishlist(movie))
                    }
                  >
                    {wishlist.some((item) => item.imdbID === movie.imdbID) ? t("removeFromWishlist") : t("addToWishlist")}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-light">{t("noMoviesFound")}</div>
        )}
      </div>
    </div>
  );
};


const LatestMoviesCarousel = ({ latestMovies }) => {
  const { t } = useTranslation(); 

  if (!latestMovies || latestMovies.length === 0) {
    return <div className="text-center text-light">{t("noLatestMovies")}</div>;
  }

  return (
    <div className="row mt-4">
      <div className="col-12">
        <Carousel>
          {latestMovies.map((movie, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={movie?.Poster ? movie.Poster.replace("SX300", "SX1080") : "/assets/images/no-image.jpg"}
                alt={movie?.Title || t("noTitle")}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3 className="fs-5">{movie?.Title || t("unknownTitle")}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};


export default Home;
