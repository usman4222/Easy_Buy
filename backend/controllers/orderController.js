import catchAsyncError from "../middleware/catchAsyncError.js"
import ErrorHandler from "../middleware/error.js";
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import mongoose from "mongoose"

export const newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    // Check if the order with the same paymentInfo.id already exists
    const existingOrder = await Order.findOne({ 'paymentInfo.id': paymentInfo.id });
    if (existingOrder) {
        return res.status(200).json({
            success: true,
            message: "Order already exists",
            order: existingOrder
        });
    }

    // Format order items
    const formattedOrderItems = orderItems.map(item => ({
        ...item,
        product: new mongoose.Types.ObjectId(item.product) 
    }));

    // Create a new order
    const order = await Order.create({
        shippingInfo,
        orderItems: formattedOrderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id 
    });

    res.status(201).json({
        success: true,
        order
    });
});



//get single order 
export const getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("Order Not found with this ID", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


//get orders who logged  
export const myOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })
})


//get All Orders --Admin 
export const getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})


//update order status --Admin 

export const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already Delivered this Order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    });
});


async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.stock -= quantity

    await product.save({ validateBeforeSave: false })
}


//Delete Order --Admin 
export const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    await Order.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
    });
});
