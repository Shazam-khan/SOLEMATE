import { db } from "../DB/connect.js";
import { v4 as uuid } from "uuid";
import { generateTokenSetCookie } from "../utils/generateCookie.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../utils/validation.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
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

    const token = generateTokenSetCookie(res, user.u_id, user.is_admin);
    console.log(token);
    return res.status(200).json({
      message: "User logged in successfully",
      User: { ...user, password: null },
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const userSignUp = async (req, res) => {
  const { fname, lname, email, password, phoneNumber } = req.body;

  try {
    // Check for missing fields
    if (!email || !fname || !lname || !password || !phoneNumber) {
      return res.status(400).json({
        message: "Please fill in all fields",
        User: null,
        error: true,
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        User: null,
        error: true,
      });
    }

    // Validate password format
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
        User: null,
        error: true,
      });
    }

    // Validate phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({
        message: "Phone number must be exactly 10 digits",
        User: null,
        error: true,
      });
    }

    // Check if the email is already in use
    const existingUser = await db.query(
      'SELECT * FROM "Users" WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already in use", User: null, error: true });
    }

    // Generate user ID
    const userId = uuid();

    const admin = "N";
    // Insert the user into the database
    const user = await db.query(
      'INSERT INTO "Users" (u_id, is_admin, first_name, last_name, email, password, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, admin, fname, lname, email, password, phoneNumber]
    );

    // Generate JWT token and set cookie
    generateTokenSetCookie(res, userId, false);

    return res.status(200).json({
      message: "Signup successful, User added to Database",
      User: user.rows[0],
      error: false,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", User: null, error: true });
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie("token", { path: "/" });
  return res
    .status(200)
    .json({ message: "Logged out successfully", User: null, error: false });
};
