import React from "react";



import AllProducts from "../components/Products/AllProducts";
import NavbarCom from "../components/Layout/navbar";

function ProductPage() {
  return (
    <>
    
    <NavbarCom/>
      <div className="container-fluid">
    
        <div className="row ">
          <div className="col"></div>
        </div>
      

        <AllProducts />
      
      </div>
    </>
  );
}

export default ProductPage;
