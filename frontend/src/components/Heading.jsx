import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Heading = ({ page }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Link to="/dashboard">
          <h4 className="font-montserrat text-[14px] font-medium leading-5 text-[#4D515A]">
            Dashboard
          </h4>
        </Link>
        <IoIosArrowForward />
        <h4 className="font-montserrat text-[14px] font-medium leading-5 text-[#4D515A]">
          {page}
        </h4>
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default Heading;
