import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  patchOrder,
  deleteOrder,
} from "../controller/orderController.js";
import { verifyOrderId } from "../middleware/Order.js";
import orderDetailRouter from "./orderDetailRoutes.js";

const orderRouter = express.Router({ mergeParams: true });

// Middleware to verify orderId when present
orderRouter.param("orderId", verifyOrderId);

// Routes for managing orders
orderRouter.get("/", getAllOrders); // Fetch all orders or filter by userId
orderRouter.post("/", createOrder); // Create a new order
orderRouter.get("/:orderId", getOrderById); // Get order by orderId
orderRouter.put("/:orderId", patchOrder); // Update an order
orderRouter.delete("/:orderId", deleteOrder); // Delete an order

// Nested routes for order details
orderRouter.use("/:orderId/order_details", orderDetailRouter);

// Integrate orderRouter into user-specific routes
const userRouter = express.Router();
userRouter.use("/:userId/order", orderRouter); // Prefix order routes with user context

export default userRouter;
