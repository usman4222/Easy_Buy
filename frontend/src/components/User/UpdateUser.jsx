import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  myProfile,
  updateProfile,
} from "../../actions/UserAction";
import { UPDATE_PROFILE_RESET } from "../../redux/userSlice/userProfileSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {
  const { currentUser } = useSelector((state) => state.myProfileInfo);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.userProfile
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    profileImage: "",
  });

  const userId = currentUser?._id;

  // Clear errors when the component mounts
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (userId) {
      dispatch(myProfile(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (currentUser) {
      setUpdatedUser({
        username: currentUser.username || "",
        email: currentUser.email || "",
        profileImage: currentUser.profileImage || "",
      });
    }
  }, [currentUser]);

  const handleEditChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "easy_buy");
    formData.append("cloud_name", "dnylalr7y");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dnylalr7y/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (!data.secure_url) {
      toast.error("Image upload failed");
      return;
    }

    setUpdatedUser((prev) => ({
      ...prev,
      profileImage: data.secure_url,
    }));

    toast.success("Image uploaded successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(updatedUser, userId));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Profile Updated Successfully!");
      dispatch(UPDATE_PROFILE_RESET());
      dispatch(myProfile(userId));
      navigate("/user-profile");
    }

  }, [error, isUpdated, dispatch, navigate, userId]);

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <MetaData title={`Edit ${currentUser?.username || "User"}'s Profile`} />
      <ToastContainer />
      <div className="max-w-4xl mx-auto p-6 bg-[#f3f3f3] rounded-xl shadow-xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-customGray tracking-wide">
            Edit Profile
          </h1>
          <p className="text-lg text-lightBlack mt-2">
            Update your personal details
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-white p-8 rounded-2xl shadow-lg">
          <div className="mb-6 md:mb-0 md:w-48 w-36 h-36">
            <img
              src={updatedUser.profileImage || currentUser?.profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-2 shadow-xl"
            />
          </div>
          <div className="md:ml-8 text-center md:text-left">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600">Username</label>
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={updatedUser.password}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                  placeholder="******"
                />
              </div> */}
              <div className="mb-4">
                <label className="block text-gray-600">Profile Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md"
                />
              </div>
              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="bg-primaryRed text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
                  disabled={loading}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
