import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading"; // Import react-loading

const API_URL = "http://localhost:5000/api/products"; // Base API URL
const IMAGE_URL = "http://localhost:5000/api/products"; // Base URL for product images

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState("");
  const { category } = useParams(); // Extract category from URL
  const navigate = useNavigate();

  // Fetch all products or products by category
  const fetchProducts = async () => {
    setError("");
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(API_URL);
      if (response.status === 200) {
        const productsWithImages = await attachImagesToProducts(
          response.data.Products
        );

        // Filter products if a specific category is in the URL
        if (category) {
          const filteredProducts = await filterProductsByCategory(
            productsWithImages,
            category
          );
          setProducts(filteredProducts);
        } else {
          setProducts(productsWithImages); // Show all products
        }
      }
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch images for each product and attach to the product object
  const attachImagesToProducts = async (products) => {
    const productWithImagesPromises = products.map(async (product) => {
      try {
        const imageResponse = await axios.get(
          `${IMAGE_URL}/${product.p_id}/images`
        );

        if (imageResponse.status === 200) {
          const images = imageResponse.data.Images;
          if (images.length > 0) {
            return { ...product, imageUrl: images[0].image_url };
          } else {
            return { ...product, imageUrl: "https://via.placeholder.com/200" };
          }
        }
        return { ...product, imageUrl: "https://via.placeholder.com/200" };
      } catch (err) {
        return { ...product, imageUrl: "https://via.placeholder.com/200" };
      }
    });

    return Promise.all(productWithImagesPromises);
  };

  // Filter products by category
  const filterProductsByCategory = async (products, categoryName) => {
    const filteredProducts = await Promise.all(
      products.map(async (product) => {
        try {
          const categoryResponse = await axios.get(
            `${API_URL}/${product.p_id}/category`
          );
          if (categoryResponse.status === 200) {
            const productCategory = categoryResponse.data.Category[0].c_name;
            return (
              productCategory.toLowerCase() === categoryName.toLowerCase()
            );
          }
        } catch (err) {
          console.error("Failed to fetch category for product:", err);
        }
        return false;
      })
    );

    return products.filter((_, index) => filteredProducts[index]);
  };

  // Navigate to product details page
  const handleProductClick = async (productId) => {
    try {
      const categoryResponse = await axios.get(
        `${API_URL}/${productId}/category`
      );
      if (categoryResponse.status === 200) {
        const categoryName = categoryResponse.data.Category[0].c_name;
        navigate(`/products/${productId}`);
      }
    } catch (err) {
      console.error("Failed to navigate to product details:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]); // Refetch products when category changes

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {category
              ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
              : "All Shoes"}
          </h2>
        </div>

        {/* Show loading spinner while data is being fetched */}
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <ReactLoading
              type="spin"
              color= "custom-brown"
              height={64}
              width={64}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
            {error && (
              <p className="text-red-600 text-sm text-center mb-4">{error}</p>
            )}

            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.p_id}
                  className="relative group"
                  onClick={() => handleProductClick(product.p_id)}
                >
                  <div className="overflow-hidden relative aspect-w-1 aspect-h-1">
                    <img
                      className="object-cover w-full h-[350px] transition-all duration-300 group-hover:scale-110"
                      src={product.imageUrl}
                      alt={product.p_name}
                    />
                  </div>
                  <div className="flex items-start justify-between mt-4 mx-2 space-x-4">
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                        {product.p_name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No products found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
