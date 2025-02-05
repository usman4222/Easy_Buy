import axios from "axios";
import {
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
} from "../redux/productSlice/productSlice";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
} from "../redux/productSlice/allProductSlice";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../redux/productSlice/productDetails";
import {
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../redux/productSlice/updateProduct";
import {
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
} from "../redux/reviewSlice/addReview";
import {
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
} from "../redux/reviewSlice/allReviews";
import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
} from "../redux/productSlice/GetAllAdminProduct";
import {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../redux/productSlice/deleteProductSlice";

let apiurl = "https://easy-buy-s9rh.vercel.app"
// let apiurl = "http://localhost:4000";

export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 3000000],
    category = "",
  ) =>
  async (dispatch) => {
    try {
      dispatch(ALL_PRODUCT_REQUEST());

      const queryParams = new URLSearchParams();
      
      if (keyword) queryParams.append("keyword", encodeURIComponent(keyword));
      queryParams.append("page", currentPage);
      queryParams.append("minPrice", price[0].toString());
      queryParams.append("maxPrice", price[1].toString());

      if (category) {
        queryParams.append("category", encodeURIComponent(category));
      }

      const queryString = queryParams.toString();

      const apiEndpoint = `${apiurl}/api/product/get-product?${queryString}`;

      const { data } = await axios.get(apiEndpoint);
      
      dispatch(ALL_PRODUCT_SUCCESS(data));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      dispatch(ALL_PRODUCT_FAIL(errorMessage));
    }
  };

  
//get products by admin
export const getAminProducts = () => async (dispatch) => {
  try {
    dispatch(ADMIN_PRODUCT_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${apiurl}/api/product/admin/products`,
      config
    );

    dispatch(ADMIN_PRODUCT_SUCCESS(data.products));
  } catch (error) {
    dispatch(ADMIN_PRODUCT_FAIL(error.response.data.message));
  }
};



export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch(NEW_PRODUCT_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${apiurl}/api/product/admin/create-product`,
      productData,
      config
    );

    dispatch(NEW_PRODUCT_SUCCESS(data));

    return data.product;
  } catch (error) {
    dispatch(NEW_PRODUCT_FAIL(error.response.data.message));

    console.error("Error to create product:", error);
    throw error;
  }
};



export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(UPDATE_PRODUCT_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${apiurl}/api/product/admin/update-product/${id}`,
      productData,
      config
    );

    dispatch(UPDATE_PRODUCT_SUCCESS(data.success));

    return data.product;
  } catch (error) {
    dispatch(UPDATE_PRODUCT_FAIL(error.response.data.message));

    console.error("Error to update product:", error);
    throw error;
  }
};



export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(PRODUCT_DETAILS_REQUEST());

    const { data } = await axios.get(
      `${apiurl}/api/product/product-detail/${id}`
    );

    dispatch(PRODUCT_DETAILS_SUCCESS(data.product));
  } catch (error) {
    dispatch(
      PRODUCT_DETAILS_FAIL(
        error.response?.data?.message
      )
    );
    console.error("Error fetching product details:", error);
  }
};



export const delProduct = (id) => async (dispatch) => {
  try {
    dispatch(DELETE_PRODUCT_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `${apiurl}/api/product/admin/delete-product/${id}`,
      config
    );

    dispatch(DELETE_PRODUCT_SUCCESS(data.success));

    return data.success;
  } catch (error) {
    const errorMessage = error.response.data.message || "Some error occurred";
    dispatch(DELETE_PRODUCT_FAIL(errorMessage));
  }
};



export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(NEW_REVIEW_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${apiurl}/api/product/create-product-review`,
      reviewData,
      config
    );

    dispatch(NEW_REVIEW_SUCCESS(data.success));
  } catch (error) {
    dispatch(NEW_REVIEW_FAIL(error.response.data.message));
  }
};



export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch(ALL_REVIEW_REQUEST());

    const { data } = await axios.get(
      `${apiurl}/api/product/get-product-reviews/${id}`
    );
    
    dispatch(ALL_REVIEW_SUCCESS(data.reviews));
  } catch (error) {
    dispatch(ALL_REVIEW_FAIL(error.response?.data?.message));
  }
};

// export const deleteReview = (reviewId, productId) => async (dispatch) => {
//   try {
//     dispatch(DELETE_REVIEW_REQUEST());

//     const { data } = await axios.delete(
//       `${apiurl}/api/v1/reviews?id=${reviewId}&productId=${productId}`
//     );

//     dispatch(DELETE_REVIEW_SUCCESS(data.success));
//   } catch (error) {
//     dispatch(DELETE_REVIEW_FAIL(error.response.data.message));
//   }
// };

export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
