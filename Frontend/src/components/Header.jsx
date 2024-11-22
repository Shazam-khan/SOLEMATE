import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Signup from "./Signup";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Add scroll event listener to change header background on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true); // If scrolled 50px or more, set to true
            } else {
                setIsScrolled(false); // Otherwise, set to false
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {/* Trigger the modal */}
            {isModalOpen && <Signup closeModal={closeModal} />}

            <header
                className={`fixed top-0 p-4 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
            >
                <nav className="px-12 lg:px-16 py-0">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to="/" className="flex items-center">
                            <img
                                src="./logo2.png"
                                className="mr-3 w-[90px]"
                                alt="Logo"
                            />
                        </Link>
                        <div className="flex px-2 items-center lg:order-2 space-x-2">
                            <Link
                                to="/cart"
                                className="text-black border-2 border-transparent hover:text-white hover:bg-custom-brown hover:border-custom-brown hover:border-2 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Link>

                            {/* Sign Up Button to open Modal */}
                            <button
                                onClick={openModal}
                                className="text-black bg-transparent border-2 border-black hover:bg-custom-brown hover:text-white hover:border-custom-brown hover:border-2 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faUserPlus} />
                            </button>
                        </div>
                        <div
                            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-semibold text-lg lg:flex-row lg:space-x-8 lg:mt-0">
                                <li className="relative group">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `py-2 pr-4 pl-3 duration-200 border-b text-black ${isActive ? "text-black" : "text-black"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0`
                                        }
                                    >
                                        Home
                                        <span 
                                            className="absolute top-7 right-0 bottom-0 w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-full"
                                        ></span>
                                    </NavLink>
                                </li>
                                <li className="relative group">
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            `py-2 pr-4 pl-3 duration-200 border-b text-black ${isActive ? "text-black" : "text-black"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0`
                                        }
                                    >
                                        About Us
                                        <span 
                                            className="absolute top-7 right-0 bottom-0 w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-full"
                                        ></span>
                                    </NavLink>
                                </li>
                                <li className="relative group">
                                    {/* Dropdown Menu */}
                                    <NavLink
                                        to="/products"
                                        className="block py-2 pr-4 pl-3 duration-200 border-b text-black border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0"
                                    >
                                        Products
                                        <span 
                                            className="absolute top-7 right-0 bottom-0 w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-full"
                                        ></span>
                                    </NavLink>
                                    <div className="absolute hidden group-hover:block left-0 mt-2 w-48 bg-custom-brown-light shadow-lg rounded-lg z-50">
                                        <NavLink
                                            to="/products/formal-shoes"
                                            className="block px-4 py-2 text-white hover:bg-custom-brown"
                                        >
                                            Formal Shoes
                                        </NavLink>
                                        <NavLink
                                            to="/products/joggers"
                                            className="block px-4 py-2 text-white hover:bg-custom-brown"
                                        >
                                            Joggers
                                        </NavLink>
                                        <NavLink
                                            to="/products/heels"
                                            className="block px-4 py-2 text-white hover:bg-custom-brown"
                                        >
                                            Heels
                                        </NavLink>
                                        <NavLink
                                            to="/products/slippers"
                                            className="block px-4 py-2 text-white hover:bg-custom-brown"
                                        >
                                            Slippers
                                        </NavLink>
                                    </div>
                                </li>
                                <li className="relative group">
                                    <NavLink
                                        to="/contact"
                                        className={({ isActive }) =>
                                            `py-2 pr-4 pl-3 duration-200 border-b text-black ${isActive ? "text-black" : "text-black"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0`
                                        }
                                    >
                                        Contact Us
                                        <span 
                                            className="absolute top-7 right-0 bottom-0 w-0 h-0.5 bg-custom-brown transition-all duration-300 group-hover:w-full"
                                        ></span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
