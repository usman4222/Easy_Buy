import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import Heading from "../../../components/Heading";
import AllOrdersTable from "../../../components/AdminTables/AllOrdersTable";

const AllOrders = () => {
  return (
    <Layout>
      <div className="py-3 px-5  bg-[#f5f5fa]">
        <Heading page={"Orders"} />
        <div className="flex justify-between items-center  flex-wrap">
          <h2 className="text-[#1E293B] font-montserrat text-2xl font-bold leading-6 my-5">
            All Orders
          </h2>
        </div>
      </div>
      <div className="px-5 bg-[#f5f5fa]">
        <AllOrdersTable />
      </div>
    </Layout>
  );
};

export default AllOrders;
