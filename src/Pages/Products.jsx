

import React, { useEffect, useState } from "react";
import Product from "../components/Product/Product";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Audio } from "react-loader-spinner";

import { useDispatch } from "react-redux";
import PaginationComponent from "../components/pagination";

import AllProducts from "../components/Products/AllProducts";


function ProductPage() {


  
  return (
    <div className="container-fluid">
      <Navbar color="bg-info" />

      <div className="row mt-2">
        <div className="col">
          
        </div>
      </div>

    
 <AllProducts/>
      <Footer />
    </div>
  );
}

export default ProductPage;


