import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProdctsPage from "./Pages/Products";
import Productdetail from "./Pages/Productdetail";
import CheckoutPage from "./Pages/CheckoutPage";
import ErrorPage from "./Pages/ErrorPage";
import Dashboard from "./Pages/Dashboard"; 
import User from "./Pages/User";
import Signup from "./Pages/Auth/Signup"; 
import Login from "./Pages/Auth/Login"; 
import Footer from "./components/Layout/Footer";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import NP from "./Pages/NP";
import FP from "./Pages/FP";
import Navbar from "./components/Layout/navbar";

function App() {
  const [contentHeight, setContentHeight] = useState(0); 

  useEffect(() => {
    const headerElement = document.getElementById("header");
    const footerElement = document.getElementById("footer");

    if (!headerElement) {
      console.error("Header element not found.");
    }

    if (!footerElement) {
      console.error("Footer element not found.");
    }

    const headerHeight = headerElement?.clientHeight || 0;
    const footerHeight = footerElement?.clientHeight || 0;
    const calculatedContentHeight = window.innerHeight - (headerHeight + footerHeight);

   

    setContentHeight(calculatedContentHeight); 

  }, []);
 
 

  return (
    <>
    <Navbar />
  
      <div style={{minHeight: `${contentHeight}px` }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProdctsPage />}>
            <Route path="NP" element={<NP />} />
            <Route path="FP" element={<FP />} />
          </Route>
          <Route path="/product/:paramid" element={<Productdetail />} />
          <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
          <Route path="/users" element={<ProtectedRoute Component={User} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
