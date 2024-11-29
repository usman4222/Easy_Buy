import React from 'react';

const NewsLetter = () => {
    return (
        <div className="pt-20 pb-10 px-4 md:px-0">
            <div className="bg-[#f3f3f3] flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 px-10 lg:px-20 py-10">
                <div className="text-center md:text-left">
                    <h4 className="text-[rgb(40,40,40)] font-medium text-[24px] leading-[24px]">Newsletter</h4>
                    <p className="text-[rgb(81,84,95)] font-medium text-[14px] leading-[24px] mt-2 md:mt-0">
                        Subscribe to our newsletter and get 20% off your first purchase
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center  w-full md:w-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full md:w-auto px-4 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                    />
                    <button className="w-full md:w-auto px-6 py-2 bg-primaryRed text-white font-semibold  hover:bg-primaryDark transition duration-300">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;


// import React, { useEffect, useState } from 'react';
// import { FaRegStar, FaStar } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearErrors, getProductDetails, newReview } from '../actions/productsAction';
// import { NEW_REVIEW_RESET } from '../redux/reviewSlice/addReview';

// const ProductReview = () => {
//     const dispatch = useDispatch();

//     const [hoverRating, setHoverRating] = useState(0);
//     const [rating, setRating] = useState(1);
//     const [comment, setComment] = useState('');
//     const { success, error: reviewError } = useSelector((state) => state.newReview);
//     const { product, loading, error } = useSelector((state) => state.productDetails);
//     const id = product?._id; // Assuming product ID is available in product details

//     const handleRating = (rate) => setRating(rate);

//     const renderStars = () => {
//         return Array(5)
//             .fill(0)
//             .map((_, index) => {
//                 const starIndex = index + 1;
//                 return (
//                     <span
//                         key={starIndex}
//                         onClick={() => handleRating(starIndex)}
//                         onMouseEnter={() => setHoverRating(starIndex)}
//                         onMouseLeave={() => setHoverRating(0)}
//                         className="cursor-pointer"
//                     >
//                         {starIndex <= (hoverRating || rating) ? <FaStar /> : <FaRegStar />}
//                     </span>
//                 );
//             });
//     };

//     useEffect(() => {
//         if (error) {
//             alert.error(error);
//             dispatch(clearErrors());
//         }
//         if (reviewError) {
//             alert.error(reviewError);
//             dispatch(clearErrors());
//         }
//         if (success) {
//             alert.success('Review Submitted Successfully');
//             dispatch({ type: NEW_REVIEW_RESET });
//         }
//         if (id) {
//             dispatch(getProductDetails(id));
//         }
//     }, [dispatch, id, error, reviewError, success]);

//     const submitReviewHandler = () => {
//         const formData = new FormData();
//         formData.set('rating', rating);
//         formData.set('comment', comment);
//         formData.set('productId', id);

//         dispatch(newReview(formData));
//     };

//     return (
//         <div className="px-5 md:px-10 lg:px-20 py-10">
//             <h2 className="text-primaryRed font-medium text-[20px] md:text-[24px] leading-[29px] uppercase underline mb-10">
//                 Reviews ({product?.reviews?.length || 0})
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {product?.reviews?.map((review, index) => (
//                     <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-5">
//                         <div className="flex flex-col items-center md:items-start">
//                             <img
//                                 // src="/user-avatar.png" 
//                                 className="w-12 h-12 bg-red-400 rounded-full my-3 md:my-5"
//                                 alt="user"
//                             />
//                             <div className="flex text-[#FAC451] text-sm">
//                                 {Array(review.rating)
//                                     .fill(0)
//                                     .map((_, i) => (
//                                         <FaStar key={i} />
//                                     ))}
//                                 {Array(5 - review.rating)
//                                     .fill(0)
//                                     .map((_, i) => (
//                                         <FaRegStar key={i} />
//                                     ))}
//                             </div>
//                         </div>
//                         <div>
//                             <span className="font-normal text-[12px] md:text-[14px] leading-[23px] text-primaryRed">
//                                 {new Date(review.createdAt).toLocaleDateString()}
//                             </span>
//                             <h6 className="font-medium text-[14px] md:text-[16px] leading-[23px] text-customGray">
//                                 {review.name}
//                             </h6>
//                             <p className="font-normal text-[12px] md:text-[14px] leading-[20px] md:leading-[23px] text-customGray mt-3 md:mt-4">
//                                 {review.comment}
//                             </p>
//                         </div>
//                     </div>
//                 ))}

//                 <div>
//                     <h4 className="font-medium text-[18px] leading-[22px]">Add Review</h4>
//                     <div className="flex flex-col gap-5 py-6">
//                         <textarea
//                             className="border focus:outline-none p-4 my-5 w-full"
//                             placeholder="Your Review..."
//                             value={comment}
//                             onChange={(e) => setComment(e.target.value)}
//                         />
//                         <div className="flex gap-5 items-center">
//                             <h4 className="font-medium text-[18px] leading-[22px]">Your Rating:</h4>
//                             <div className="flex text-[#FAC451] text-sm">{renderStars()}</div>
//                         </div>
//                         <button
//                             className="bg-primaryRed text-white py-2 px-6 hover:opacity-90 transition-opacity duration-300"
//                             onClick={submitReviewHandler}
//                         >
//                             Submit Review
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductReview;
