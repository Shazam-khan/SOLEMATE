import express from "express";

import {
  getOrderDetailById,
  createOrderDetail,
  patchDetail,
  deleteDetail,
  getAllOrderDetailsByoId,
} from "../controller/orderDetailsController.js";

import { verifyOrderDetail } from "../middleware/OrderDetail.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const orderDetailRouter = express.Router({ mergeParams: true });

orderDetailRouter.get("/", authenticateUser, getAllOrderDetailsByoId);
orderDetailRouter.post("/", authenticateUser, createOrderDetail);

orderDetailRouter.param("od_id", verifyOrderDetail);

orderDetailRouter.get("/:od_id", authenticateUser, getOrderDetailById);
orderDetailRouter.put("/:od_id", authenticateUser, patchDetail);
orderDetailRouter.delete("/:od_id", authenticateUser, deleteDetail);

export default orderDetailRouter;
