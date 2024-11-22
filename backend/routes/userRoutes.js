import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateInfo,
} from "../controller/userController.js";
import { ValidateUserId, verifyAdmin } from "../middleware/user.js";
import orderRouter from "./orderRoutes.js";
import orderDetailRouter from "./orderDetailRoutes.js";
const userRouter = express.Router();

userRouter.get("/", verifyAdmin, getAllUsers); //will be admin protected

userRouter.param("id", ValidateUserId); //this will be called before each route that has id in the path

userRouter.get("/:id", verifyAdmin, getUserById); //will be admin protected
userRouter.put("/:id", updateInfo); //not admin protected
userRouter.delete("/:id", verifyAdmin, deleteUser); //will be admin protected

userRouter.use("/:id/order", orderRouter);
userRouter.use("/:id/order_details", orderDetailRouter);

export default userRouter;
