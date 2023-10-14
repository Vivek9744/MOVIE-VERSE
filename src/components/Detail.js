import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { moviesRef } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Review from './Review'
import ReactStars from 'react-stars'
import { ThreeCircles } from "react-loader-spinner";
const Detail = () => {
  const { id } = useParams();
  console.log(id)
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating:0,
    Rated:0
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false); // Set loading to false when data is fetched
    }
    getData();
  }, []);

  const [showMore, setShowMore] = useState(false);

  //  const {text}=data.description;
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
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
      {/* {   console.log(data)} */}

      <section className="text-gray-600 body-font overflow-hidden">
        {loading ? (
          <div className="h-96 flex w-full justify-center items-center">
            <ThreeCircles height={30} color="white" />
          </div>
        ) : (
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {/* Image section for smaller devices */}
              <div className="w-full lg:hidden mb-4">
                <div className="w-full h-80 object-cover object-center rounded">
                  <img
                    alt="ecommerce"
                    className="w-full h-full"
                    src={data.image}
                  />
                  
                </div>
              
              </div>
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h1 className="text-gray-100 text-3xl title-font font-medium mb-4 ">
                  {data.title}
                  <ReactStars
                   size={20}
                   half={true}
                   value={data.rating/data.rated}
                   edeit={false}
                   />
                </h1>
               
                <h2 className="text-gray-100 text-3xl title-font font-medium mb-4">
                  {data.year}
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
                    {data.description.length <= 250 ? (
                      data.description
                    ) : (
                      <>
                        {showMore?data.description : `${data.description.substring(0, 250)}`}
                        <button
                          className="btn text-orange-700"
                          onClick={() => setShowMore(!showMore)}
                        >
                          {showMore ? "Show less" : "Show more"}
                        </button>
                      </>
                    )}
                   
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
                )}

                {/* Reviews Section */}
                {showReviews && <Review id={id} prevRating={data.rating} userRated={data.rated}/>}
                {/* Details Section */}
                {showDetails && (
                  <div>{/* Add your Details content here */}</div>
                )}
                <div className="flex">
                 
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
                <img
                  alt="ecommerce"
                  className="w-full h-full"
                  src={data.image}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
export default Detail;
