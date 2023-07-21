

import React  from "react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";


import AllProducts from "../components/Products/AllProducts";


function ProductPage() {


  
  return (
    <div className="container-fluid">
      <Navbar color="bg-info" />

      <div className="row mt-5">
        <div className="col">
          
        </div>
      </div>

    
 <AllProducts/>
      <Footer />
    </div>
  );
}

export default ProductPage;


