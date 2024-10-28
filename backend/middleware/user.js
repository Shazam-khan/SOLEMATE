import { db } from "../DB/connect.js";
import jwt from "jsonwebtoken";
//all user related middleware goes here
export const ValidateUserId = async (req, res, next, id) => {
  try {
    const user = await db.query('SELECT * FROM "Users" WHERE u_id = $1', [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found", error: true });
    }
    req.user = user.rows[0];
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided.", error: true });
  }

  try {
    // Verify token
    console.log("token:" + token);
    const decoded = jwt.verify(token, "my_secret");
    if (!decoded) {
      return res
        .status(403)
        .json({ message: "Access denied, invalid token.", error: true });
    }

    req.user = decoded; // Attach the decoded user info to the request object

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied, you are not an admin.", error: true });
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(400).json({ message: "Invalid token.", error: true });
  }
};
