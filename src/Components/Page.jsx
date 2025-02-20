import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Page = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState(null);

  // Fetch movie details
  const getSingleData = async () => {
    try {
      const { data } = await axios.get(`https://www.omdbapi.com/?apikey=d909114f&i=${id}`);
      setSingleMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    getSingleData();
  }, [id]);

  if (!singleMovie) {
    return <div className="text-center text-light mt-5">Loading movie details...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card movie-card shadow-lg border-0 p-3">
            <img
              src={singleMovie.Poster}
              className="card-img-top img-fluid rounded"
              alt={singleMovie.Title}
              style={{ height: "450px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h2 className="card-title fw-bold">{singleMovie.Title}</h2>
              <p className="text-muted"><strong>Year:</strong> {singleMovie.Year}</p>
              <p><strong>Genre:</strong> {singleMovie.Genre}</p>
              <p><strong>Director:</strong> {singleMovie.Director}</p>
              <p><strong>Actors:</strong> {singleMovie.Actors}</p>
              <p className="fst-italic"><strong>Plot:</strong> {singleMovie.Plot}</p>
              <p className="text-warning fw-bold">
                <strong>IMDB Rating:</strong> 
                <i className="fa-solid fa-star ms-2"></i> {singleMovie.imdbRating}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
