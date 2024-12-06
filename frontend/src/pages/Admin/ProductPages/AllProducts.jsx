import React from "react";
import ProductTable from "../../../components/AdminTables/ProductTable";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";

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
