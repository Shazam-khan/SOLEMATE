import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  UpdateProduct,
  DeleteProduct,
  getProductCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/productController.js";
import { checkProductId } from "../middleware/Products.js";

const productRouter = express.Router({ mergeParams: true });

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);

productRouter.param("id", checkProductId); //All routes below this wont need to validate the product id

productRouter.get("/:id", getProductById);
productRouter.put("/:id", UpdateProduct);
productRouter.delete("/:id", DeleteProduct);
productRouter.get("/:id/category", getProductCategory);
productRouter.post("/:id/category", createCategory);
productRouter.put("/:id/category/:cId", updateCategory);
productRouter.delete("/:id/category/:cId", deleteCategory);

export default productRouter;
