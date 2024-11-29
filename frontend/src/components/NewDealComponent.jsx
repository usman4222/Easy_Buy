import React, { useState, useEffect } from "react";
import dealPic from "../assets/images/deal_ofthe_week.png";
import { Link } from "react-router-dom";

const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-xl text-gray-700 font-semibold flex flex-wrap justify-evenly gap-3 py-10">
      <div className="bg-white p-16 rounded-full w-24 h-24 flex flex-col items-center justify-center">
        <span className="text-primaryRed font-semibold text-[32px] leading-[33px]">
          {timeRemaining.days}
        </span>
        <p className="text-center">Days</p>
      </div>
      <div className="bg-white p-16 rounded-full w-24 h-24 flex flex-col items-center justify-center">
        <span className="text-primaryRed font-semibold text-[32px] leading-[33px]">
          {timeRemaining.hours}
        </span>
        <p className="text-center">Hours</p>
      </div>
      <div className="bg-white p-16 rounded-full w-24 h-24 flex flex-col items-center justify-center">
        <span className="text-primaryRed font-semibold text-[32px] leading-[33px]">
          {timeRemaining.minutes}
        </span>
        <p className="text-center">Mins</p>
      </div>
      <div className="bg-white p-16 rounded-full w-24 h-24 flex flex-col items-center justify-center">
        <span className="text-primaryRed font-semibold text-[32px] leading-[33px]">
          {timeRemaining.seconds}
        </span>
        <p className="text-center">Sec</p>
      </div>
    </div>
  );
};

const NewDealComponent = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:px-10 lg:px-20 bg-[#f2f2f2] rounded-lg shadow-md">
      <div className="w-full mb-4 md:mb-0">
        <img
          src={dealPic}
          alt="Deal of the Week"
          className="object-cover rounded-md "
        />
      </div>

      <div className="pl-0 md:pl-8 w-full py-16">
        <h2 className="text-[32px] md:text-[40px] leading-[48px] font-medium customGray font-sans text-center pb-5 custom-underline">
          Deal of the Week
        </h2>
        <div className="mt-4">
          <CountdownTimer targetDate={targetDate} />
        </div>

        <div className="mt-6 flex justify-center">
          <Link to="/product-category">
            <button className="bg-[#1E1E27] text-white py-2 px-6 rounded-sm hover:bg-[#FE7C7F] transition duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewDealComponent;
