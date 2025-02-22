import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h2 className="text-light">My Wishlist</h2>
      <div className="row">
        {wishlist.length > 0 ? (
          wishlist.map((movie, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card movie-card h-100 shadow-sm">
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} style={{ height: "350px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Year: {movie.Year}</p>
                  <button className="btn btn-danger" onClick={() => dispatch(removeFromWishlist(movie.imdbID))}>
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-light">Your wishlist is empty.</div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
