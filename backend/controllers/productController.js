import mongoose from "mongoose";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Product from "../models/productModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { ErrorHandler } from "../middleware/error.js";

export const createProduct = catchAsyncError(async (req, res, next) => {
  const {
    name,
    description,
    price,
    category,
    stock,
    ratings,
    image,
    numOfReviews,
    discount,
    reviews,
  } = req.body;

  if (!name || !description || !price || !category || stock === undefined) {
    return next(ErrorHandler(400, "Please provide all required fields"));
  }

  if (!req.user || req.user.role !== "admin") {
    return next(ErrorHandler(403, "You are not allowed to create Products."));
  }

  const slugBase = `${name}-${category}`
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const slug = `${slugBase}-${Math.random().toString(36).substr(2, 6)}`;

  const newProduct = new Product({
    name,
    description,
    price,
    ratings: ratings || 0,
    slug,
    image: image || "product-img",
    category: category.toLowerCase(),
    stock,
    numOfReviews: numOfReviews || 0,
    discount,
    reviews: reviews || [],
    user: req.user.userId,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      product: savedProduct,
    });
  } catch (error) {
    next(error);
  }
});

export const getProducts = async (req, res, next) => {
  try {
    const resultPerPage = 10;

    const minPrice = req.query.minPrice || null;
    const maxPrice = req.query.maxPrice || null;

    const apiFeaturesForCount = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    const filteredProductsCount =
      await apiFeaturesForCount.query.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      message: "Route is working fine",
      products,
      totalProductsCount: await Product.countDocuments(),
      resultPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProducts = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return next(ErrorHandler(403, "You are not allowed to get Products"));
    }
    const products = await Product.find({ user: req.user.userId });
    

    if (!products || products.length === 0) {
      return next(ErrorHandler(400, "No products found for this admin."));
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = catchAsyncError(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(ErrorHandler(403, "You are not allowed to update Product."));
  }

  let product = Product.findById(req.params.id);

  if (!product) {
    return next(ErrorHandler(404, "Product Not found"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(ErrorHandler(403, "You are not allowed to del Products"));
  }

  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export const getProductDetails = catchAsyncError(async (req, res, next) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ErrorHandler(400, "Invalid ID format"));
  }

  const product = await Product.findById(id);

  if (!product) {
    return next(ErrorHandler(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  if (!rating || !comment || !productId) {
    return res.status(400).json({
      success: false,
      message: "Rating, comment, and product ID are required",
    });
  }

  console.log("req.user",req.user);
  

  if (!req.user) {
    return next(new Error("User not logged in."));
  }

  const review = {
    user: req.user.userId,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user && rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user && rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    reviews: product.reviews,
    message: "Review added successfully",
  });
});

export const getAllReviewsOfProduct = catchAsyncError(
  async (req, res, next) => {

    const productId = req.params.id;

    const product = await Product.findById(productId).populate({
      path: "reviews.user",
      select: "username email profileImage",
    });

    if (!product) {
      return next(new ErrorHandler("Product Not found", 404));
    }


    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(ErrorHandler(404, "Product Not found"));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
