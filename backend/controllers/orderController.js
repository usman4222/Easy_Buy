import catchAsyncError from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Log request user
  console.log("Request User:", req.user);

  if (!req.user || !req.user.userId) {
    return res.status(400).json({
      success: false,
      message: "User information is missing from the request",
    });
  }

  const existingOrder = await Order.findOne({
    "paymentInfo.id": paymentInfo.id,
  });

  if (existingOrder) {
    return res.status(200).json({
      success: true,
      message: "Order already exists",
      order: existingOrder,
    });
  }

  const formattedOrderItems = orderItems.map((item) => ({
    ...item,
    product: new mongoose.Types.ObjectId(item.product),
  }));

  const order = await Order.create({
    shippingInfo,
    orderItems: formattedOrderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.userId,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(ErrorHandler(404, "Order Not found with this ID"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get orders who logged
export const myOrders = catchAsyncError(async (req, res, next) => {
  
  const orders = await Order.find({ user: req.params.userId });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get All Orders --Admin
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(ErrorHandler(403, "You are not allowed to get orders"));
  }

  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update order status --Admin

export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!req.user || req.user.role !== "admin") {
    return next(ErrorHandler(403, "You are not allowed to update order"));
  }

  if (!order) {
    return next(ErrorHandler(404, "Order not found with this ID"));
  }

  if (order.orderStatus === "Delivered") {
    return next(ErrorHandler(400, "You have already Delivered this Order"));
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
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//Delete Order --Admin
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!req.user || req.user.role !== "admin") {
    return next(ErrorHandler(403, "You are not allowed to del order"));
  }

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  await Order.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
});
