import React from 'react';

const NewsLetter = () => {
    return (
        <div className="pt-20 pb-10 px-4 md:px-0">
            <div className="bg-[#f3f3f3] flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 px-10 lg:px-20 py-10">
                <div className="text-center md:text-left">
                    <h4 className="text-[rgb(40,40,40)] font-medium text-[24px] leading-[24px]">Newsletter</h4>
                    <p className="text-[rgb(81,84,95)] font-medium text-[14px] leading-[24px] mt-2 md:mt-0">
                        Subscribe to our newsletter and get 20% off your first purchase
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center  w-full md:w-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full md:w-auto px-4 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                    />
                    <button className="w-full md:w-auto px-6 py-2 bg-primaryRed text-white font-semibold  hover:bg-primaryDark transition duration-300">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;