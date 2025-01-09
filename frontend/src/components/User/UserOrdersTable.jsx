import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { MdOutlineReadMore } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../MetaData";

const UserOrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const { orders, error } = useSelector((state) => state.myOrders);

  const { loading } = useSelector((state) => state.userProfile);

  const userId = currentUser?._id;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (userId) {
      dispatch(myOrders(userId));
    }
  }, [error, dispatch]);

  const orderInfo = (id) => {
    navigate(`/my-order-info/${id}`);
  };

  return (
    <div className="h-[100vh] overflow-x-auto p-10">
      <MetaData title="My Orders" />
      <ToastContainer />
      <table className="w-full table-auto bg-[#f3f3f3] rounded-[12px]">
        <thead>
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Order Id</th>
            <th className="p-4 text-left">Ordered By</th>
            <th className="p-4 text-left">Total Price</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Shipping Price</th>
            {/* <th className="p-4 text-left">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center p-4 text-gray-500">
                There is no ordes for now!
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td className="p-4">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-4">{order._id}</td>
                <td className="p-4">{currentUser.username}</td>
                <td className="p-4">{order.totalPrice}</td>
                <td className="p-4">{order.orderStatus}</td>
                <td className="p-4">{order.shippingPrice}</td>
                {/* <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => orderInfo(order._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdOutlineReadMore />
                  </button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrdersTable;
