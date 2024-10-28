import { db } from "../DB/connect.js";

export const checkProductId = async (req, res, next, id) => {
  try {
    const product = await db.query("SELECT * FROM Product WHERE p_id = $1", [
      id,
    ]);

    if (product.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Product not found", error: true });
    }
    req.product = product.rows[0];
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};
