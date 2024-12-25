import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { getAllOrders } from "../../actions/orderAction";

const AllOrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders } = useSelector((state) => state.allOrders);

  const { loading } = useSelector(
    (state) => state.userProfile
  );


  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const orderInfo = (id) => {
    navigate(`/order-info/${id}`);
  };


  return (
    <div className="h-[100vh] overflow-x-auto">
      <table className="w-full table-auto bg-[#F8FAFC] rounded-[12px]">
        <thead>
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Order Id</th>
            <th className="p-4 text-left">Ordered At</th>
            <th className="p-4 text-left">Ordered By</th>
            <th className="p-4 text-left">Paid At</th>
            <th className="p-4 text-left">Total Price</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Shipping Price</th>
            <th className="p-4 text-left">Actions</th>
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
                There is no ordes fo now!
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="p-4">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-4">{order._id}</td>
                <td className="p-4">{order.createdAt}</td>
                <td className="p-4">{order.user}</td>
                <td className="p-4">{order.paidAt}</td>
                <td className="p-4">{order.totalPrice}</td>
                <td className="p-4">{order.orderStatus}</td>
                <td className="p-4">{order.shippingPrice}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => orderInfo(order._id)} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrdersTable;
