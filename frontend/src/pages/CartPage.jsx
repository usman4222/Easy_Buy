import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../actions/cartAction";
import animation from "../assets/images/animation.gif";
import MetaData from "../components/MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const cartItemsInRedux = useSelector((state) => state.cart.cartItems);
  const subtotal = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
    0
  );
  const grandTotal = subtotal;

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkOutHandle = () => {
    const cartItemsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
  
    if ((cartItemsInRedux.length === 0 && !cartItemsInLocalStorage) || (cartItemsInLocalStorage && cartItemsInLocalStorage.length === 0)) {
      toast("Please fill your cart to proceed!");
    } else {
      navigate("/shipping");
    }
  };
  

  return (
    <div className="px-5 md:px-10 lg:px-20 pt-10 pb-20">
      <ToastContainer />
      <MetaData title="Cart" />
      <h2 className="text-[32px] sm:text-[40px] leading-[36px] sm:leading-[48px] font-medium text-gray-800 font-sans pb-5">
        Cart
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product List */}
        {cartItems.length === 0 ? (
          <div className="flex-1 text-center space-y-6">
            <div className="flex justify-center py-10">
              <img src={animation} alt="" />
            </div>
            <Link
              to="/product-category"
              className="text-lg text-blue-500 hover:underline"
            >
              Fill your Cart here
            </Link>
          </div>
        ) : (
          <div className="flex-1 space-y-6">
            {/* Product List */}
            {cartItems.map((product) => (
              <div
                key={product.product}
                className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white border-b rounded-lg shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-base sm:text-lg font-medium">
                    Quantity: {product.quantity}
                  </p>
                  <p className="mt-1 text-base sm:text-lg font-medium">
                    Price: ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-lg font-semibold">
                    Total: ${(product.price * product.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(product.productId)}
                    className="mt-2 px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-5 shadow-md rounded-lg space-y-4 h-52">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Order Summary
          </h3>
          <div className="flex justify-between text-gray-700 text-sm sm:text-base">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {/* <div className="flex justify-between text-gray-700 text-sm sm:text-base">
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div> */}
          {/* <div className="flex justify-between font-semibold text-gray-900 text-sm sm:text-base">
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div> */}
          <button
            onClick={checkOutHandle}
            className="w-full mt-5 px-4 py-2 text-white bg-primaryRed rounded hover:bg-primaryRed-dark"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
