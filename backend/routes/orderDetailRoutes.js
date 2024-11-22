import express from "express";

import {
  getAllOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  patchDetail,
  deleteDetail,
} from "../controller/orderDetailsController.js";

import { verifyOrderDetail } from "../middleware/OrderDetail.js";

const orderDetailRouter = express.Router({ mergeParams: true });

orderDetailRouter.get("/", getAllOrderDetails);
orderDetailRouter.post("/", createOrderDetail);

orderDetailRouter.param("od_id", verifyOrderDetail);

orderDetailRouter.get("/:od_id", getOrderDetailById);
orderDetailRouter.put("/:od_id", patchDetail);
orderDetailRouter.delete("/:od_id", deleteDetail);

export default orderDetailRouter;
