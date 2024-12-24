import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviews,
  getProductDetails,
} from "../../../actions/productsAction";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"; 
import Layout from "../../../components/Layout";
import Heading from "../../../components/Heading";

const GetReviews = () => {
  const [productId, setProductId] = useState(""); 
  const dispatch = useDispatch();

  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useSelector((state) => state.allReviews); 
  const {
    product,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.productDetails); 

  const handleFetchReviews = () => {
    if (productId) {
      dispatch(getAllReviews(productId)); 
      dispatch(getProductDetails(productId)); 
    }
  };

  return (
    <Layout>
      <div className="py-3 px-5 bg-[#f5f5fa]">
        <Heading page={"Product Reviews"} />
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-[#1E293B] font-montserrat text-2xl font-bold leading-6 my-5">
            All Reviews for Product
          </h2>
        </div>
      </div>
      <div className="px-5 bg-[#f5f5fa] min-h-screen">
        <div className="mb-4 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md max-w-xs sm:max-w-sm w-full"
          />
          <button
            onClick={handleFetchReviews}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Get Reviews
          </button>
        </div>

        {/* Display loading indicators */}
        {(reviewsLoading || productLoading) && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* Display product details */}
        {product && (
          <div className="bg-white p-5 rounded-lg shadow-lg mb-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full sm:w-24 h-24 object-cover rounded-md sm:mr-5"
              />
              <div className="mt-3 sm:mt-0">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-1">Price: ${product.price}</p>
                <p className="text-gray-600 mt-1">
                  Category: {product.category}
                </p>
                <p className="text-gray-600 mt-1">
                  Num Of Reviews: {product.numOfReviews}
                </p>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  Product Ratings:
                  <div className="flex text-[#FAC451]">
                    {[...Array(Math.floor(product.ratings || 0))].map(
                      (_, i) => (
                        <FaStar key={i} />
                      )
                    )}
                    {product.ratings % 1 >= 0.5 && <FaStarHalfAlt />}
                    {[...Array(5 - Math.ceil(product.ratings || 0))].map(
                      (_, i) => (
                        <FaRegStar key={i} />
                      )
                    )}
                  </div>
                  ({product.ratings})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Display message if product is not found */}
        {productError && !product && !reviewsLoading && !reviews && (
          <p className="text-red-500 text-center">Product not found.</p>
        )}

        {/* Display reviews */}
        {reviews && reviews.length > 0 ? (
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Customer Reviews</h3>
            <ul>
              {reviews.map((review) => (
                <li
                  key={review._id}
                  className="border-b pb-6 last:border-none"
                >
                  <div className="flex flex-wrap gap-4 items-start">
                    <img
                      src={review.user?.profileImage}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md border"
                      alt="user"
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center">
                        <h6 className="text-sm sm:text-lg font-semibold text-gray-800">
                          {review.user?.username}
                        </h6>
                        <div className="flex text-yellow-400 text-sm">
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
                      <p className="text-xs sm:text-sm text-gray-500 mb-3">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No reviews yet for this product.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default GetReviews;
