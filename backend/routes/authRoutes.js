import express from "express";
import {
  userLogin,
  userLogout,
  userSignUp,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignUp);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);

export default authRouter;
