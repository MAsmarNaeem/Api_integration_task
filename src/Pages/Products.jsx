

import React, { useEffect, useState } from "react";
import Product from "../components/Product/Product";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Audio } from "react-loader-spinner";

import { useDispatch } from "react-redux";
import PaginationComponent from "../components/pagination";
import { addvalue } from "../Store/CartSlice";
import { addToCart } from "../Store/AddCartSlice";

function ProductPage() {
  const [productData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [pageCount, setPageCount] = useState(0);
  const [loader, setLoader] = useState(false);
  
  const dispatch = useDispatch();

  const addCartItem = (id) => {
   
    dispatch(addToCart(id));
  };

  const opencart = () => {
    dispatch(addvalue(true));
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      setLoader(true);
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/?limit=${limit}&skip=${skip}&select=title,price,thumbnail`
      );
      const data = await response.json();
      setPageCount(Math.ceil(data.total / itemsPerPage));
      setProductsData(data.products);
      setLoader(false);
      if(data.products.length==0)
      {
        alert("Error")
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      alert("Kindly visit the website later");
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="container-fluid">
      <Navbar color="bg-info" />

      <div className="row mt-2">
        <div className="col">
          
        </div>
      </div>

      {loader && (
        <div className="col-12 d-flex justify-content-center mt-5">
          <Audio type="Oval" color="#00BFFF" height={100} width={100} />
        </div>
      )}

      <div className="row mt-3">
        {productData.map((myproducts) => (
          <Product
            key={myproducts.id}
            product={myproducts}
            addCartItem={addCartItem}
            opencart={opencart}
          />
        ))}
      </div>

      <PaginationComponent
        onPageChange={handlePageChange}
        pageCount={pageCount}
        itemsPerPage={itemsPerPage}
      />

      <Footer />
    </div>
  );
}

export default ProductPage;


