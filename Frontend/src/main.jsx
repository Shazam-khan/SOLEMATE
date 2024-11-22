import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Signup from './components/Signup.jsx';
import Admin from './components/Admin.jsx';
import Dashboard from './components/dashboard.jsx';
import Products from './components/Products.jsx';
import ProductDetail from './components/ProductDetail.jsx'; // Import ProductDetail
import { UserProvider } from './components/UserContext.jsx'; // Import the context provider

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/category/:category',
        element: <Products />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetail />,  // Now no need to pass userId directly
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Wrap app with UserProvider */}
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
