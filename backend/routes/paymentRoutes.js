import express from "express";
import {
  createPayment,
  updatePaymentStatus,
  getAllPayments,
  getPaymentById,
} from "../controller/paymentController.js";

const paymentRouter = express.Router();

// Create a new payment for an order
paymentRouter.post("/order/:orderId/payments", createPayment);

// Update payment status
paymentRouter.put("/order/:orderId/payments/:paymentId", updatePaymentStatus);

// Get all payments for all orders
paymentRouter.get("/order/:orderId/payments", getAllPayments);

// Get a specific payment
paymentRouter.get("/order/:orderId/payments/:paymentId", getPaymentById);

export default paymentRouter;
