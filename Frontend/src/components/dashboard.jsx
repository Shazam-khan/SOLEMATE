import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ p_name: "", brand: "", price: "" });

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Replace with your endpoint
        setProducts(response.data.Products || []); // Fallback to empty array if undefined
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Safeguard
      }
    };
    fetchProducts();
  }, []);

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`); // Replace with your delete endpoint
      setProducts((prevProducts) => prevProducts.filter((product) => product.p_id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle save product (add or edit)
  const handleSaveProduct = async () => {
    if (editingProduct) {
      // Edit existing product
      try {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.p_id}`, editingProduct); // Replace with your edit endpoint
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.p_id === editingProduct.p_id ? editingProduct : product
          )
        );
        setEditingProduct(null);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      // Add new product
      try {
        const response = await axios.post("http://localhost:5000/api/products", newProduct); // Replace with your add endpoint
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setNewProduct({ p_name: "", brand: "", price: "" }); // Reset input fields
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <button
        onClick={() => {
          setEditingProduct(null); // Reset editing product
          setIsDialogOpen(true); // Open dialog
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-6"
      >
        Add New Product
      </button>

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
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.p_id} className="border-b">
                <td className="py-2 px-4">{product.p_name}</td>
                <td className="py-2 px-4">{product.brand}</td>
                <td className="py-2 px-4">${product.price}</td>
                <td className="py-2 px-4">
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

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
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
                <label className="block text-sm font-medium mb-1">Brand</label>
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
                <label className="block text-sm font-medium mb-1">Price</label>
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
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
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
