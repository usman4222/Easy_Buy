import React from "react";
import bannerImage from "../assets/images/slider_1.jpg";
import { Link } from "react-router-dom";

const BannerComponent = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className=" bg-opacity-50 p-6 md:p-12 text-[rgb(40,40,40)] leading-[17px] font-sans ml-4 md:ml-12">
        <p className="text-[12px] md:text-[14px] font-medium uppercase">
          Spring / Summer Collection 2024
        </p>
        <h1 className="text-[55px] md:text-[75px] font-poppins font-normal leading-[72px] py-4 text-[rgb(40,40,40)]">
          Get up to 30% Off <br /> New Arrivals
        </h1>
        <Link to="/product-category">
          <button className="mt-6 md:px-8 px-6 py-3 bg-[#FE4C50] text-white rounded-sm hover:bg-[#FE7C7F] transition">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BannerComponent;
