import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import HoverRating from "./HoverRating";
import { Link } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=cbbcf5eca65af3397d4beecf2c2dfa18";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=cbbcf5eca65af3397d4beecf2c2dfa18";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); // Define and initialize loading

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  const API_IMG = "https://image.tmdb.org/t/p/w500/";

  const Searchit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the search





    
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=cbbcf5eca65af3397d4beecf2c2dfa18&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setQuery("");
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // Set loading to false when the search is completed
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-100">
              Search
            </h1>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label htmlFor="Movie Name" className="leading-7 text-sm text-gray-600">
                Movie Name
              </label>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                id="full-name"
                name="full-name"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={Searchit}
            >
              Search
            </button>
          </div>
        </div>
        <div>
        
          {movies.length > 0 ? (
            <div className="flex flex-wrap justify-between p-3 mt-2">
              {loading ? (
                <div className="flex justify-content-center">
                  <ThreeDots height={40} color="white" />
                </div>
              ) : (
                movies.map((movie, i) => {
                  return (
                    
                    <Link
  to={`/detail2/${movie.id}`}
>
                      <div key={i}
                        className="border border-gray-300 rounded-lg p-2 mb-4 mt-3 shadow-md hover:transform hover:scale-105 transition-transform"
                      >
                        <div className="border border-gray-300 rounded-lg p-2">
                          <img
                            className="h-80 w-60"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </div>
                        <h1>{movie.title}</h1>
                        <h1>Rating: {movie.vote_average}</h1>
                        <h1>
                          <HoverRating />
                        </h1>
                        <h1>Year: {movie.release_date}</h1>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          ) : (
            <h2>Sorry !! No Movies Found</h2>
          )}
        </div>
      </section>
    </div>
  );
};





export default Search;
