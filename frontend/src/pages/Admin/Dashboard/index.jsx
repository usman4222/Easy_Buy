import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillProduct } from "react-icons/ai";
import Layout from "../../../components/Layout";

export default function Dashboard() {

  const { users } = useSelector((state) => state.allUsers);
  const { products } = useSelector((state) => state.allAdminProducts);

  const totalUsersCount = users ? users.length : 0; 
  
  

  return (
    <>
      <Layout>
        <main className="flex gap-5 p-[22px] bg-[#F1F5F9]">
          <div className=" w-full">
            <h2 className="text-2xl font-bold mb-[20px]">Dashboard</h2>
            <div className="lg:flex gap-[20px]">
              <div className="flex gap-[20px] flex-col w-full">
                <div className="rounded-[30px] bg-[#fff] flex flex-col gap-[20px]">
                  <div className="flex px-[30px] pt-[30px] justify-between items-center">
                    <div className="flex gap-[20px] items-center">
                      <div className="flex p-[23.308px] justify-center items-center  rounded-[7.769px] bg-[rgba(247,184,75,0.1)]">
                        <FaUsers className="text-2xl text-[#4E5564]" />
                      </div>

                      <div>
                        <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px]">
                          Total Users
                        </h6>
                        <h4 className="text-[#4E5564] font-montserrat text-[26px] md:text-[36px] font-semibold leading-[20px] mt-2">
                          {totalUsersCount}
                        </h4>
                      </div>
                    </div>
                    <Link to="/all-user">
                      <div className="hidden md:block">
                        <FaArrowRight className="text-2xl text-[#4E5564]" />
                      </div>
                    </Link>
                  </div>
                  <div className="px-[30px]">
                    <div className="bg-[#F4F4F4] px-[10px] ">
                      <h4 className="text-[#1E293B] font-montserrat text-[20px] font-semibold leading-[24px] py-[10px]">
                        Status
                      </h4>
                    </div>
                  </div>
                  <div className="px-[30px] ">
                    <div className="flex flex-col md:flex md:flex-row justify-between">
                      <div className="p-[18px] w-full flex flex-col gap-[10px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,81,175,0.1)]">
                        <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
                          Suspended
                        </h6>
                        <h4 className="text-[#1E293B] text-center font-montserrat text-[24px] font-medium leading-[36px]">
                          1,256
                        </h4>
                      </div>
                      <div className="p-[18px] w-full flex flex-col gap-[10px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,81,175,0.1)]">
                        <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
                          Struck off
                        </h6>
                        <h4 className="text-[#1E293B] text-center font-montserrat text-[24px] font-medium leading-[36px]">
                          1,256
                        </h4>
                      </div>
                      <div className="p-[18px] w-full flex flex-col gap-[10px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,81,175,0.1)]">
                        <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
                          Pending
                        </h6>
                        <h4 className="text-[#1E293B] text-center font-montserrat text-[24px] font-medium leading-[36px]">
                          1,256
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="px-[30px]">
                    <div className="bg-[#F4F4F4] px-[10px] ">
                      <h4 className="text-[#1E293B] font-montserrat text-[20px] font-semibold leading-[24px] py-[10px]">
                        Attendence
                      </h4>
                    </div>
                  </div>
                  <div className="px-[30px] pb-[30px]">
                    <div className="flex flex-col md:flex  md:flex-row justify-between">
                      <div className="p-[18px] w-full flex flex-col gap-[10px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,81,175,0.1)]">
                        <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
                          Present
                        </h6>
                        <h4 className="text-[#1E293B] text-center font-montserrat text-[24px] font-medium leading-[36px]">
                          1,256
                        </h4>
                      </div>
                      <div className="p-[18px] w-full flex flex-col gap-[10px]  rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,81,175,0.1)]">
                        <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
                          Absent
                        </h6>
                        <h4 className="text-[#1E293B] text-center font-montserrat text-[24px] font-medium leading-[36px]">
                          1,256
                        </h4>
                      </div>
                      <div className="p-[18px] w-full flex flex-col gap-[10px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,81,175,0.1)]">
                        <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] text-center">
                          On Leave
                        </h6>
                        <h4 className="text-[#1E293B] text-center font-montserrat text-[24px] font-medium leading-[36px]">
                          1,256
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="xl:flex gap-[20px] ">
                  <div className="rounded-[30px] bg-[#fff] flex flex-col gap-[20px] w-full">
                    <div className="px-[30px]  pt-[30px] flex justify-between items-center">
                      <div className="flex items-center gap-[20px]">
                        <div className="bg-[#4BDAF71A] p-[23.308px] flex justify-center items-center">
                          <img src="" alt="account" />
                        </div>
                        <div>
                          <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px]">
                            Accounts (Total Fee)
                          </h6>
                          <h4 className="text-[#1E293B] text-center font-montserrat text-[20px] md:text-[24px] font-medium leading-[26px] md:leading-[36px]">
                            Rs. 12930.00/-
                          </h4>
                        </div>
                      </div>
                      <Link to="/all-user">
                        <div className="hidden md:block">
                          <FaArrowRight className="text-2xl text-[#4E5564]" />
                        </div>
                      </Link>
                    </div>
                    <div className="px-[30px]">
                      <h4 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] pb-[8px]">
                        Received Amount
                      </h4>
                      <div className="flex items-center gap-[8px] ">
                        <div class="flex h-[10px] pr-[12px] justify-start items-center gap-[12px] flex-[1_0_0] rounded-[4px] bg-[#F8F8F8]">
                          <div class="w-[50%] bg-[#F7B84B] rounded-[4px] h-full"></div>
                        </div>
                        <div>
                          <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px]">
                            Rs. 124.00
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="px-[30px] pb-[30px]">
                      <h4 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px] pb-[8px]">
                        Pending Amount
                      </h4>
                      <div className="flex items-center gap-[8px]  ">
                        <div class="flex h-[10px] pr-[12px] justify-start items-center gap-[12px] flex-[1_0_0] rounded-[4px] bg-[#F8F8F8]">
                          <div class="w-[20%] bg-[#726BEA] rounded-[4px] h-full"></div>
                        </div>
                        <div>
                          <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px]">
                            Rs. 12134.00
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[20px] w-full mt-[20px] xl:mt-0">
                    <div className=" flex flex-col ">
                      <div className="flex px-[30px]  py-[20px] justify-between rounded-[30px] items-center bg-[#fff] ">
                        <div className="flex gap-[20px] items-center">
                          <div className="flex p-[23.308px] justify-center items-center  rounded-[7.769px] rounded-[var(--Border-Radius-4-px, 4px)] bg-[rgba(16,185,129,0.1)]">
                            <AiFillProduct className="text-xl text-[#4E5564]" />
                          </div>
                          <div>
                            <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px]">
                              Total Products
                            </h6>
                            <h4 className="text-[#4E5564] font-montserrat text-[26px] md:text-[36px] font-semibold leading-[20px] mt-2">
                              {products.length || 0}
                            </h4>
                          </div>
                        </div>
                        <Link to="/all-products">
                          <div className="hidden md:block">
                            <FaArrowRight className="text-2xl text-[#4E5564]" />
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className=" flex flex-col">
                      <div className="flex px-[30px] py-[20px] justify-between rounded-[30px] items-center bg-[#fff] ">
                        <div className="flex gap-[20px] items-center">
                          <div className="flex p-[23.308px] justify-center items-center  rounded-[7.769px] rounded-[var(--Border-Radius-4-px, 4px)] bg-[rgba(225,29,72,0.1)]">
                            <img src="" alt="users" />
                          </div>
                          <div>
                            <h6 className="text-[#4E5564] font-montserrat text-[16px] font-semibold leading-[20px]">
                              Upcoming Events
                            </h6>
                            <h4 className="text-[#4E5564] font-montserrat text-[26px] md:text-[36px] font-semibold leading-[20px] mt-2">
                              30
                            </h4>
                          </div>
                        </div>
                        <Link to="/all-user">
                          <div className="hidden md:block">
                            <FaArrowRight className="text-2xl text-[#4E5564]" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
