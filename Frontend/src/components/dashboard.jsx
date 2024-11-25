import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    p_name: "",
    brand: "",
    price: "",
    category: "Sneakers",
    sizes: [{ size: "", quantity: "" }],
    images: [],
  });

  const BASE_URL = "http://localhost:5000/api/products"; // Backend route

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setProducts(response.data.Products || []); // Align with backend response structure
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Save (Add or Update) product
  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        // Update existing product
        await axios.put(`${BASE_URL}/${editingProduct.p_id}`, editingProduct);
        setProducts((prev) =>
          prev.map((product) =>
            product.p_id === editingProduct.p_id ? editingProduct : product
          )
        );
      } else {
        // Add new product
        const response = await axios.post(BASE_URL, newProduct);
        setProducts((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    setNewProduct({
      p_name: "",
      brand: "",
      price: "",
      category: "Sneakers",
      sizes: [{ size: "", quantity: "" }],
      images: [],
    });
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setProducts((prev) => prev.filter((product) => product.p_id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle Adding and Updating Sizes
  const handleAddSize = () => {
    const target = editingProduct || newProduct;
    const updated = {
      ...target,
      sizes: [...target.sizes, { size: "", quantity: "" }],
    };
    editingProduct ? setEditingProduct(updated) : setNewProduct(updated);
  };

  const handleRemoveSize = (index) => {
    const target = editingProduct || newProduct;
    const updated = {
      ...target,
      sizes: target.sizes.filter((_, i) => i !== index),
    };
    editingProduct ? setEditingProduct(updated) : setNewProduct(updated);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, images: newImages });
    } else {
      setNewProduct({ ...newProduct, images: newImages });
    }
  };

  return (
    <div className="py-12 mt-12 bg-white sm:py-16 lg:py-20">
      <h1 className="text-2xl text-center font-bold">Admin Dashboard</h1>
      <div className="w-[80%] py-12 text-center mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <h1 className="text-xl text-center font-bold mb-6">All Products</h1>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border py-2 px-4">Name</th>
              <th className="border py-2 px-4">Brand</th>
              <th className="border py-2 px-4">Price</th>
              <th className="border py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.p_id} className="border-b">
                  <td className="py-2 px-4 text-center">{product.p_name}</td>
                  <td className="py-2 px-4 text-center">{product.brand}</td>
                  <td className="py-2 px-4 text-center">${product.price}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setIsDialogOpen(true);
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.p_id)}
                      className="text-red-600 ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsDialogOpen(true);
          }}
          className="w-48 p-3 mt-8 bg-custom-brown text-white rounded-md hover:border-2 hover:border-custom-brown hover:text-custom-brown hover:bg-transparent"
        >
          Add New Product
        </button>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
          <div className="bg-white h-[70%] p-6 rounded shadow-lg w-96 overflow-y-auto">
            <h2 className="text-xl text-center font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.p_name : newProduct.p_name}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, p_name: e.target.value })
                      : setNewProduct({ ...newProduct, p_name: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium mb-1">Brand</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.brand : newProduct.brand}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, brand: e.target.value })
                      : setNewProduct({ ...newProduct, brand: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={editingProduct ? editingProduct.price : newProduct.price}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, price: e.target.value })
                      : setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium mb-1">Category</label>
                <select
                  value={editingProduct ? editingProduct.category : newProduct.category}
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, category: e.target.value })
                      : setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Sneakers">Sneakers</option>
                  <option value="Formal shoes">Formal Shoes</option>
                  <option value="Heels">Heels</option>
                  <option value="Slippers">Slippers</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium mb-1">Sizes</label>
                {newProduct.sizes.map((size, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Size"
                      value={size.size}
                      onChange={(e) => {
                        const updatedSizes = [...newProduct.sizes];
                        updatedSizes[index].size = e.target.value;
                        setNewProduct({ ...newProduct, sizes: updatedSizes });
                      }}
                      className="w-1/2 border px-3 py-2 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={size.quantity}
                      onChange={(e) => {
                        const updatedSizes = [...newProduct.sizes];
                        updatedSizes[index].quantity = e.target.value;
                        setNewProduct({ ...newProduct, sizes: updatedSizes });
                      }}
                      className="w-1/2 border px-3 py-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="mt-2 text-blue-600"
                >
                  Add Size
                </button>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium mb-1">Images</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="bg-custom-brown text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
