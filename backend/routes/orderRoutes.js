import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  patchOrder,
  deleteOrder,
  getAllOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  patchDetail,
  deleteDetail,
} from "../controller/orderController.js";
import { verifyOrderDetail, verifyOrderId } from "../middleware/Order.js";

const orderRouter = express.Router({ mergeParams: true });

//order routes
orderRouter.get("/", getAllOrders);
orderRouter.post("/", createOrder);

orderRouter.param("id", verifyOrderId);

orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", patchOrder);
orderRouter.delete("/:id", deleteOrder);

//order detail routes
orderRouter.get("/:id/order_details/", getAllOrderDetails);
orderRouter.post("/:id/order_detail/", createOrderDetail);

orderRouter.param("od_id", verifyOrderDetail);

orderRouter.get("/:id/order_details/:od_id", getOrderDetailById);
orderRouter.put("/:id/order_details/:od_id", patchDetail);
orderRouter.delete("/:id/order_details/:od_id", deleteDetail);
