import { db } from "../DB/connect.js";
import { v4 as uuid } from "uuid";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await db.query("SELECT * FROM Order");
    if (orders.rows.length == 0) {
      return res
        .status(404)
        .json({ message: "No orders found", error: false, Orders: null });
    }
    return res
      .status(200)
      .json({ message: "Orders found", error: false, Orders: orders.rows });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching orders", error: true, Orders: null });
  }
};

export const getOrderById = async (req, res) => {
  return res
    .status(200)
    .json({ message: "Order found", error: false, Orders: req.order });
};

export const createOrder = async (req, res) => {
  const { orderDate, promisedDate, address, userId, od_id } = req.body;
  if (!orderDate || !promisedDate || !address || !userId || !od_id) {
    return res.status(400).json({
      message: "Please fill in all fields",
      error: true,
      Orders: null,
    });
  }
  try {
    const existingUser = await db.query(
      `SELECT u_id FROM 'Users' WHERE u_id = $1`,
      [userId]
    );
    if (existingUser.rows.length == 0) {
      return res
        .status(404)
        .json({ message: "User not found", error: true, Orders: null });
    }

    const oId = uuid(); //generate random ID
    // Insert the new order with default total value 0
    const result = await db.query(
      `INSERT INTO "Order" (o_id,order_date, promised_date, address, total, user_id) 
       VALUES ($1, $2, $3, $4, 0, $5) RETURNING *`,
      [oId, orderDate, promisedDate, address, userId]
    );

    //Update the order_details table with the order_id
    const orderDetails = db.query(
      `UPDATE order_details SET o_id = $1 WHERE od_id = $2`,
      [oId, od_id]
    );

    const newOrder = result.rows[0];
    return res
      .status(201)
      .json({ message: "Order created", error: false, Orders: newOrder });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating order", error: true, Orders: null });
  }
};

export const patchOrder = async (req, res) => {
  const { id } = req.params;
  const { promisedDate, address, total } = req.body;

  try {
    // Build dynamic query based on provided fields
    const fields = [];
    const values = [];
    let index = 1;

    if (promisedDate) {
      fields.push(`promised_date = $${index++}`);
      values.push(promisedDate);
    }
    if (address) {
      fields.push(`address = $${index++}`);
      values.push(address);
    }
    if (total !== undefined) {
      // if total is provided, update it
      fields.push(`total = $${index++}`);
      values.push(total);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "No fields to update", error: true });
    }

    values.push(id); // add the id as the last parameter for the WHERE clause
    const query = `UPDATE "Order" SET ${fields.join(
      ", "
    )} WHERE o_id = $${index} RETURNING *`;

    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Order not found", error: true, Orders: null });
    }

    const updatedOrder = result.rows[0];
    return res
      .status(200)
      .json({ message: "Order updated", error: false, Orders: updatedOrder });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error updating order", error: true, Orders: null });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Order WHERE id = $1", [id]);
    return res
      .status(204)
      .json({ message: "Order deleted", error: false, Orders: null });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server Error", error: true, Orders: null });
  }
};

export const getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await db.query(`SELECT * FROM order_details`);
    if (orderDetails.rows.length === 0) {
      return res.status(404).json({
        message: "No record found",
        error: false,
        OrderDetails: null,
      });
    }
    return res.status(200).json({
      message: "Order details retrieved",
      error: false,
      OrderDetails: orderDetails.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      OrderDetails: null,
    });
  }
};

export const getOrderDetailById = async (req, res) => {
  return res.status(200).json({
    message: "Record Found",
    error: false,
    OrderDetails: req.orderDetails,
  });
};

export const createOrderDetail = async (req, res) => {
  const { quantity, odPrice, p_id } = req.body;
  try {
    //TODO: Complete order_details CRUD, test all order related endpoints
    // Check if product exists
    const productExists = await db.query(
      `SELECT p_id FROM "Products" WHERE p_id = $1`,
      [p_id]
    );
    if (productExists.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        OrderDetails: null,
      });
    }

    const odId = uuid();
    const temp_oid = "TBA";
    // Insert new order detail
    const result = await db.query(
      `INSERT INTO order_details (od_id ,quantity, od_price, p_id, o_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [odId, quantity, odPrice, p_id, temp_oid]
    );

    const newOrderDetail = result.rows[0];
    return res.status(201).json({
      message: "Order detail created",
      error: false,
      OrderDetails: newOrderDetail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating order detail",
      error: true,
      OrderDetails: null,
    });
  }
};

export const patchDetail = async (req, res) => {
  const { od_id } = req.params;
  const { quantity, odPrice } = req.body;

  try {
    // Build dynamic query based on provided fields
    const fields = [];
    const values = [];
    let index = 1;

    if (quantity !== undefined) {
      fields.push(`quantity = $${index++}`);
      values.push(quantity);
    }
    if (odPrice !== undefined) {
      fields.push(`od_price = $${index++}`);
      values.push(odPrice);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "No fields to update", error: true });
    }

    values.push(od_id); // Add the id as the last parameter for the WHERE clause
    const query = `UPDATE order_details SET ${fields.join(
      ", "
    )} WHERE od_id = $${index} RETURNING *`;

    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order detail not found",
        error: true,
        OrderDetails: null,
      });
    }

    const updatedOrderDetail = result.rows[0];
    return res.status(200).json({
      message: "Order detail updated",
      error: false,
      OrderDetails: updatedOrderDetail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating order detail",
      error: true,
      OrderDetails: null,
    });
  }
};

export const deleteDetail = async (req, res) => {
  const { od_id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM order_details WHERE od_id = $1 RETURNING *",
      [od_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order detail not found",
        error: true,
        OrderDetails: null,
      });
    }

    return res.status(200).json({
      message: "Order detail deleted",
      error: false,
      OrderDetails: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error deleting order detail",
      error: true,
      OrderDetails: null,
    });
  }
};
