import { db } from "../DB/connect.js";
import { v4 as uuid } from "uuid";

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM Product");
    if (products.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found", Products: null, error: true });
    }
    res
      .status(200)
      .json({ message: null, Products: products.rows, error: false });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", Products: null, error: true });
  }
};

//get Product by ID
export const getProductById = async (req, res) => {
  res
    .status(200)
    .json({ message: "Product Found", Product: req.product, error: false });
};

//create a product
export const createProduct = async (req, res) => {
  try {
    const { pName, brand, price, stock } = req.body;
    if (!pName || !brand || !price || !stock) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", id: null, error: true });
    }

    const pId = uuid(); //generate random ID
    const product = await db.query(
      "INSERT INTO Product (p_id,p_name,brand,price,stock) VALUES ($1,$2,$3,$4,$5) RETURNING p_id",
      [pId, pName, brand, price, stock]
    );
    res.status(201).json({
      message: "Product created successfully",
      id: product.rows[0].p_id,
      error: false,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", id: null, error: true });

    console.log(error);
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { pName, brand, price, stock } = req.body; // No parentheses in req.body
    const { id } = req.params;

    // Check if the product exists
    const existingProduct = await db.query(
      "SELECT * FROM Product WHERE p_id = $1",
      [id]
    );

    const updatedName = pName || existingProduct.rows[0].p_name;
    const updatedBrand = brand || existingProduct.rows[0].brand;
    const updatedPrice = price || existingProduct.rows[0].price;
    const updatedStock = stock || existingProduct.rows[0].stock;

    // Update the product
    const updatedProduct = await db.query(
      "UPDATE Product SET p_name = $1, brand = $2, price = $3, stock = $4 WHERE p_id = $5 RETURNING *",
      [updatedName, updatedBrand, updatedPrice, updatedStock, id]
    );

    res.status(200).json({
      message: "Product updated successfully",
      Product: updatedProduct.rows[0],
      error: false,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", Product: null, error: true });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM Product WHERE p_id = $1", [id]);
    res
      .status(200)
      .json({ message: "Product deleted successfully", error: false });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: true });
  }
};

export const getProductCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await db.query("SELECT * FROM Category WHERE id = $1", [
      id,
    ]);

    if (category.rows.length === 0) {
      return res.status(404).json({
        message: "Category not found for this product",
        Category: null,
        error: true,
      });
    }

    res.status(200).json({
      message: null,
      Category: category.rows,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

export const createCategory = async (req, res) => {
  const { id } = req.params;
  const { userPreference, cName, description } = req.body;

  if (!userPreference || !cName || !description) {
    res.status(400).json({
      message: "Bad Request, all fields required",
      Category: null,
      error: true,
    });
  }

  try {
    const cId = uuid();
    const newCategory = await db.query(
      "INSERT INTO Category (c_id,user_preference,c_name,description,id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [cId, userPreference, cName, description, id]
    );
    res.status(201).json({
      message: "Category assigned successfully",
      Category: newCategory.rows[0],
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

export const updateCategory = async (req, res) => {
  const { cId } = req.params;
  const { userPreference, cName, description } = req.body;

  try {
    const existingCategory = await db.query(
      "SELECT * FROM Category WHERE c_id = $1",
      [cId]
    );

    if (existingCategory.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Category not found", error: true });
    }

    const updatedUserPreference =
      userPreference || existingCategory.rows[0].user_preference;
    const updatedCName = cName || existingCategory.rows[0].c_name;
    const updatedDescription =
      description || existingCategory.rows[0].description;

    const updatedCategory = await db.query(
      "UPDATE Category SET user_preference = $1, c_name = $2, description = $3 WHERE c_id = $4 RETURNING *",
      [updatedUserPreference, updatedCName, updatedDescription, cId]
    );

    res.status(200).json({
      message: "Category updated successfully",
      Category: updatedCategory.rows[0],
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

export const deleteCategory = async (req, res) => {
  const { cId } = req.params;

  try {
    await db.query("DELETE FROM Category WHERE c_id = $1 RETURNING *", [cId]);

    res.status(200).json({
      message: "Category deleted successfully",
      Category: deleteResult.rows[0],
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};
