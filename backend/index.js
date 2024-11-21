import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorhandler from "errorhandler";
import { db } from "./DB/connect.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(errorhandler());

const PORT = process.env.PORT || 5000;

//all routes go here
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

//spin up dev server
app.listen(PORT, () => {
  db.connect((err) => {
    if (err) {
      console.error(err);
    }
    console.log("Connected to SOLEMATE");
  });
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  db.end((err) => {
    if (err) {
      console.error("Error during disconnection", err.stack);
    } else {
      console.log("Disconnected from the database");
    }
    process.exit(0);
  });
});
