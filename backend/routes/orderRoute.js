import express from "express";
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authUser.js";
const router = express.Router();

router.route("/new-order").post(newOrder);
router.route("/order-detail/:id").get(getSingleOrder);
router.route("/my-orders").get(verifyToken, myOrders);
router.route("/admin/orders").get(verifyToken, getAllOrders);
router
  .route("/admin/update-order-status/:id")
  .put(verifyToken, updateOrder); 
router
  .route("/admin/delete-order/:id")
  .delete(verifyToken, deleteOrder);

export default router;
