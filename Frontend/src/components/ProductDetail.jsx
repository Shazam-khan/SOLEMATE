import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext.jsx"; // Import the UserContext

const ProductDetail = () => {
  // Access the userId from the UserContext
  const { userId } = useUser();

  // Guard clause to prevent rendering before userId is available
  if (!userId) {
    console.error("User ID is undefined!");
    return <p className="text-red-600">Please log in to view the product details.</p>;
  }

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch product details and related data
  const fetchProductDetails = async () => {
    try {
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
        setImages(imagesRes.data.Images.map((img) => img.image_url));
      }

      if (categoryRes.status === 200) {
        setCategory(categoryRes.data.Category[0]);
      }

      if (sizesRes.status === 200) {
        setSizes(sizesRes.data.Sizes.map((size) => size.size));
      }
    } catch (err) {
      setError("Failed to fetch product details. Please try again later.");
    }
  };

  useEffect(() => {
    if (!productId) {
      setError("Invalid product ID. Please check the URL.");
      return;
    }
    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    try {
      const orderRes = await axios.get(
        `http://localhost:5000/api/users/${userId}/order`
      );

      let orderId;
      if (orderRes.status === 200 && orderRes.data.Orders.length > 0) {
        orderId = orderRes.data.Orders[0].o_id;
      } else {
        const createOrderRes = await axios.post(
          `http://localhost:5000/api/users/${userId}/order`,
          { user_id: userId }
        );
        orderId = createOrderRes.data.Order.o_id;
      }

      await axios.post(
        `http://localhost:5000/api/users/${userId}/order/${orderId}/order_details`,
        {
          quantity,
          p_id: productId,
          size: selectedSize,
        }
      );

      alert("Item added to cart successfully!");
    } catch (err) {
      setError("Failed to add to cart. Please try again later.");
      console.error(err);
    }
  };

  // Handle loading and errors
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Carousel with Thumbnails */}
          <div className="relative flex">
            <div className="flex flex-col space-y-2 mr-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer border rounded-md ${
                    currentIndex === index ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <div className="relative w-full h-[400px] group">
              <div
                style={{
                  backgroundImage: `url(${images[currentIndex] || "/placeholder.svg"})`,
                }}
                className="w-full h-full bg-center bg-cover duration-500 rounded-md shadow-lg"
              ></div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 border-l-2 border-gray-300 pl-12 ml-8">
            <h1 className="text-3xl font-bold">{product.p_name || "Product Name"}</h1>
            <p className="text-xl">Type: {category?.c_name || "Unknown"}</p>
            <p className="text-lg">Description: {category?.description || "No description available."}</p>
            <p className="text-xl">Brand: {product.brand || "Unknown"}</p>
            <p className="text-xl">
              Price:
              <label className="ml-4 text-2xl font-semibold">
                ${product.price ? product.price.toFixed(2) : "0.00"}
              </label>
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
