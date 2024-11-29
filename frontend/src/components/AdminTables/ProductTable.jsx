import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delProduct,
  getAminProducts,
} from "../../actions/productsAction";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_PRODUCT_RESET } from "../../redux/productSlice/deleteProductSlice";

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [resultPerPage, setResultPerPage] = useState(10);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, products } = useSelector((state) => state.allAdminProducts);


  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
      products
    }
    dispatch(getAminProducts());
  }, [dispatch, isDeleted, deleteError]);

  const getFavoriteProducts = () => {
    const favorites = localStorage.getItem("favoriteProducts");
    return favorites ? JSON.parse(favorites) : [];
  };

  const [favoriteProducts, setFavoriteProducts] = useState(
    getFavoriteProducts()
  );

  const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
  };

  useEffect(() => {
    dispatch(getAminProducts());
  }, [dispatch]);

  const deleteProductHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    const success = await dispatch(delProduct(id));
    if (success) {
      const updatedFavorites = favoriteProducts.filter((favId) => favId !== id);
      setFavoriteProducts(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);

      toast.success("Product deleted successfully!");
    } else {
      toast.error("Failed to delete the product.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / resultPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-product/${id}`);
  };

  return (
    <div className="h-[100vh] overflow-x-auto">
      <ToastContainer />
      <table className="w-full table-auto bg-[#F8FAFC] rounded-[12px]">
        <thead>
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Id</th>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Ratings</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center p-4 text-gray-500">
                This admin has no products
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product._id} className="border-b">
                <td className="p-4">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-4">{product._id}</td>
                <td className="p-4 w-20">
                  <img
                    src={product.image}
                    alt=""
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.description}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.ratings}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => deleteProductHandler(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(products.length / resultPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(products.length / resultPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
