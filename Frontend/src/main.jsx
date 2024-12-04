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
import Products from "./components/Products.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Cart from "./components/Cart.jsx";
import AddressPage from "./components/AddressPage.jsx";
import PaymentPage from "./components/PaymentPage.jsx";
import PaymentResult from "./components/PaymentResult.jsx";
import OrderConfirmationPage from "./components/OrderConfirmationPage.jsx";
import AdminDashboard from "./components/dashboard.jsx"; // Import AdminDashboard
import { UserProvider } from "./components/UserContext.jsx";

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
        element: <ProductDetail />,
      },
      {
        path: "/users/:userId/cart",
        element: <Cart />,
      },
      {
        path: "/users/:userId/order/:orderId/address",
        element: <AddressPage />,
      },
      {
        path: "/users/:userId/order/:orderId/payment",
        element: <PaymentPage />,
      },
      {
        path: "/users/:userId/order/:orderId/confirmation",
        element: <OrderConfirmationPage />,
      },
      {
        path: "/payment/result",
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
        path: "/admin/dashboard", // Admin Dashboard route
        element: <AdminDashboard />,
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
