

import React  from "react";

import Navbar from "../components/Layout/navbar";
import Footer from "../components/Layout/footer";


import AllProducts from "../components/Products/AllProducts";


function ProductPage() {


  
  return (
    <>
      <Navbar color="bg-info" />

    <div className="container-fluid">
    
      <div className="row ">
        <div className="col">
          
        </div>
      </div>

    
 <AllProducts/>
      <Footer />
    </div>
    </>
  );
}

export default ProductPage;


