import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from "../assets/images/login.jpg";
import { clearErrors, login } from '../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../components/MetaData';


const LoginPage = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const { loading, error, currentUser } = useSelector((state) => state.user);


    const loginSubmit = (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            toast.error("Please fill in both email and password.");
            return;
        }    
        dispatch(login({ email: loginEmail, password: loginPassword }));
    };

    useEffect(() => {
      if (error) {
          toast.error(error.message || error);
          dispatch(clearErrors());
      }
      if (currentUser) {
          toast.success('Login successful!');
          navigate("/");
      }
  }, [error, currentUser, dispatch]);
  




    return (
        <div>
             <MetaData title="Login" />
            <ToastContainer position="top-right" autoClose={3000} />
            <section className="bg-white min-h-screen flex items-center justify-center">
                <div className="bg-white flex rounded-2xl shadow-xl max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-customGray">Login</h2>
                        <p className="text-xs mt-4 text-black">If you are already a member, easily log in</p>

                        <form className="flex flex-col gap-4" onSubmit={loginSubmit}>
                            <input
                                className="p-2 mt-8 rounded-xl border focus:outline-none"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl border w-full focus:outline-none"
                                    type={showPassword ? "text" : "password"}
                                    // type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}

                                />
                                <svg
                                    onClick={() => setShowPassword(!showPassword)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="gray"
                                    className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                                    viewBox="0 0 16 16"
                                >
                                    {showPassword ? (
                                        <path d="M13.359 11.238l1.5 1.5a.5.5 0 0 1-.708.707l-1.5-1.5A13.134 13.134 0 0 1 8 13.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 .172 8a13.133 13.133 0 0 1 1.66-2.043L.646 3.77a.5.5 0 1 1 .708-.708l12 12a.5.5 0 0 1-.708.708l-2.162-2.162zM4.118 6.936A3.499 3.499 0 0 0 4.5 8a3.5 3.5 0 0 0 5.962 2.201L7.399 7.639A1.5 1.5 0 0 1 4.118 6.936zM11.37 12.07l-2.54-2.54a1.5 1.5 0 0 1-2.16 0l-1.154-1.155a13.134 13.134 0 0 0 4.494 1.994 13.145 13.145 0 0 0 3.359-.61l-.845-.844a13.133 13.133 0 0 1-1.744.905z" />
                                    ) : (
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5 8-5.5 8-5.5zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8a13.13 13.13 0 0 1-1.66 2.043C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.173 8z" />
                                    )}                                </svg>
                            </div>
                            <button
                                type="submit"
                                className="bg-primaryRed rounded-xl text-white py-2 hover:scale-105 duration-300"
                                // disabled={loading} 
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <div className="mt-5 text-xs border-b border-primaryRed py-4 text-black hover:text-gray-400">
                            <a href="#">Forgot your password?</a>
                        </div>
                        <Link to="/register">
                            <div className="mt-3 text-xs flex justify-between items-center text-black hover:text-gray-400">
                                <p>Don't have an account?</p>
                                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                                    Register
                                </button>
                            </div>
                        </Link>
                    </div>

                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src={loginImage} alt="Login" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
