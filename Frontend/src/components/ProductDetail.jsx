import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams(); 

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch product details and images
  const fetchProductDetails = async () => {
    try {
      const productResponse = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      if (productResponse.status === 200) {
        setProduct(productResponse.data.Product);
      }

      const imagesResponse = await axios.get(
        `http://localhost:5000/api/products/${productId}/images`
      );
      if (imagesResponse.status === 200) {
        setImages(imagesResponse.data.Images.map((img) => img.image_url));
      }

      // Fetch category info
      const categoryResponse = await axios.get(
        `http://localhost:5000/api/products/${productId}/category`
      );
      if (categoryResponse.status === 200) {
        const categoryData = categoryResponse.data.Category[0];
        setCategory(categoryData);
      }
    } catch (err) {
      setError("Failed to fetch product details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    console.log("Added to cart:", {
      name: product?.p_name,
      size: selectedSize,
      quantity,
    });
  };

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
            {/* Thumbnails */}
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

            {/* Main Image */}
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
                {product.sizes?.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector */}
            <div>
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
