import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import ProductTable from "../../../../components/AdminTables/ProductTable";
import Layout from "../../../../Components/Layout";
import Heading from "../../../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../actions/productsAction";

const AllProducts = () => {
  return (
    <Layout>
      <div className="py-3 px-5  bg-[#f5f5fa]">
        <Heading page={"Products"} />
        <div className="flex justify-between items-center  flex-wrap">
          <h2 className="text-[#1E293B] font-montserrat text-2xl font-bold leading-6 my-5">
            All Products
          </h2>
        </div>
      </div>
      <div className="px-5 bg-[#f5f5fa]">
        <ProductTable />
      </div>
    </Layout>
  );
};

export default AllProducts;
