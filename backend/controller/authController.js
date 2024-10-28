import { db } from "../DB/connect.js";
import { v4 as uuid } from "uuid";
import { generateTokenSetCookie } from "../utils/generateCookie.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  try {
    const result = await db.query(
      'SELECT * FROM "Users" WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Invalid email or password",
        User: null,
        error: true,
      });
    }

    const user = result.rows[0];

    generateTokenSetCookie(res, user.u_id, user.is_admin);
    return res.status(200).json({
      message: "User logged in successfully",
      User: { ...user, password: null },
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Serer Error", User: null, error: true });
  }
};

export const userSignUp = async (req, res) => {
  const { fname, lname, Email, password, phoneNumber, isAdmin } = req.body;

  try {
    if (!Email || !fname || !lname || !password || !phoneNumber || !isAdmin) {
      return res.status(400).json({
        message: "Please fill in all fields",
        User: null,
        error: true,
      });
    }

    //check existing user
    const existingUser = await db.query(
      'SELECT * FROM "Users" WHERE email = $1',
      [Email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already in use", User: null, error: true });
    }

    //generate user id
    const userId = uuid();

    //generate jwt token and set cookie for user session
    generateTokenSetCookie(res, userId, isAdmin);

    const user = await db.query(
      'INSERT INTO "Users" (u_id, is_admin, first_name, last_name,email, password, phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [userId, isAdmin, fname, lname, Email, password, phoneNumber]
    );
    return res.status(200).json({
      message: "Signup successfull, User added to Database",
      User: user.rows[0],
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Serer Error", User: null, error: true });
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie("token", { path: "/" });
  return res
    .status(200)
    .json({ message: "Logged out successfully", User: null, error: false });
};
