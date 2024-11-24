import { db } from "../DB/connect.js";
import { v4 as uuid } from "uuid";
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
  const { orderId } = req.params; // Extract user id and order id (oId might be undefined)
  const { quantity, p_id, size, userId } = req.body;

  try {
    // Check if product exists
    await db.query("BEGIN");
    const productExists = await db.query(
      `SELECT p_id FROM Product WHERE p_id = $1`,
      [p_id]
    );
    if (productExists.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        OrderDetails: null,
      });
    }

    // Get product price
    const orderPrice = await db.query(`SELECT * FROM Product WHERE p_id = $1`, [
      p_id,
    ]);
    const odPrice = orderPrice.rows[0].price;

    // Generate a new order detail ID
    const odId = uuid();

    if (!orderId) {
      // Handle the user-level route: "/users/:id/order_details"
      return res.status(400).json({
        message: "Order ID (oId) is required for creating order details.",
        error: true,
      });
    }

    // Insert new order detail linked to the specified order
    const result = await db.query(
      `INSERT INTO order_details (od_id, quantity, od_price, product_p_id, order_o_id, user_id,size) 
       VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`,
      [odId, quantity, odPrice, p_id, orderId, userId, size]
    );

    const newOrderDetail = result.rows[0];

    // Update the total amount in the Order table
    const updatedTotal = await db.query(
      `UPDATE "Order" 
       SET total_amount = (SELECT SUM(quantity * od_price) 
                           FROM order_details 
                           WHERE order_o_id = $1) 
       WHERE o_id = $1 
       RETURNING *`,
      [orderId]
    );

    const Psize = await db.query(
      `SELECT * FROM "P_Size" WHERE product_id = $1`,
      [id]
    );

    const stock = Psize.rows[0].stock;

    if (quantity > stock) {
      return res.status(400).json({
        message: "Not enough stock",
        error: true,
        Orders: null,
        OrderDetails: null,
      });
    }

    const updatedStock = stock - quantity;

    await db.query(`UPDATE "P_Size SET stock = $1 WHERE product_id = $2"`, [
      updatedStock,
      p_id,
    ]);

    await db.query("COMMIT");

    return res.status(201).json({
      message: "Order detail created",
      error: false,
      OrderDetails: newOrderDetail,
      Order: updatedTotal.rows[0],
      UserId: id, // Include user id for reference
    });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error(error);
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
