import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000/api/products"; // Adjust this URL if needed

function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch products from the backend
    const fetchProducts = async () => {
        setError("");
        try {
            const response = await axios.get(API_URL);
            if (response.status === 200) {
                setProducts(response.data.Products);
            }
        } catch (err) {
            setError("Failed to fetch products. Please try again later.");
        }
    };

    // Navigate to product details page
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20">
            <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-lg mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shoes That Connect the Soles</h2>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
                    {error && (
                        <p className="text-red-600 text-sm text-center mb-4">{error}</p>
                    )}

                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.p_id} className="relative group" onClick={() => handleProductClick(product.p_id)}>
                                <div class="overflow-hidden aspect-w-1 aspect-h-1">
                                    <img class="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png" alt="" />
                                </div>
                                {/* <div className="overflow-hidden relative w-full h-full">
                                    <img 
                                        className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                                        src={product.imageUrl || "https://via.placeholder.com/200"} // Placeholder if no image is provided
                                        alt={product.p_name}
                                    />
                                </div> */}
                                {product.isNew && (
                                    <div className="absolute left-3 top-3">
                                        <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">New</p>
                                    </div>
                                )}
                                <div className="flex items-start justify-between mt-4 space-x-4">
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                            <a href="#" title="">
                                                {product.p_name}
                                            </a>
                                        </h3>
                                        <div className="flex items-center mt-2.5 space-x-px">
                                            {/* Render rating dynamically */}
                                            {[...Array(5)].map((_, index) => (
                                                <svg key={index} className={`w-3 h-3 ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'} sm:w-4 sm:h-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">${product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No products found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Products;
