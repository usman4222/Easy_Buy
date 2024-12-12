import express from "express";
import { isAuthenticatedUser, authorizeRole } from "../middleware/authUser.js";
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
const router = express.Router();

router.route("/new-order").post(newOrder);
router.route("/order-detail/:id").get(getSingleOrder);
router.route("/my-orders").get(myOrders);
router.route("/admin/orders").get(authorizeRole("admin"), getAllOrders);
router
  .route("/admin/update-order-status/:id")
  .put(authorizeRole("admin"), updateOrder);
router
  .route("/admin/delete-order/:id")
  .delete(authorizeRole("admin"), deleteOrder);

export default router;
