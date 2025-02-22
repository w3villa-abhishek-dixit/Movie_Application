import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage
const loadWishlist = () => {
  const storedWishlist = localStorage.getItem("wishlist");
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: loadWishlist(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const movie = action.payload;
      if (!state.wishlist.some((item) => item.imdbID === movie.imdbID)) {
        state.wishlist.push(movie);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // Save to localStorage
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.imdbID !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // Update localStorage
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
