import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Breadcrumb from "../components/Breadcrumb";
import { MdLocalShipping } from "react-icons/md";
import { FaStar, FaRegStar, FaStarHalfAlt, FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { AiOutlineHeart } from "react-icons/ai";
import ProductAdditionalInfo from "../components/ProductAdditionalInfo";
import { getProductDetails } from "../actions/productsAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../actions/cartAction";
import ProductReview from "../components/ProductReview";
import MetaData from "../components/MetaData";
import { SET_PAYMENT_STATUS } from "../redux/productSlice/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const breadcrumbItems = ["Home", "Men's", "Single Product"];
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeSection, setActiveSection] = useState("additionalInfo");

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      toast("You cannot add more than the available stock.");
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    // dispatch(SET_PAYMENT_STATUS(null))
    toast.success("Item Added to Cart");
  };

  const discountedPrice = (price, discount) => {
    if (discount) {
      const discountAmount = (price * discount) / 100;
      return (price - discountAmount).toFixed(2); // Return discounted price with two decimals
    }
    return price; // Return original price if no discount
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <MetaData title={`${product.name}'s Detail`} />
      {/* <Breadcrumb items={breadcrumbItems} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 px-5 md:px-10 lg:px-20 py-10 border-b mb-10">
        <div className="flex gap-5">
          {/* <div className="hidden md:block">
            <img
              key={index}
              src={image.url} // Assuming the image object has a `url` property
              alt={`product thumbnail ${index + 1}`}
              className={`w-20 md:w-32 lg:w-52 cursor-pointer mb-5 ${
                selectedImage === image.url ? "border border-primaryRed" : ""
              }`}
              onClick={() => setSelectedImage(image.url)}
            />
          </div> */}
          <img
            src={product.image}
            alt="Selected product"
            className="w-full md:max-w-lg lg:max-w-xl mb-5"
          />
        </div>

        <div>
          <h2 className="text-[24px] md:text-[36px] leading-tight font-medium text-customGray">
            {product.name}
          </h2>
          <p className="text-[rgb(81,84,95)] text-sm md:text-base leading-6">
            {product.description}
          </p>
          <div className="flex justify-center md:justify-start items-center mt-5 md:mt-10 mb-5">
            <button className="uppercase flex items-center justify-center gap-2 bg-[#F5F5F5] w-full md:w-auto h-10 px-4 hover:text-primaryRed transition-all">
              <MdLocalShipping /> free delivery
            </button>
          </div>
          <div className="flex flex-col mt-2">
            {/* {product.originalPrice && (
                            <span className="text-gray-400 line-through text-sm md:text-base">
                                ${product.originalPrice}
                            </span>
                        )} */}
            <div className="flex items-center gap-5">
              <div className="flex justify-center items-center mt-2 space-x-2">
                <span className="text-gray-400 line-through text-sm">
                  ${product.price}
                </span>
                <span className="text-primaryRed font-bold text-lg">
                  ${discountedPrice(product.price, product.discount)}
                </span>
              </div>

              <div className="flex text-[#FAC451]">
                {/* Full Stars */}
                {[...Array(Math.floor(product.ratings || 0))].map((_, i) => (
                  <FaStar key={i} />
                ))}

                {/* Half Star (if rating has a fractional part) */}
                {product.ratings % 1 >= 0.5 && <FaStarHalfAlt />}

                {/* Empty Stars */}
                {[...Array(5 - Math.ceil(product.ratings || 0))].map((_, i) => (
                  <FaRegStar key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 py-5">
            <h4 className="text-sm font-normal text-customGray">Quantity:</h4>
            <div className="border flex items-center justify-center w-32 h-10">
              <button onClick={handleDecrease} className="px-2">
                <TiMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={handleIncrease} className="px-2">
                <FaPlus />
              </button>
            </div>
            <button
              disabled={product.stock < 1 && "Out of Stock"}
              onClick={addToCartHandler}
              className="mt-3 md:mt-0 bg-primaryRed text-white py-2 px-6 hover:opacity-100 transition-opacity duration-300"
            >
              {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
          {/* <div className="flex flex-col md:flex-row items-center gap-4 py-5">
            <h4 className="text-sm font-normal text-customGray">Rating:</h4>
            <div className=" flex items-center justify-center">
              {product.ratings}
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-5 items-center mb-5">
          <button
            onClick={() => setActiveSection("additionalInfo")}
            className={`text-customGray hover:text-lightBlack duration-300 transition-all text-[16px] leading-[40px] font-medium ${
              activeSection === "additionalInfo"
                ? "underline text-primaryRed"
                : ""
            }`}
          >
            Additional Information
          </button>
          <button
            onClick={() => setActiveSection("reviews")}
            className={` text-customGray hover:text-lightBlack  duration-300 transition-all text-[16px] leading-[40px] font-medium ${
              activeSection === "reviews" ? "underline text-primaryRed" : ""
            }`}
          >
            Reviews({product.reviews?.length || 0})
          </button>
        </div>
      </div>
      {activeSection === "additionalInfo" ? (
        <ProductAdditionalInfo product={product} />
      ) : (
        <ProductReview reviews={product.reviews} />
      )}
    </div>
  );
};

export default ProductDetailsPage;
