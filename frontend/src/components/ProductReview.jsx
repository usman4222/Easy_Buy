import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import {
  clearErrors,
  getAllReviews,
  newReview,
} from "../actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERRORS, NEW_REVIEW_RESET } from "../redux/reviewSlice/addReview";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductReview = () => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { reviews, loading, error } = useSelector((state) => state.allReviews);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { currentUser } = useSelector((state) => state.user);

  const userReview = reviews?.find(
    (review) => review.user?._id === currentUser?._id
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(CLEAR_ERRORS());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(CLEAR_ERRORS());
    }
    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    if (id) {
      dispatch(getAllReviews(id));
    }
  }, [dispatch, id, error, reviewError, success]);

  const handleRating = (rate) => setRating(rate);

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const starIndex = index + 1;
        return (
          <span
            key={starIndex}
            onClick={() => handleRating(starIndex)}
            onMouseEnter={() => setHoverRating(starIndex)}
            onMouseLeave={() => setHoverRating(0)}
            className="cursor-pointer"
          >
            {starIndex <= (hoverRating || rating) ? <FaStar /> : <FaRegStar />}
          </span>
        );
      });
  };

  const submitReviewHandler = () => {
    if (!comment) {
      toast.error("Please enter a comment.");
      return;
    }

    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    dispatch(newReview(formData));

    setComment("");
    setRating(1);
  };

  return (
    <div className="px-5 md:px-10 lg:px-20 py-10">
      <ToastContainer />
      <h2 className="text-primaryRed font-medium text-[20px] md:text-[24px] leading-[29px] uppercase underline mb-10">
        Reviews ({reviews?.length || 0})
      </h2>

      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reviews?.length === 0 ? (
        <p>No reviews available for this product.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col md:flex-row gap-4 md:gap-5 border p-4 rounded-lg"
            >
              <div className="flex flex-col items-center md:items-start">
                <img
                  src={review.user?.profileImage}
                  className="w-12 h-12 bg-red-400 rounded-full my-3 md:my-5"
                  alt="user"
                />
                <div className="flex text-[#FAC451] text-sm">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  {Array(5 - review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaRegStar key={i} />
                    ))}
                </div>
              </div>

              <div>
                <span className="font-normal text-[12px] md:text-[14px] leading-[23px] text-primaryRed">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <h6 className="font-medium text-[14px] md:text-[16px] leading-[23px] text-customGray">
                  {review.user?.username}
                </h6>
                <p className="font-normal text-[12px] md:text-[14px] leading-[20px] md:leading-[23px] text-customGray mt-3 md:mt-4">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <h4 className="font-medium text-[18px] leading-[22px]">Add Review</h4>
        <div className="flex flex-col gap-5 py-6">
          <textarea
            className="border focus:outline-none p-4 my-5 w-full"
            placeholder="Your Review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={userReview}
          />
          <div className="flex gap-5 items-center">
            <h4 className="font-medium text-[18px] leading-[22px]">
              Your Rating:
            </h4>
            <div className="flex text-[#FAC451] text-sm">{renderStars()}</div>
          </div>
          <button
            className="bg-primaryRed text-white py-2 px-6 hover:opacity-90 transition-opacity duration-300"
            onClick={submitReviewHandler}
            disabled={userReview} 
          >
            {userReview ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
