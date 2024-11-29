import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";

const FooterComponent = () => {
    return (
        <div className=" px-10 lg:px-20 py-10">
            <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
                <ul className="flex gap-6 md:gap-10">
                    <li className="text-[rgb(81,84,95)] hover:text-[rgb(254,76,80)] cursor-pointer duration-300 transition-all text-[14px] leading-[34px] font-normal">Blog</li>
                    <li className="text-[rgb(81,84,95)] hover:text-[rgb(254,76,80)] cursor-pointer duration-300 transition-all text-[14px] leading-[34px] font-normal">FAQ's</li>
                    <li className="text-[rgb(81,84,95)] hover:text-[rgb(254,76,80)] cursor-pointer duration-300 transition-all text-[14px] leading-[34px] font-normal">Contact Us</li>
                </ul>
                <ul className="flex gap-6 md:gap-10">
                    <li className="text-[rgb(81,84,95)] hover:text-[rgb(254,76,80)] cursor-pointer duration-300 transition-all text-[14px] leading-[34px] font-normal"><FaFacebookF /></li>
                    <li className="text-[rgb(81,84,95)] hover:text-[rgb(254,76,80)] cursor-pointer duration-300 transition-all text-[14px] leading-[34px] font-normal"><FaXTwitter /></li>
                    <li className="text-[rgb(81,84,95)] hover:text-[rgb(254,76,80)] cursor-pointer duration-300 transition-all text-[14px] leading-[34px] font-normal"><GrInstagram /></li>
                </ul>
            </div>
            <div className="py-10 text-center md:text-left">
                <p className="text-[rgb(81,84,95)] text-[14px] leading-[24px] font-normal">
                    ©2024 All Rights Reserved. Made with ❤️ by Mr.Dev
                </p>
            </div>
        </div>
    );
};

export default FooterComponent;
