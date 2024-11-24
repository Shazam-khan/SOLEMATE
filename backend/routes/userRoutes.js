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
import paymentRouter from "./paymentRoutes.js";
import { getAllOrderDetails } from "../controller/orderDetailsController.js";
const userRouter = express.Router();

userRouter.get("/", verifyAdmin, getAllUsers); //will be admin protected

userRouter.param("userId", ValidateUserId); //this will be called before each route that has id in the path

userRouter.get("/:userId", verifyAdmin, getUserById); //will be admin protected
userRouter.put("/:userId", updateInfo); //not admin protected
userRouter.delete("/:userId", verifyAdmin, deleteUser); //will be admin protected

userRouter.use("/:userId/order", orderRouter);
userRouter.use("/:userId/order_details", orderDetailRouter);
userRouter.use("/:userId", paymentRouter);

userRouter.get(
  "/:userId/order/:orderId/details",
  getAllOrderDetails // Attach the controller
);
export default userRouter;
