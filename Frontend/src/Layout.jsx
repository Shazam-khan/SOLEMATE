import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

function Layout() {
    return (
        <>
        <ScrollToTop /> {/* Ensure this runs on every route change */}
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}

export default Layout;