// Import the necessary modules and components from React
import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import HoverRating from "./HoverRating"; // Import the HoverRating component
import { getDocs } from "firebase/firestore";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { moviesRef } from "../firebase/firebase";
import {Link} from 'react-router-dom';

// Define the Cards component
const Cards = () => {
  // Initialize state using the useState hook, with an array of movie data objects
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);

      const _data = await getDocs(moviesRef);
      _data.forEach((doc)=>{
        setData((prv)=>[...prv,{...(doc.data()),id:doc.id}]);
      }) 
      setLoading(false);
    }
    getData();
  }, []);


  
  // Render the component
  return (
    
    // Create a flex container to display movie cards in a row
    
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="flex justify content-center ">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        /* Map over each movie data object in the 'data' array */
        data.map((e, i) => {
          // Create a movie card element with a unique 'key' attribute
          return (
            <Link to={`/details/${e.id}`}>
            {/* // Add a return statement here */}
            <div
              key={i} // Each element rendered in a loop should have a unique 'key'
              className="border border-gray-300 rounded-lg p-2 mb-4 mt-3 shadow-md hover:transform hover:scale-105 transition-transform"
            >
              <div className="border border-gray-300 rounded-lg p-2">
                {/* Display the movie poster image */}
                <img
                  className="h-80 w-60"
                  src={e.image} // Image source is taken from the movie data object
                  alt={e.title} // Alt text for accessibility
                />
              </div>
              {/* Display the movie name */}
              <h1>{e.title}</h1>
              {/* Display the movie rating */}
              <h1>Rating: {5}</h1>
              {/* Render the HoverRating component */}
              <h1>
                <HoverRating   card_rated={e.rated} card_rating={e.rating}/>
                {/* {console.log(e.rating)} */}
              </h1>
              {/* Display the movie release year */}
              <h1>Year: {e.year}</h1>
            </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

// Export the Cards component as the default export
export default Cards;
