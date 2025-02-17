import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [movieAllData, setMovieAllData] = useState([]);
   const[inputvalue,setInputValue]=useState("")
   const[searchkeyword,setSearchkeyword]=useState("movie")
  const getMovieData = async () => {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=d909114f&s=${searchkeyword}`
      );
      setMovieAllData(data?.Search || []); // Ensure data exists
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [searchkeyword]);


  const handleInputChange=(e)=>{
          setInputValue(e.target.value);
  };

  const handleSearch=()=>{
    setSearchkeyword(inputvalue)
  };




//   console.log('input-value',inputvalue)

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row px-4">
        <div className="col-6">
          <div className="title-text">
            <h1 className="text-light heading">Welcome to Home</h1>
            <p className="text-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Odio nobis, doloremque eos saepe quia officiis dignissimos voluptate quaerat,
              praesentium ex accusamus error soluta. Ipsum perferendis nam,
              neque veritatis excepturi qui.
            </p>
          </div>
          <div className="d-flex gap-2 input">
            <input
              type="text"
              className="form-control w-75 border-0 px-2"
              placeholder="Search here..."
              value={inputvalue}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary w-25 "onClick={handleSearch} >Search</button>
          </div>
        </div>
      </div>

      {/* Movie Cards Section */}
      <div className="row mt-5">
        {movieAllData.length > 0 ? (
          movieAllData.map((movie, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card h-100">
                <img 
                  src={movie.Poster} 
                  className="card-img-top" 
                  alt={movie.Title} 
                  style={{ height: "350px", objectFit: "cover" }} 
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Year: {movie.Year}</p>
                  {/* <button className="btn btn-primary">View Details</button> */}
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

export default Home;
