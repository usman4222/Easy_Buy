import express from "express";
import { authorizeRole, isAuthenticatedUser } from "../middleware/authUser.js";
import { createProduct, createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllReviewsOfProduct, getProductDetails, getProducts, updateProduct } from "../controllers/productController.js";

const router = express.Router()

router.post('/admin/create-product',  isAuthenticatedUser, authorizeRole("admin"), createProduct )  
router.get('/get-product', getProducts )
router.get('/admin/products',  isAuthenticatedUser, authorizeRole("admin"), getAdminProducts )
router.put('/admin/update-product/:id',  isAuthenticatedUser, authorizeRole("admin"), updateProduct )
router.delete('/admin/delete-product/:id',  isAuthenticatedUser, authorizeRole("admin"), deleteProduct )
router.get('/product-detail/:id', getProductDetails )
router.put('/create-product-review', isAuthenticatedUser, createProductReview)
router.get('/get-product-reviews/:id', getAllReviewsOfProduct)
// .delete(deleteReview, isAuthenticatedUser)


export default router;