import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, myProfile } from "../../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const UserProfile = () => {
  const { currentUser: profileUser } = useSelector(
    (state) => state.myProfileInfo
  );
  const { currentUser: loggedInUser } = useSelector(
    (state) => state.myProfileInfo
  );

  const userId = loggedInUser?._id;
  
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(myProfile(userId));
    }
  }, [dispatch, userId]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <MetaData title={`${profileUser.user.username}'s Profile`} />
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
              src={profileUser.user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-2 shadow-xl"
            />
          </div>

          {/* Profile Information */}
          <div className="md:ml-8 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">
              {profileUser.user.username}
            </h2>
            <p className="text-gray-600 mt-2">Email: {profileUser.user.email}</p>
            <p className="text-gray-600 mt-1">Role: {profileUser.user.role}</p>
            <p className="text-gray-600 mt-1">
              Account Created At:{" "}
              {new Date(profileUser.user.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 text-center flex gap-3 justify-center">
          <Link to={`/edit-profile`}>
            <button className=" px-4 py-2 rounded-full border bg-white text-gray-700 shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ">
              Edit Profile
            </button>
          </Link>
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
