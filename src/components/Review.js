import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import swal from 'sweetalert';
import ReactStars from 'react-stars';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Review = ({ id, prevRating, userRated }) => {
  const [reviewText, setReviewText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [rating, setRating] = useState(0);
  const [data, setData] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const handleSendReview = async () => {
    if (reviewText && rating > 0) {
      setIsSending(true);
      await sendReview();
      setIsSending(false);
      setRating(0);
      setReviewText('');
    } else {
      swal('Error', 'Please provide a rating and review text.', 'error');
    }
  };

  const sendReview = async () => {
    try {
      const reviewDocRef = await addDoc(reviewsRef, {
        movieid: id,
        name: 'vivek',
        rating: rating,
        thought: reviewText,
        timestamp: new Date().getTime(),
      });

      const updatedRating = (prevRating + rating) / (userRated + 1);
      const movieDocRef = doc(db, 'movies', id);

      await updateDoc(movieDocRef, {
        rating: updatedRating,
        rated: userRated + 1,
      });

      console.log('Review sent successfully');

      // Optionally, you can add additional logic or success message here.
      swal('Success', 'Review sent successfully.', 'success');
    } catch (error) {
      console.error('Error sending the review:', error);
      swal('Error', 'Failed to send review.', 'error');
    }
  };

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      let q = query(reviewsRef, where('movieid', '==', id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewsLoading(false);
    }

    getData();
  }, [id]);

  return (
    <div className="p-4 border rounded-lg border-gray-300">
      <textarea
        className="w-full p-2 mb-4 border rounded-lg border-gray-300"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        rows={4}
      ></textarea>
      <div className="flex justify-end items-center">
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="hover-feedback"
            value={rating}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setRating(newValue);
            }
            }
            emptyIcon={<StarIcon style={{ opacity: 1.56 }} fontSize="inherit" />}
          />
        </Box>
        <button
          className={`px-4 py-2 text-white bg-blue-500 rounded-lg transition duration-300 ease-in-out ${
            isSending ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          onClick={handleSendReview}
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send Review'}
        </button>
      </div>
      {reviewsLoading ? (
        <div className="mt-4 flex justify-center">
          {/* Use a simple loading text or element as a placeholder */}
          Loading...
        </div>
      ) : (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          {data.map((e, i) => (
            <div className="bg-gray-900 p-4 rounded-lg my-4" key={i}>
              <p className="text-lg font-semibold">{e.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(e.timestamp).toLocaleString()}
              </p>
              <div className="my-2">
                <ReactStars
                  size={30}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
              </div>
              <p className="text-gray-200">{e.thought}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
