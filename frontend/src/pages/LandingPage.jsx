import React from "react";
import BannerComponent from "../components/BannerComponent";
import CategoryCardComponenet from "../components/CategoryCardComponent";
import NewArrival from "../components/NewArrival";
import NewDealComponent from "../components/NewDealComponent";
import BestSeller from "../components/BestSeller";
import BlogComponent from "../components/BlogComponent";
import MetaData from "../components/MetaData";

const LandingPage = () => {
  return (
    <div>
      <MetaData title="Home" />
      <BannerComponent />
      <CategoryCardComponenet />
      <NewArrival />
      <NewDealComponent />
      <BestSeller />
      <BlogComponent />
    </div>
  );
};

export default LandingPage;
