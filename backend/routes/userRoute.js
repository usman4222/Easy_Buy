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
import { verifyToken } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/logout", signOut);
router.get("/me", verifyToken, getUserDetails);
router.put("/me/update/:userId", verifyToken, updateUserDetails);
router.get("/admin/users", verifyToken, getAllUsers);
router.get("/admin/user/:userId", verifyToken, getSingleUser);
router.put("/admin/user/:userId/role", verifyToken, updateUserRole);
router.delete("/admin/user/:userId", verifyToken, deleteUser);

export default router;
