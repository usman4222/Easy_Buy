import React from "react";
import womanImage from "../assets/images/banner_1.jpg";
import bagImage from "../assets/images/banner_2.jpg";
import manImage from "../assets/images/banner_3.jpg";
import { Link } from "react-router-dom";

const CategoryCardComponenet = () => {
  const cards = [
    {
      id: 1,
      title: "Women",
      imageUrl: womanImage,
    },
    {
      id: 2,
      title: "Accessories",
      imageUrl: bagImage,
    },
    {
      id: 3,
      title: "Men",
      imageUrl: manImage,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-10 lg:px-20 py-10 font-sans">
      {cards.map((card) => (
        <Link
          key={card.id}
          to={`product-category?category=${card.title}&minPrice=0&maxPrice=1000`} 
        >
          <div
            className="relative h-64 rounded-md overflow-hidden bg-cover bg-center group"
            style={{ backgroundImage: `url(${card.imageUrl})` }}
          >
            <div className="flex items-center justify-center h-full ">
              <button className="text-black px-4 lg:px-6 bg-white text-[16px] lg:text-[22px] leading-[50px] font-semibold hover:text-[rgb(181,174,196)] rounded uppercase transition duration-300">
                {card.title}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCardComponenet;
