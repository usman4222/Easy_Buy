import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, logout, updateProfile } from "../../actions/UserAction";
import { UPDATE_PROFILE_RESET } from "../../redux/userSlice/userProfileSlice";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const UserProfile = () => {
  const {
    currentUser,
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    profileImage: currentUser.image,
  });

  const handleEditChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

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

      setUpdatedUser((prev) => ({
        ...prev,
        profileImage: data.secure_url,
      }));

      alert("Image uploaded successfully!");
      console.log("Uploaded image URL:", data.secure_url);
    } catch (error) {
      alert("Image upload failed. Please try again.");
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Profile updated successfully!");
      dispatch(UPDATE_PROFILE_RESET()); // Reset isUpdated
      setIsEditing(false); // Exit edit mode
    }
  }, [isUpdated, updateError, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the update action
      dispatch(updateProfile(updatedUser, currentUser._id));
      // Wait for success or failure, you can show a loader while waiting
      if (updateError) {
        alert(updateError);
        dispatch(clearErrors());
      }
      if (isUpdated === true) {
        setIsEditing(false); // Close the editing mode
        console.log("User profile updated successfully");
        alert("User profile updated successfully");
      } else if (updateError) {
        console.error("Error while updating:", updateError);
        alert(`Update failed: ${updateError}`); // Show the error message to the user
      }
    } catch (error) {
      console.error("Error during dispatch:", error);
      alert("An unexpected error occurred");
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
       <MetaData title={`${currentUser.username}'s Profile`} />
      <div className="max-w-4xl mx-auto p-6 bg-[#f3f3f3] rounded-xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-customGray tracking-wide">
            Your Profile
          </h1>
          <p className="text-lg text-lightBlack mt-2">
            Manage your personal details
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          {/* Profile Image */}
          <div className="mb-6 md:mb-0 md:w-48 w-36 h-36">
            <img
              src={updatedUser.profileImage || currentUser.profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-2 shadow-xl"
            />
          </div>

          {/* Profile Information */}
          {isEditing ? (
            <div className="md:ml-8 text-center md:text-left">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-600">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={updatedUser.username}
                    onChange={handleEditChange}
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
                <div className="mb-4">
                  <label className="block text-gray-600">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={updatedUser.password}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 mt-1 border rounded-md"
                    placeholder="******"
                  />
                </div>
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
                    className=" px-4 py-2 rounded-full border bg-white text-gray-700 shadow-lg  transition duration-300 ease-in-out"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="md:ml-8 text-center md:text-left">
              <h2 className="text-3xl font-semibold text-gray-800">
                {currentUser.username}
              </h2>
              <p className="text-gray-600 mt-2">Email: {currentUser.email}</p>
              <p className="text-gray-600 mt-1">Role: {currentUser.role}</p>
              <p className="text-gray-600 mt-1">
                Account Created At:{" "}
                {new Date(currentUser.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 text-center flex gap-3 justify-center">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className=" px-4 py-2 rounded-full border bg-white text-gray-700 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 "
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-primaryRed text-white px-4 py-2  rounded-full shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
          <Link to="/my-orders">
            <button className=" px-4 py-2 rounded-full border bg-white text-gray-700 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ">
              My Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
