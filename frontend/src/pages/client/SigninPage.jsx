import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, login } from "../actions/UserAction";
import MetaData from "../components/MetaData";
import Navbar from "../components/Header/Navbar";
import loginImage from "../../public/login.png";
import { FaApple, FaEyeSlash, FaRegEye } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (email && password) {
      dispatch(login({ email, password }))
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.error("Login failed, please try again.");
        });
    } else {
      toast.error("Please fill all fields.");
    }
  };

  return (
    <div className="max-h-screen">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <section className="border-red-500 bg-[#F8F9FD] min-h-screen flex items-center justify-center ">
        <div className="flex items-center justify-center gap-10">
          <div className="bg-white p-5 flex rounded-2xl shadow-lg max-w-3xl">
            <div className=" px-5">
              <h2 className="text-2xl md:text-4xl font-semibold leading-[42px] text-center no-underline decoration-none uppercase">
                Login
              </h2>
              <p className="text-[14px] md:text-[18px] text-[#000000B2] font-normal leading-[42px] text-center no-underline decoration-none">
                Login to access your account
              </p>
              <form className="mt-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full lg:w-[400px] xl:w-[600px] px-4 py-2 md:py-3 rounded-[5px] bg-gray-200 mt-2 border border-[#00000099] focus:border-[#0F60FF] focus:bg-white focus:outline-none"
                    autoFocus
                    required
                  />
                </div>
                <div>
                  <div className="mt-4 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      minLength="6"
                      className="w-full px-4 py-2 md:py-3 rounded-[5px] bg-gray-200 mt-2 text-[#000000B2] border border-[#00000099] focus:border-[#0F60FF] focus:bg-white focus:text-black focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="mt-2">
                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                      </div>
                    </button>
                  </div>

                  <div className="mt-4 flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="w-4 h-4 mr-2"
                    />
                    <label
                      htmlFor="rememberMe"
                      className=" text-[12px] md:text-sm"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full block bg-[#0F60FF] hover:bg-[#0F60FF]/80 text-lg md:text-xl md:font-semibold leading-[33.6px] text-center text-white rounded-lg px-4 md:py-3 mt-6"
                >
                  LogIn
                </button>

                <div className="text-[12px] md:text-sm flex gap-1 justify-center items-center mt-3">
                  <p>Don’t have an account? </p>
                  <Link to="/register">
                    <span className="text-[#0F60FF]">Sign up</span>
                  </Link>
                </div>
              </form>

              <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-[12px] md:text-sm  text-[#000000]">
                  Or login with
                </p>
                <hr className="border-gray-500" />
              </div>

              <div className="flex space-x-4">
                <button className="md:bg-white md:border border-[#000000] py-4 w-full rounded-[4.67px] mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="w-6 h-6"
                    viewBox="0 0 48 48"
                  >
                    <defs>
                      <path
                        id="a"
                        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                      />
                    </defs>
                    <clipPath id="b">
                      <use xlinkHref="#a" overflow="visible" />
                    </clipPath>
                    <path
                      clipPath="url(#b)"
                      fill="#FBBC05"
                      d="M0 37V11l17 13z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#EA4335"
                      d="M0 11l17 13 7-6.1L48 14V0H0z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#34A853"
                      d="M0 37l30-23 7.9 1L48 0v48H0z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#4285F4"
                      d="M48 48L17 24l-4-3 35-10z"
                    />
                  </svg>
                </button>

                <button className="md:bg-white md:border border-[#000000] py-4 w-full rounded-[4.67px] mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="w-6 h-6"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#1877F2"
                      d="M48 24C48 10.74 37.26 0 24 0 10.74 0 0 10.74 0 24c0 12.98 9.42 23.78 21.75 24V31h-6.5v-7h6.5v-5.2c0-6.5 3.9-10 9.8-10 2.8 0 5.2.2 5.2.2v6h-3.5c-3.3 0-4.5 2-4.5 4.1v5.9h7l-1.1 7h-5.9v17.2c12.31-.22 21-10.15 21-22.2z"
                    />
                  </svg>
                </button>

                <button className="md:bg-white md:border border-[#000000] py-4 w-full rounded-[4.67px] mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
                  <FaApple className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:block hidden">
            <div className="bg-[#F4F4F4] rounded-[30px] h-[750px] flex justify-center items-center shadow-xl overflow-hidden">
              <img
                src={loginImage}
                alt="page img"
                className="transition-transform duration-300 ease-in-out scale-150"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;




// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { IoSearch } from "react-icons/io5";
// import { FaUser } from "react-icons/fa";
// import { RiShoppingCart2Fill } from "react-icons/ri";
// import { IoLogOut } from "react-icons/io5";
// import { MdDashboard } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { BiSolidLogInCircle } from "react-icons/bi";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentUser } = useSelector((state) => state.user);
//   const { cartItems } = useSelector((state) => state.cart);

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const isActive = (path) => {
//     return location.pathname === path
//       ? "text-black"
//       : "text-gray-600 hover:text-gray-800";
//   };

//   return (
//     <nav className="bg-white bg shadow-lg px-5" aria-label="Primary navigation">
//       <div className="container mx-auto flex justify-between items-center py-4 ">
//         <div>
//           <Link to="/" aria-label="Home">
//             <span className=" text-4xl font-medium leading-10 text-left from-font decoration-none">
//               Logo
//             </span>
//           </Link>
//         </div>

//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-gray-600 focus:outline-none"
//           aria-label="Toggle mobile menu"
//         >
//           {isOpen ? "✕" : "☰"}
//         </button>
//         <div className="hidden md:flex items-center space-x-4">
//           <Link to="/cart">
//             <button className="bg-[#0F60FF] w-24 h-9 top-5 left-[1155px] gap-0 rounded-[3px] text-white ">
//               Login
//             </button>
//           </Link>
//           <button className="bg-[#fff] w-24 h-9 top-5 font-semibold left-[1155px] gap-0 rounded-[3px] text-[#0F60FF] ">
//             Sign Up
//           </button>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="md:hidden flex justify-center  bg-white py-10">
//           <div className="flex flex-col justify-center gap-4">
//             <Link to="/cart">
//               <button className="bg-[#0F60FF] w-24 h-9 top-5 left-[1155px] gap-0 rounded-[3px] text-white ">
//                 Login
//               </button>
//             </Link>
//             <button className="bg-[#fff] w-24 h-9 top-5 left-[1155px] gap-0 rounded-[3px] text-[#0F60FF] ">
//               Sign Up
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
