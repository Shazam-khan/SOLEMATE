import express from "express";
import {
  adminLogin,
  userLogin,
  userLogout,
  userSignUp,
} from "../controller/authController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignUp);
authRouter.post("/login", userLogin);
authRouter.post("/admin/login", adminLogin);
authRouter.post("/logout", userLogout);
authRouter.get("/me", authenticateUser, (req, res) => {
  const { userId, isAdmin } = req.user;
  res.status(200).json({ userId, isAdmin });
});

export default authRouter;
