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
  getAllProductImages,
  getImageById,
  postImage,
  updateImage,
  deleteImage,
  getAllSizes,
  postSize,
  getSizebyId,
  updateSizeInfo,
  deleteSieInfo,
} from "../controller/productController.js";
import {
  CheckImageId,
  checkProductId,
  checkSizeId,
} from "../middleware/Products.js";
import multer from "multer";

// Configure Multer
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const productRouter = express.Router({ mergeParams: true });

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);

productRouter.param("id", checkProductId); //All routes below this wont need to validate the product id

productRouter.get("/:id", getProductById);
productRouter.put("/:id", UpdateProduct);
productRouter.delete("/:id", DeleteProduct);

//Product Category routes
productRouter.get("/:id/category", getProductCategory);
productRouter.post("/:id/category", createCategory);
productRouter.put("/:id/category/:cId", updateCategory);
productRouter.delete("/:id/category/:cId", deleteCategory);

//Product Image Routes
productRouter.param("iId", CheckImageId); // no need to validate image id

productRouter.get("/:id/images", getAllProductImages);
productRouter.get("/:id/images/:iId", getImageById);
productRouter.post("/:id/images", upload.single("image"), postImage);
productRouter.put("/:id/images/:iId", updateImage);
productRouter.delete("/:id/images/:iId", deleteImage);

//Product Size Routes
productRouter.get("/:id/size", getAllSizes);
productRouter.post("/:id/size", postSize);

productRouter.param("sId", checkSizeId);

productRouter.get("/:id/size/:sId", getSizebyId);
productRouter.put("/:id/size/:sId", updateSizeInfo);
productRouter.delete("/:id/size/:sid", deleteSieInfo);
export default productRouter;
