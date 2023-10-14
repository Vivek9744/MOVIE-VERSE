import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

const Detail2 = () => {

  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = "cbbcf5eca65af3397d4beecf2c2dfa18";
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        setMovieDetails(data);
        // console.log(movieDetails)
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <ThreeCircles height={40} color="white" />;
  }

  const { title, release_date, overview, poster_path } = movieDetails;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  

  // Function to show Description section
  const showDescriptionSection = () => {
    setShowDescription(true);
    setShowReviews(false);
    setShowDetails(false);
  };

  // Function to show Reviews section
  const showReviewsSection = () => {
    setShowDescription(false);
    setShowReviews(true);
    setShowDetails(false);
  };

  // Function to show Details section
  const showDetailsSection = () => {
    setShowDescription(false);
    setShowReviews(false);
    setShowDetails(true);
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {/* Image section for smaller devices */}
            <div className="w-full lg:hidden mb-4">
              <div className="w-full h-80 object-cover object-center rounded">
                <img alt="movie" className="w-full h-full" src={imageUrl} />
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-100 text-3xl title-font font-medium mb-4">
                {title}
              </h1>
              <h2 className="text-gray-100 text-3xl title-font font-medium mb-4">
                {release_date}
              </h2>
              <div className="flex mb-4">
                <a
                  className={`flex-grow ${
                    showDescription
                      ? "text-indigo-500 border-b-2 border-indigo-500"
                      : "border-b-2 border-gray-300"
                  } py-2 text-lg px-1 cursor-pointer`}
                  onClick={showDescriptionSection}
                >
                  Description
                </a>
                <a
                  className={`flex-grow ${
                    showReviews
                      ? "text-indigo-500 border-b-2 border-indigo-500"
                      : "border-b-2 border-gray-300"
                  } py-2 text-lg px-1 cursor-pointer`}
                  onClick={showReviewsSection}
                >
                  Reviews
                </a>
                <a
                  className={`flex-grow ${
                    showDetails
                      ? "text-indigo-500 border-b-2 border-indigo-500"
                      : "border-b-2 border-gray-300"
                  } py-2 text-lg px-1 cursor-pointer`}
                  onClick={showDetailsSection}
                >
                  Details
                </a>
              </div>
              {/* Description Section */}
              {showDescription && (
                <div className="leading-relaxed mb-4">
                  {overview.length <= 250 ? (
                    overview
                  ) : (
                    <>
                      {showMore ? overview : `${overview.substring(0, 250)}`}
                      <button
                        className="btn text-orange-700"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? "Show less" : "Show more"}
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Reviews Section */}
              {showReviews && <div>vivek chaudhary is hero</div>}
              {/* Details Section */}
              {showDetails && <div>{/* Add your Details content here */}</div>}
              <div className="flex">
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Button
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    {/* SVG path */}
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Image section for larger devices */}
            <div
              className="hidden lg:block lg:w-1/2 h-80 object-cover object-center rounded"
              style={{
                position: "fixed",
                top: "10",
                right: "10px",
                zIndex: "999",
              }}
            >
              <img alt="movie" className="w-full h-full" src={imageUrl} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail2;
