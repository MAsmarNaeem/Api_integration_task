import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { Bars } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import PaginationComponent from "../pagination";
import { addvalue } from "../../Store/CartSlice";
import { addToCart } from "../../Store/AddCartSlice";
import { BsSearch } from "react-icons/bs";
import "./AllProducts.css";

const AllProducts = () => {
  const [productData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [skip, setSkip] = useState(0);


 // const [searchButton, setSearchButton] = useState(false);
 



  const dispatch = useDispatch();

  const addCartItem = (id) => {
    dispatch(addToCart(id));
  };

  const opencart = () => {
    dispatch(addvalue(true));
  };

  const GetProducts = async (page) => {
    try {
      setLoader(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/?limit=${itemsPerPage}&skip=${skip}&select=title,price,thumbnail`
      );
      const data = await response.json();

      setPageCount(Math.ceil(data.total / itemsPerPage));
      setProductsData(data.products);

      if (data.products.length === 0) {
        alert("Error");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };
  console.log("page count is :", pageCount);
  const handlePageChange = (selectedPage) => {
    setSkip((selectedPage - 1) * itemsPerPage);
    setCurrentPage(selectedPage);
  };

 








  // const getSearchApi = async () => {
  //   try {
  //     setLoader(true);
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}/products/search?q=${textSubmit}`
  //     );

  //     const dataSearch = await response.json();
  //     setPageCount(Math.ceil(dataSearch.total / itemsPerPage));

  //     if (dataSearch.products.length === 0) {
  //       setProductsData(["Not Item Found"]);
  //     } else {
  //       setProductsData(dataSearch.products);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };
  // useEffect(() => {
  //   getCategorytype();
  // }, [selectedOption]);

  // const getCategorytype = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}/products/category/${selectedOption}`
  //     );

  //     const dataSearch = await response.json();
  //     setPageCount(Math.ceil(dataSearch.total / itemsPerPage));
  //     console.log("data search is :", dataSearch);
  //     console.log("selected option:", selectedOption);

  //     if (dataSearch.products.length === 0) {
  //       setProductsData(["Not Item Found"]);
  //     } else {
  //       setProductsData(dataSearch.products);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    GetProducts(currentPage);
    //getCategory();

   // submitButtonSearch();
  }, [skip]);

  return (
    <div className="mt-5">
     
      {/* <div className="text-start pt-1">
        <button
          className="btn btn-primary ms-5 mt-3"
          style={{ position: "fixed", zIndex: 10 }}
          onClick={() => setSearchButton(!searchButton)}
        >
          {searchButton ? "Hide" : "Search"}
        </button>
      </div> */}
      {loader && (
        <div className="col-12 d-flex justify-content-center ">
          {/* <Audio type="Oval" color="#00BFFF" height={400} width={400} /> */}
          <Bars
            height="400"
            width="400"
            color="lightgrey"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
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
    </div>
  );
};

export default AllProducts;
