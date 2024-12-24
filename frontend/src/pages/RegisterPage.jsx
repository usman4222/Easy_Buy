import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import registerImage from "../assets/images/register.jpg";
import { register } from "../actions/UserAction";
import MetaData from "../components/MetaData";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      await dispatch(register({ username, email, password }));
  
      setLoading(false);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Registration failed.");
    }
  };
  

  return (
    <div>
      <MetaData title="Register " />
      <ToastContainer position="top-right" autoClose={3000} />
      <section className="bg-white min-h-screen flex items-center justify-center">
        <div className="bg-white flex rounded-2xl shadow-xl max-w-3xl p-5 items-center">
          {/* Form Section */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-customGray">Register</h2>
            <p className="text-xs mt-4 text-black">
              If you are already a member, easily log in
            </p>

            <form onSubmit={registerSubmit} className="flex flex-col gap-4">
              <input
                className="p-2 mt-8 rounded-xl border focus:outline-none"
                type="text"
                name="username"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="p-2 rounded-xl border focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full focus:outline-none"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="bg-primaryRed rounded-xl text-white py-2 hover:scale-105 duration-300"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <Link to="/login">
              <div className="mt-3 text-xs flex justify-between items-center text-black hover:text-gray-400">
                <p>Already have an account?</p>
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Login
                </button>
              </div>
            </Link>
          </div>

          {/* Image Section */}
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={registerImage} alt="Register" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
