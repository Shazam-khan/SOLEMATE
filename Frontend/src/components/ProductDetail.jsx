import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext.jsx"; // Import the UserContext

const ProductDetail = () => {
  const { userId } = useUser(); // Access userId from UserContext

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const [productRes, imagesRes, categoryRes, sizesRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/products/${productId}`),
        axios.get(`http://localhost:5000/api/products/${productId}/images`),
        axios.get(`http://localhost:5000/api/products/${productId}/category`),
        axios.get(`http://localhost:5000/api/products/${productId}/size`),
      ]);

      if (productRes.status === 200) {
        setProduct(productRes.data.Product);
      }
      if (imagesRes.status === 200) {
        setImages(
          imagesRes.data.Images.map(
            (img) => img.image_url || "/placeholder.svg"
          )
        );
      }
      if (categoryRes.status === 200) {
        setCategory(categoryRes.data.Category[0]);
      }
      if (sizesRes.status === 200) {
        setSizes(sizesRes.data.Sizes.map((size) => size.size));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!productId) {
      setError("Invalid product ID. Please check the URL.");
      setLoading(false); // Stop loading if no productId
      return;
    }
    fetchProductDetails();
  }, [productId]);

  // Render Error or Loading State
  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  const handleAddToCart = async () => {
    try {
      const orderDate = new Date().toISOString();
      const promisedDate = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString();
      const address = "Default Address, Update Later";

      const response = await axios.post(
        `http://localhost:5000/api/users/${userId}/order`,
        {
          orderDate,
          promisedDate,
          address,
          quantity,
          p_id: productId,
          size: selectedSize,
          user_id: userId,
        }
      );

      const orderId = response.data.orderId;
      alert("Item added to cart successfully!");
      window.location.href = `http://localhost:5000/api/users/${userId}/order_details`;
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // Render Error or Loading State
  if (loading) {
    return <p>Loading product details...</p>;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  // Render Product Details
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="relative flex">
            <div className="flex flex-col space-y-2 mr-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer border rounded-md ${
                    currentIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <div className="relative w-full h-[400px] group">
              <div
                style={{
                  backgroundImage: `url(${
                    images[currentIndex] || "/placeholder.svg"
                  })`,
                }}
                className="w-full h-full bg-center bg-cover duration-500 rounded-md shadow-lg"
              ></div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 border-l-2 border-gray-300 pl-12 ml-8">
            <h1 className="text-3xl font-bold">
              {product?.p_name || "Product Name"}
            </h1>
            <p className="text-xl">Type: {category?.c_name || "Unknown"}</p>
            <p className="text-lg">
              Description:{" "}
              {category?.description || "No description available."}
            </p>
            <p className="text-xl">Brand: {product?.brand || "Unknown"}</p>
            <p className="text-xl">
              Price:{" "}
              <span className="text-2xl font-semibold">
                ${product?.price?.toFixed(2) || "0.00"}
              </span>
            </p>

            {/* Size Selector */}
            <div>
              <label className="mr-4">Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="" disabled>
                  Select size
                </option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-2">
              <label className="mr-4">Quantity:</label>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 border rounded-md border-gray-500"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-16 h-10 text-center border rounded-md border-gray-500"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 border rounded-md border-gray-500"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-96 p-3 bg-custom-brown text-white rounded-md hover:border-2 hover:border-custom-brown hover:text-custom-brown hover:bg-transparent"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;