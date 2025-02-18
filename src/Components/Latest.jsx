import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";  // Import Carousel from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; 

const LatestMoviesCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("https://www.omdbapi.com/?apikey=d909114f&s=latest");
        setMovies(data?.Search || []);
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-light">Latest Movies</h2>
      {movies.length > 0 ? (
        <Carousel>
          {movies.map((movie) => (
            <Carousel.Item key={movie.imdbID}>
              <img
                className="d-block w-100"
                src={movie.Poster}
                alt={movie.Title}
                style={{ height: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h5>{movie.Title}</h5>
                <p>{movie.Year}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default LatestMoviesCarousel;
