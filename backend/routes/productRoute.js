import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllReviewsOfProduct,
  getProductDetails,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../middleware/authUser.js";

const router = express.Router();

router.post("/admin/create-product", verifyToken, createProduct);
router.get("/get-product", getProducts);
router.get("/admin/products", verifyToken, getAdminProducts);
router.put("/admin/update-product/:id",verifyToken,  updateProduct);
router.delete(
  "/admin/delete-product/:id",
  verifyToken,
  deleteProduct
);
router.get("/product-detail/:id", getProductDetails);
router.put("/create-product-review", verifyToken, createProductReview);
router.get("/get-product-reviews/:id", getAllReviewsOfProduct);
// .delete(deleteReview, isAuthenticatedUser)

export default router;
