import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../redux/productSlice/cartSlice";

//add item on cart

let apiurl = "https://easy-buy-s9rh.vercel.app"
// let apiurl = "http://localhost:4000"

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`${apiurl}/api/product/product-detail/${id}`)
    dispatch(ADD_TO_CART({
        productId: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        image: data.product.image,
        quantity
    }));

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}



//remove from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch(REMOVE_CART_ITEM(id))
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


//save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch(SAVE_SHIPPING_INFO(data))

    localStorage.setItem("shippingInfo", JSON.stringify(data))
}


