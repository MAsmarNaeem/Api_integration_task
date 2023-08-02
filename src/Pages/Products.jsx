import React from "react";
import AllProducts from "../components/Products/AllProducts";
import NavbarCom from "../components/Layout/navbar";
import { Outlet, Link } from "react-router-dom";

function ProductPage() {
  return (
    <>
      <NavbarCom />
      {/* <nav className="ms-3 ">
       
       <Link to="NP">NP</Link>
       <Link to="FP" className="ms-2">FP</Link>
     </nav> */}
     <Outlet/>
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
