import React, { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import Layout from "../Layout";
import Heading from "../Heading";
import BackButton from "../BackButton";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearErrors,
  deleteOrder,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { useNavigate, useParams } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { DELETE_PRODUCT_RESET } from "../../redux/productSlice/deleteProductSlice";

const OrderInfo = () => {
  const { error, order, isUpdated, updateError, loading } = useSelector(
    (state) => state.singleOrderDetails
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.delOrder
  );
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate()

  console.log("admin order", order);

  const { id } = useParams();

  useEffect(() => {
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch(UPDATE_ORDER_RESET());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/orders")
      dispatch(DELETE_PRODUCT_RESET());
    }
    dispatch(getOrderDetails(id));
  }, [error, alert, id, dispatch, isUpdated, updateError]);

  const updateOrderHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
    toast.success("Order Updated Successfully!");
    navigate("/orders")
  };

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <Layout>
      <div className="p-5 bg-[#F1F5F9] h-auto">
        <ToastContainer />
        <div>
          <Heading page={"Order Details"} />
          <div className="flex flex-wrap justify-between items-center  ">
            <div className="flex items-center gap-[20px] my-[14px]">
              <BackButton path={"/orders"} />
              <h2 className="text-[#1E293B] font-montserrat text-2xl font-bold leading-6 ">
                Order Details
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-[24px] rounded-[12px]">
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
                      {order.paymentInfo && order.paymentInfo.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-[12px]">
                  <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                    Process Order:
                  </h6>
                  <div className="flex w-fit p-[6px_14px] rounded-[20px]  ">
                    <form
                      className=" flex items-center gap-3"
                      encType="multipart/form-data"
                      onSubmit={updateOrderHandler}
                    >
                      <div className="flex items-center gap-3 border px-2 rounded-lg">
                        <RxUpdate />
                        <select
                          className="px-3 py-2 focus:outline-none"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option>Choose Category</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}
                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>
                      <button
                        id="createProductBtn"
                        type="submit"
                        className="text-[#fff] font-inter text-base font-medium bg-[#059691] rounded-full px-3 py-2"
                        disabled={
                          loading ? true : false || status === "" ? true : false
                        }
                      >
                        Confirm
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-[#E9E9E9] rounded-full w-[189.004px] h-[189.004px] flex justify-center items-center my-3">
                <RiUserLine className="text-[75.792px]" />
              </div>
            </div>
            <div className="flex  flex-col xl:flex-row  justify-between w-full xl:items-center gap-5  ">
              <div className="flex flex-col gap-[5.94px]">
                <h4 className="text-[#1E293B] font-inter text-2xl font-semibold leading-[28px]">
                  Hamid Nawaz
                </h4>
                <div className="flex items-center gap-[12px]">
                  <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                    Order By:
                  </h6>
                  <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                    34562342363474
                  </span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                    Email:
                  </h6>
                  <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                    email@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <h6 className="text-[#B0B0B0] font-inter text-[16.389px] font-medium leading-[22px]">
                    Role:
                  </h6>
                  <span className="text-[#14171D] font-inter text-lg font-normal leading-[22px]">
                    user
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-8 my-3">
                <button className=" text-[#5D5FEF] font-inter text-base font-medium leading-[20px]  p-[18px_26px] justify-center items-center gap-[4px] rounded-[9px] border stroke-[#E2E8F0] border-[#E2E8F0] bg-white">
                  Download info
                </button>
                <button
                  onClick={() => deleteOrderHandler(order._id)}
                  className=" text-[#5D5FEF] text-xl p-[18px_26px] justify-center items-center gap-[4px] rounded-[9px] border stroke-[#E2E8F0] border-[#E2E8F0] bg-white"
                >
                  <RiDeleteBin5Fill />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-[60px] mt-[50px]">
            <div className="flex w-full flex-col gap-[5.94px]">
              <h4 className="text-[#1E293B] font-inter text-2xl font-semibold leading-[28px]">
                Order Items
              </h4>
              {order.orderItems.map((item, index) => (
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
                  ${order.taxPrice.toFixed(2)}
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
                  State:
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
    </Layout>
  );
};

export default OrderInfo;
