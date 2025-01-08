import React, { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../../actions/orderAction";
import MetaData from "../MetaData";

const UserOrderInfo = () => {
  const { error, order, isUpdated, updateError, loading } = useSelector(
    (state) => state.singleOrderDetails
  );
  const { currentUser } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  

  useEffect(() => {
      dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  

  if (loading || !order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:p-20 p-5 h-auto">
      <ToastContainer />
      <MetaData title={`${order._id}'s Detail`} />
      <div className="bg-[#f3f3f3] p-[52px] rounded-[12px]">
        <div className=" w-full flex-col xl:flex-row flex gap-20 items-center justify-between">
          <div className=" flex flex-col sm:flex-row justify-between w-full">
            <div className="flex flex-col gap-[12px] my-3">
              <h4 className="text-black font-inter text-lg font-semibold">
                Order ID: {order._id}
              </h4>
              <h6 className="text-gray-500 font-inter text-base font-medium">
                Ordered At:{" "}
                {new Date(order.createdAt).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h6>

              <div className="flex items-center gap-[12px]">
                <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                  Order Status:
                </h6>
                <div className="flex w-fit p-[6px_14px] rounded-[20px] bg-[rgba(209,250,229,0.5)] ">
                  <span className="text-[#059691] font-inter text-base font-medium">
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-[12px]">
                <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                  Amount Status:
                </h6>
                <div className="flex w-fit p-[6px_14px] rounded-[20px] bg-[rgba(209,250,229,0.5)] ">
                  <span className="text-[#059691] font-inter text-base font-medium">
                    {order?.paymentInfo?.status || "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#E9E9E9] rounded-full w-[189.004px] h-[189.004px] flex justify-center items-center my-3">
              <img src={currentUser.profileImage} alt="user" />
            </div>
          </div>
          <div className="flex  flex-col xl:flex-row  justify-between w-full xl:items-center gap-5  ">
            <div className="flex flex-col gap-[5.94px]">
              <h4 className="text-[#1E293B] font-inter text-2xl font-semibold leading-[28px]">
                {currentUser.username}
              </h4>
              <div className="flex items-center gap-[12px]">
                <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                  Order By:
                </h6>
                <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                  {currentUser._id}
                </span>
              </div>
              <div className="flex items-center gap-[12px]">
                <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                  Email:
                </h6>
                <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                  {currentUser.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-[60px] mt-[50px]">
          <div className="flex w-full flex-col gap-[5.94px]">
            <h4 className="text-[#1E293B] font-inter text-2xl font-semibold leading-[28px]">
              Order Items
            </h4>
            {order?.orderItems?.map((item, index) => (
              <div
                key={item._id}
                className="flex flex-col gap-2 border-b border-[#E2E8F0] pb-2"
              >
                <div className="flex justify-between items-center">
                  <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                    Product Name
                  </h6>
                  <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                    {item.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                    Quantity
                  </h6>
                  <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                    Price
                  </h6>
                  <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                    ${item.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                    Total
                  </h6>
                  <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                    {item.quantity} * ${item.price} = $
                    {item.price * item.quantity}
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                Shipping Charges
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                ${order.shippingPrice}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                Tax Charges
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
              `${(order?.taxPrice ?? 0).toFixed(2)}`
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                Paid Amount
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                ${order.totalPrice}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-[5.94px]">
            <h4 className="text-[#1E293B] font-inter text-2xl font-semibold leading-[28px]">
              Shipping Information
            </h4>
            <div className="flex 2xl:flex-row flex-col 2xl:items-center justify-between">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                Address:
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                {order.shippingInfo.address}
              </span>
            </div>
            <div className="flex 2xl:flex-row flex-col 2xl:items-center justify-between">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                City:
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                {order.shippingInfo.city}
              </span>
            </div>
            <div className="flex 2xl:flex-row flex-col 2xl:items-center justify-between">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                Province:
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                {order.shippingInfo.state}
              </span>
            </div>
            <div className="flex 2xl:flex-row flex-col 2xl:items-center justify-between">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                Postal Code:
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                {order.shippingInfo.pinCode}
              </span>
            </div>
            <div className="flex 2xl:flex-row flex-col 2xl:items-center justify-between">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                Country:
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                {order.shippingInfo.country}
              </span>
            </div>
            <div className="flex 2xl:flex-row flex-col 2xl:items-center justify-between">
              <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                Phone Number:
              </h6>
              <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                {order.shippingInfo.phoneNo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderInfo;
