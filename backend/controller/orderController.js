import { db } from "../DB/connect.js";
import { v4 as uuid } from "uuid";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await db.query(`SELECT * FROM "Order"`);
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
  const { id } = req.params; // User ID
  const { orderDate, promisedDate, address, quantity, p_id, size } = req.body;

  if (!orderDate || !promisedDate || !address) {
    return res.status(400).json({
      message: "Please fill in all fields",
      error: true,
      Orders: null,
    });
  }

  try {
    const oId = uuid(); // Generate random ID for the order
    await db.query("BEGIN"); // Start transaction

    // Step 1: Insert into Order table
    const orderResult = await db.query(
      `INSERT INTO "Order" (o_id, order_date, promised_date, address, total_amount, user_u_id) 
       VALUES ($1, $2, $3, $4, 0, $5) RETURNING *`,
      [oId, orderDate, promisedDate, address, id]
    );

    // Step 2: Retrieve the price of the product
    const productResult = await db.query(
      `SELECT * FROM Product WHERE p_id = $1`,
      [p_id]
    );

    const Psize = await db.query(
      `SELECT * FROM "P_Size" WHERE product_id = $1`,
      [p_id]
    );
    if (productResult.rows.length === 0) {
      throw new Error("Invalid product ID");
    }
    const odPrice = productResult.rows[0].price;
    const stock = Psize.rows[0].stock;

    if (quantity > stock) {
      return res.status(400).json({
        message: "Not enough stock",
        error: true,
        Orders: null,
        OrderDetails: null,
      });
    }

    // Step 3: Insert into order_details table
    const odId = uuid(); // Generate random ID for order detail
    const orderDetailResult = await db.query(
      `INSERT INTO order_details (od_id, quantity, od_price, product_p_id, order_o_id,size) 
       VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`,
      [odId, quantity, odPrice, p_id, oId, size]
    );

    // Step 4: Update the total amount in the Order table
    const updatedTotal = await db.query(
      `UPDATE "Order" 
       SET total_amount = (SELECT SUM(quantity * od_price) 
                           FROM order_details 
                           WHERE order_o_id = $1) 
       WHERE o_id = $1 
       RETURNING *`,
      [oId]
    );

    const updatedStock = stock - quantity;

    await db.query(`UPDATE "P_Size SET stock = $1 WHERE product_id = $2"`, [
      updatedStock,
      p_id,
    ]);

    await db.query("COMMIT"); // Commit transaction

    return res.status(201).json({
      message: "Order created",
      error: false,
      Orders: updatedTotal.rows[0], // Final order with updated total
      OrderDetails: orderDetailResult.rows[0], // Inserted order detail
    });
  } catch (error) {
    await db.query("ROLLBACK"); // Rollback transaction in case of error
    console.error(error);
    return res.status(500).json({
      message: "Error creating order",
      error: true,
      Orders: null,
    });
  }
};

export const patchOrder = async (req, res) => {
  const { orderId } = req.params;
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

    values.push(orderId); // add the id as the last parameter for the WHERE clause
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
  const { orderId } = req.params;
  try {
    await db.query("DELETE FROM Order WHERE id = $1", [orderId]);
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
