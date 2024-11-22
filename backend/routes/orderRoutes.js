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

// Order routes
orderRouter.get("/", getAllOrders);
orderRouter.post("/", createOrder);

// Update to use 'orderId' for clarity
orderRouter.param("orderId", verifyOrderId);

orderRouter.get("/:orderId", getOrderById);
orderRouter.put("/:orderId", patchOrder);
orderRouter.delete("/:orderId", deleteOrder);

// Nested order detail routes
orderRouter.use("/:orderId/order_details", orderDetailRouter);

export default orderRouter;
