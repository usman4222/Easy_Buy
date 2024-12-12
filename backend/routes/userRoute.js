import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  signIn,
  signOut,
  signUp,
  updateUserDetails,
  updateUserRole,
} from "../controllers/userControlller.js";
import { authorizeRole, isAuthenticatedUser } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/logout", signOut);
router.get("/me/:userId", getUserDetails);
router.put("/me/update/:userId", updateUserDetails);
router.get("/admin/users", authorizeRole("admin"), getAllUsers);
router.get("/admin/user/:userId", authorizeRole("admin"), getSingleUser);
router.put("/admin/user/:userId/role", authorizeRole("admin"), updateUserRole);
router.delete("/admin/user/:userId", authorizeRole("admin"), deleteUser);

export default router;
