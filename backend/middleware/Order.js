import { db } from "../DB/connect.js";

export const verifyOrderId = async (req, res, next, id) => {
  try {
    const order = await db.query(`SELECT * FROM "Order" WHERE o_id = $1`, [id]);
    if (order.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Order not found", error: true, Orders: null });
    }
    req.order = order.rows[0];
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server Error", error: true, Orders: null });
  }
};
