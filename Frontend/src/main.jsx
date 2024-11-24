import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Signup from "./components/Signup.jsx";
import Admin from "./components/Admin.jsx";
import Dashboard from "./components/dashboard.jsx";
import Products from "./components/Products.jsx";
import ProductDetail from "./components/ProductDetail.jsx"; // Import ProductDetail
import Cart from "./components/Cart.jsx"; // Import Cart component
import AddressPage from "./components/AddressPage.jsx"; // Import AddressPage component
import PaymentPage from "./components/PaymentPage.jsx"; // Import PaymentPage component
import PaymentResult from "./components/PaymentResult.jsx"; // Import PaymentResult component
import OrderConfirmationPage from "./components/OrderConfirmationPage.jsx"; // Import OrderConfirmationPage component
import { UserProvider } from "./components/UserContext.jsx"; // Import the context provider

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/category/:category",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetail />, // Product Detail page
      },
      {
        path: "/users/:userId/cart", // Cart route with userId
        element: <Cart />,
      },
      {
        path: "/users/:userId/order/:orderId/address", // Address Page route with userId and orderId
        element: <AddressPage />,
      },
      {
        path: "/users/:userId/order/:orderId/payment", // Payment Page route
        element: <PaymentPage />,
      },
      {
        path: "/users/:userId/order/:orderId/confirmation", // Order Confirmation Page route
        element: <OrderConfirmationPage />,
      },
      {
        path: "/payment/result", // Payment Result route
        element: <PaymentResult />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      {/* Wrap app with UserProvider */}
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
