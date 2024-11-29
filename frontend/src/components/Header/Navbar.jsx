import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidLogInCircle } from "react-icons/bi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-black"
      : "text-gray-600 hover:text-gray-800";
  };

  return (
    <nav className="bg-white bg shadow-lg px-5" aria-label="Primary navigation">
      <div className="container mx-auto flex justify-between items-center py-4 ">
        <div>
          <Link to="/" aria-label="Home">
            <span className="text-2xl font-bold font-poppins cursor-pointer">
              Easy<span className="text-[#FE4C50] ">Buy</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center ">
          <div className="hidden md:flex space-x-10 ml-4">
            <Link to="/">
              <span
                className={`relative cursor-pointer text-black hover:text-gray-400 duration-300 ${isActive(
                  "/"
                )}`}
                aria-label="Home"
              >
                Home
              </span>
            </Link>
            <Link to="/services">
              <span
                className={`relative cursor-pointer text-black hover:text-gray-400 duration-300 ${isActive(
                  "/services"
                )}`}
                aria-label="Templates"
              >
                Templates
              </span>
            </Link>
            <Link to="/price">
              <span
                className={`relative cursor-pointer text-black hover:text-gray-400 duration-300 ${isActive(
                  "/price"
                )}`}
                aria-label="Price"
              >
                Price
              </span>
            </Link>
            <Link to="/help">
              <span
                className={`relative cursor-pointer text-black hover:text-gray-400 duration-300 ${isActive(
                  "/help"
                )}`}
                aria-label="Help"
              >
                Help
              </span>
            </Link>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
        <div className="hidden md:flex items-center space-x-4">
          {currentUser?.role === "admin" && (
            <Link to="/dashboard">
              <span
                className="text-black hover:text-gray-400 text-xl duration-300 cursor-pointer"
                aria-label="Login"
              >
                <MdDashboard />
              </span>
            </Link>
          )}
          <Link to="/cart">
            <span
              className="text-black hover:text-gray-400 text-xl duration-300 px-4 py-2 rounded cursor-pointer relative"
              aria-label="Cart"
            >
              <RiShoppingCart2Fill />
              {totalItems > 0 && (
                <span className="absolute top-[20px] right-[-15px] text-sm text-white bg-[#FE4C50] rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </span>
          </Link>
          <span className="text-black hover:text-gray-400  duration-300 text-xl  py-2 rounded cursor-pointer">
            {currentUser ? (
              <Link to="/user-profile">
                <FaUser />
              </Link>
            ) : (
              <Link to="/login">
                <BiSolidLogInCircle />
              </Link>
            )}
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-4">
          <Link to="/">
            <span className={`block ${isActive("/")}`} aria-label="Home">
              Home
            </span>
          </Link>
          <Link to="/">
            <span
              className={`block ${isActive("/services")}`}
              aria-label="Templates"
            >
              Templates
            </span>
          </Link>
          <Link to="/">
            <span className={`block ${isActive("/price")}`} aria-label="Price">
              Price
            </span>
          </Link>
          <Link to="/">
            <span className={`block ${isActive("/help")}`} aria-label="Help">
              Help
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <span
              className="text-black hover:text-gray-400 text-xl duration-300 cursor-pointer"
              aria-label="Login"
            >
              <IoSearch />
            </span>
            <Link to="/login">
              <span
                className="text-black hover:text-gray-400 text-xl duration-300 px-4 py-2 rounded cursor-pointer"
                aria-label="Sign up"
              >
                <RiShoppingCart2Fill />
              </span>
            </Link>
            <Link to="/login">
              <span
                className="text-black hover:text-gray-400 text-xl duration-300 px-4 py-2 rounded cursor-pointer"
                aria-label="Sign up"
              >
                <IoLogOut />
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
