import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch product details and images
  const fetchProductDetails = async () => {
    console.log(productId);
    try {
      const productResponse = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      if (productResponse.status === 200) {
        setProduct(productResponse.data);
      }
      console.log(productResponse.data);

    //   const imagesResponse = await axios.get(
    //     `http://localhost:5000/api/products/${productId}/images`
    //   );
    //   if (imagesResponse.status === 200) {
    //     setImages(imagesResponse.data.map((img) => img.image_url));
    //   }
    //   console.log(imagesResponse.data);
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

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Carousel */}
        {/* <div className="relative w-full h-[400px] group">
          <div
            style={{
              backgroundImage: `url(${images[currentIndex] || "/placeholder.svg"})`,
            }}
            className="w-full h-full bg-center bg-cover duration-500"
          ></div>
          <button
            onClick={prevSlide}
            className="hidden group-hover:block absolute top-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white"
          >
            &#8249;
          </button>
          <button
            onClick={nextSlide}
            className="hidden group-hover:block absolute top-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white"
          >
            &#8250;
          </button>
        </div> */}

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.p_name || "Product Name"}</h1>
          <p className="text-xl">{product.type || "Product Type"}</p>
          <p>{product.description || "No description available."}</p>
          <p>Brand: {product.brand || "Unknown"}</p>
          <p className="text-2xl font-semibold">
            ${product.price ? product.price.toFixed(2) : "0.00"}
          </p>

          {/* Size Selector */}
          <div>
            <label className="block mb-2">Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border rounded"
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
            <label className="block mb-2">Quantity:</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 border rounded"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-16 text-center border rounded"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 border rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
