import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import empty from "../assets/images/empty.gif";
import MetaData from "../components/MetaData";

const ProductCategory = () => {
  const breadcrumbItems = ["Home", "Men's"];
  const dispatch = useDispatch();
  const { loading, products, error, filteredProductsCount, resultPerPage } =
    useSelector((state) => state.allProducts);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "All";
  const initialMinPrice = parseInt(searchParams.get("minPrice") || "0", 10);
  const initialMaxPrice = parseInt(searchParams.get("maxPrice") || "1000", 10);
  const [favorites, setFavorites] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    params.set("minPrice", minPrice);
    params.set("maxPrice", maxPrice);
    params.set("keyword", searchQuery);
    navigate(`?${params.toString()}`);
  }, [selectedCategory, minPrice, searchQuery, maxPrice, navigate]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory.toLowerCase();
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProductsCount / resultPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  // Handlers for filters
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Add or remove product from favorites
  const toggleFavorite = (productId) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));
  };

  // Background style for range slider
  const rangeBackgroundStyle = {
    background: `linear-gradient(
      to right, 
      #ccc ${minPrice / 10}%, 
      #FE4C50 ${minPrice / 10}%, 
      #FE4C50 ${maxPrice / 10}%, 
      #ccc ${maxPrice / 10}%
    )`,
  };

  const discountedPrice = (price, discount) => {
    if (discount) {
      const discountAmount = (price * discount) / 100;
      return (price - discountAmount).toFixed(2); // Return discounted price with two decimals
    }
    return price; // Return original price if no discount
  };

  return (
    <div>
       <MetaData title="Products Category" />
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 px-5 md:px-10 lg:px-20 lg:py-20 pt-10 pb-20">
        {/* Sidebar Filters */}
        <div className="md:col-span-1">
          {/* Category Filter */}

          <div className="max-w-md mx-auto  mb-10">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden  border-b">
              <div className="grid place-items-center h-full w-12 text-gray-300 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="peer h-full w-full shadow-xl outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h4 className="text-customGray font-medium text-[18px] leading-[22px]">
              Product Category
            </h4>
            <div className="flex flex-col gap-3 py-10 border-b">
              {[
                "All",
                "Men",
                "Women",
                "Accessories",
                "New Arrival",
                "Collection",
                "Shop",
              ].map((category, idx) => (
                <h6
                  key={idx}
                  className={`text-customGray hover:text-lightBlack duration-300 cursor-pointer ${
                    selectedCategory === category ? "font-bold" : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </h6>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h4 className="text-customGray font-medium text-[18px] leading-[22px]">
              Filter by Price
            </h4>
            <div className="flex flex-col gap-3 py-10 border-b">
              <div
                className="range-slider-container"
                style={rangeBackgroundStyle}
              >
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={minPrice}
                  onChange={handleMinChange}
                  className="range-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={handleMaxChange}
                  className="range-slider"
                />
              </div>
              <div className="text-sm font-medium text-customGray">
                Selected Price Range: ${minPrice} - ${maxPrice}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center items-center w-full my-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md"
          />
        </div> */}
        {/* Product List */}
        {loading ? (
          <div>Loading..</div>
        ) : filteredProducts.length === 0 ? (
          <>
            <div className="col-span-4 text-center text-gray-500 text-lg font-medium">
              No product exists in this category.
              <div className="flex justify-center">
                <img src={empty} alt="empty" className="w-52" />
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:col-span-3 lg:col-span-4">
            {paginatedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product-details/${product.slug}/${product._id}`}
              >
                <div className="relative cursor-pointer bg-white border rounded-lg shadow-md overflow-hidden group hover:shadow-2xl transition-shadow duration-300 p-4 transform transition-all duration-500 ease-in-out">
                  <button
                    className={`absolute top-4 left-4 ${
                      favorites.includes(product._id)
                        ? "text-primaryRed"
                        : "text-gray-500"
                    } hover:text-primaryRed transition-colors duration-200`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link navigation
                      toggleFavorite(product._id);
                    }}
                  >
                    <AiOutlineHeart size={24} />
                  </button>
                  <span className="absolute top-4 right-4 bg-primaryRed text-white text-xs font-semibold py-1 px-2 rounded-full">
                    {product.discount}% OFF
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mt-4 rounded-md"
                  />

                  <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {product.name}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {product.description}
                    </h3>
                    <div className="flex flex-col justify-center items-center mt-2 space-x-2">
                      <span className="text-gray-400 line-through text-sm">
                        ${product.price}
                      </span>
                      <span className="text-primaryRed font-bold text-lg">
                        ${discountedPrice(product.price, product.discount)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-5">
                    <button className="bg-primaryRed text-white py-2 px-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
      </div>
      <div className="flex flex-col items-center mb-20 space-y-4">
        <div className="text-gray-600">
          <span className="font-semibold">{`Total: ${
            filteredProductsCount || 0
          }`}</span>
          <span className="mx-2">|</span>
          <span className="font-semibold">{`Results per page: ${
            resultPerPage || 0
          }`}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
          >
            <span className="mr-2">&larr;</span> Previous
          </button>
          <span className="text-gray-700">{`Page ${currentPage} of ${Math.ceil(
            filteredProductsCount / resultPerPage
          )}`}</span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(filteredProductsCount / resultPerPage)
            }
            className="flex items-center px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next <span className="ml-2">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
