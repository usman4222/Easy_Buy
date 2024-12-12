import express from "express";
import { authorizeRole, isAuthenticatedUser } from "../middleware/authUser.js";
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

const router = express.Router();

router.post("/admin/create-product", authorizeRole("admin"), createProduct);
router.get("/get-product", getProducts);
router.get("/admin/products", authorizeRole("admin"), getAdminProducts);
router.put("/admin/update-product/:id", authorizeRole("admin"), updateProduct);
router.delete(
  "/admin/delete-product/:id",
  authorizeRole("admin"),
  deleteProduct
);
router.get("/product-detail/:id", getProductDetails);
router.put("/create-product-review", createProductReview);
router.get("/get-product-reviews/:id", getAllReviewsOfProduct);
// .delete(deleteReview, isAuthenticatedUser)

export default router;
