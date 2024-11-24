// orderRoutes.js
import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  patchOrder,
  deleteOrder,
  getCurrentOrder, // Import this
} from "../controller/orderController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import orderDetailRouter from "./orderDetailRoutes.js";

const orderRouter = express.Router({ mergeParams: true });

// Define routes
orderRouter.get("/current", authenticateUser, getCurrentOrder); // Ensure /current comes before /:orderId
orderRouter.get("/", authenticateUser, getAllOrders);
orderRouter.post("/", authenticateUser, createOrder);
orderRouter.get("/:orderId", authenticateUser, getOrderById);
orderRouter.put("/:orderId", authenticateUser, patchOrder);
orderRouter.delete("/:orderId", authenticateUser, deleteOrder);

// Nested routes for order details
orderRouter.use("/:orderId/order_details", orderDetailRouter);

export default orderRouter;
