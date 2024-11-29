import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout";
import Heading from "../../../components/Heading";
import AllUsersTable from "../../../components/AdminTables/AllUsersTable";

const AllUser = () => {
  return (
    <Layout>
      <div className="py-3 px-5  bg-[#f5f5fa]">
        <Heading page={"Users"} />
        <div className="flex justify-between items-center  flex-wrap">
          <h2 className="text-[#1E293B] font-montserrat text-2xl font-bold leading-6 my-5">
            All Users
          </h2>
        </div>
      </div>
      <div className="px-5 bg-[#f5f5fa]">
        <AllUsersTable />
      </div>
    </Layout>
  );
};

export default AllUser;
