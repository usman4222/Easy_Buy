import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import Heading from "../../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../actions/UserAction";
import { NEW_PRODUCT_RESET } from "../../../redux/productSlice/productSlice";
import { createProduct } from "../../../actions/productsAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import { Spinner } from "flowbite-react";
import Layout from "../../../components/Layout";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.newProduct);
  const { currentUser } = useSelector((state) => state.user);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      // toast.success("Product created successfully!");
      navigate("/all-products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "easy_buy");
    formData.append("cloud_name", "dnylalr7y");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dnylalr7y/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.secure_url) {
        throw new Error("Image upload failed");
      }

      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("discount", discount);
      myForm.set("stock", stock);
      myForm.set("category", category);
      myForm.set("description", description);
      myForm.set("image", data.secure_url);

      setImageURL(data.secure_url);
      dispatch(createProduct(myForm));
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
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
      setFile(files[0]);
      setFileName(files[0].name);
      setImagePreview(URL.createObjectURL(files[0]));
    }
    event.currentTarget.classList.remove("border-blue-500");
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="p-5 bg-[hsl(210,40%,96%)] h-[100vh]">
        <Heading page={"Product"} />
        <div className="flex flex-wrap justify-between items-center my-[14px]">
          <div className="flex items-center gap-[20px]">
            <BackButton path={"/dashboard"} />
            <h2 className="text-[#1E293B] font-montserrat text-2xl font-bold leading-6">
              Add Product
            </h2>
          </div>
        </div>

        <form onSubmit={createProductSubmitHandler}>
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
                    <label>Discount</label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="p-2 border rounded w-full"
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

            <div className="flex flex-col justify-between w-full px-10 xl:w-[30%] pt-[37px]">
              <div className="flex flex-col">
                <div className="flex flex-col justify-start w-full">
                  <label
                    htmlFor="addClass"
                    className="font-montserrat text-sm font-medium leading-5 text-[#344054] pb-[10px]"
                  >
                    Teacher Picture
                  </label>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center p-[16px_24px] w-full h-[188px] border-2 border-[#CBC5FF] border-dashed rounded-[12px] cursor-pointer bg-[rgba(238,236,255,0.40)] hover:bg-gray-100"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      {fileName ? (
                        <p className="mt-2 text-gray-700">
                          Selected file: {fileName}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (selectedFile) {
                          setFile(selectedFile);
                          setFileName(selectedFile.name);
                          setImagePreview(URL.createObjectURL(selectedFile));
                        }
                      }}
                    />
                  </label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-4 rounded-md shadow-md"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  )}
                </div>
                {/* <button
                  onClick={handleUploadImage}
                  className="mt-4"
                >
                  Upload Image
                </button> */}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full my-10 justify-center rounded-md  from-[#1A55A5] via-[#1A55A5] to-[#003F94] bg-[linear-gradient(90.6deg,#1A55A5_46.33%,#003F94_99.99%)] p-[10px_18px] text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;
