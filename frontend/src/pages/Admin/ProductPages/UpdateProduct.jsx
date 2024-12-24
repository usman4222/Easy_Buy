import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import Heading from "../../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { NEW_PRODUCT_RESET } from "../../../redux/productSlice/productSlice";
import {
  updateProduct,
  getProducts,
  getProductDetails,
  clearErrors,
} from "../../../actions/productsAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "flowbite-react";
import { UPDATE_PRODUCT_RESET } from "../../../redux/productSlice/updateProduct";
import Layout from "../../../components/Layout";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    error: updateError,
    product,
    isUpdated,
  } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategory(product.category);
    }

    if (updateError) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      toast.success("Product Updated Successfully");
      navigate("/all-products");
    }
  }, [dispatch, updateError, isUpdated, history, productId, product]);

  const updateProductHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "easy_buy");
    formData.append("cloud_name", "dnylalr7y");

    try {
      // const response = await fetch("https://api.cloudinary.com/v1_1/dnylalr7y/image/upload", {
      //   method: "POST",
      //   body: formData,
      // });

      // const data = await response.json();

      // if (!data.secure_url) {
      //   throw new Error("Image upload failed");
      // }

      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("stock", stock);
      myForm.set("category", category);
      myForm.set("description", description);
      // myForm.set("image", data.secure_url);

      // setImageURL(data.secure_url);
      dispatch(updateProduct(id, myForm));
      toast.success("Product updated successfully!");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Image upload failed");
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setFile(selectedImage); 
      setImagePreview(URL.createObjectURL(selectedImage)); 
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-blue-500");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("border-blue-500");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setImage(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
    event.currentTarget.classList.remove("border-blue-500");
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="p-5 bg-[hsl(210,40%,96%)]">
        <Heading page={"Product"} />
        <div className="flex flex-wrap justify-between items-center my-[14px]">
          <div className="flex items-center gap-[20px]">
            <BackButton path={"/all-products"} />
            <h2 className="text-[#1E293B] font-montserrat text-2xl font-bold leading-6">
              Update Product
            </h2>
          </div>
        </div>

        <form onSubmit={updateProductHandler}>
          <div className="flex flex-col xl:flex-row bg-white py-[24px] rounded-lg w-full h-auto">
            <div className="px-5 w-full">
              <h4 className="text-[#1E293B] font-montserrat text-[20px] font-semibold leading-[24px]">
                Product Information
              </h4>
              <div className="my-[14px] flex flex-col gap-[24px] flex-wrap">
                <div className="flex flex-col sm:flex-row justify-between gap-[24px]">
                  <div className="w-full">
                    <label>Product Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label>Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-[24px]">
                  <div className="w-full">
                    <label>Price</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label>Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label>Stock</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col justify-between w-full px-10 xl:w-[30%] pt-[37px]">
              <div className="flex flex-col">
                <div className="flex flex-col justify-start w-full">
                  <label className="font-montserrat text-sm font-medium leading-5 text-[#344054] pb-[10px]">Product Image</label>
                  <input
                    type="file"
                    className="p-2 border rounded w-full"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-4 rounded-md shadow-md"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  )}
                </div>
              </div>
            </div> */}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full my-10 justify-center rounded-md bg-gradient-to-r from-[#1A55A5] via-[#1A55A5] to-[#003F94] p-[10px_18px] text-sm font-semibold text-white shadow-sm"
          >
            {/* {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Updating...</span>
              </>
            ) : ( */}
            Update Product
            {/* )} */}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
