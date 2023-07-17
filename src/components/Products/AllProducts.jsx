import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

import { Audio } from "react-loader-spinner";

import { useDispatch } from "react-redux";
import PaginationComponent from "../pagination";
import { addvalue } from "../../Store/CartSlice";
import { addToCart } from "../../Store/AddCartSlice";

const AllProducts = () => {
  const [productData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [pageCount, setPageCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [skip, setskip] = useState(0);
  const [text, setText] = useState("");
  const [textSubmit, setTextSubmit] = useState("");
  const [searchButton, setSearchButton] = useState(false);
 // const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
   // setSelectedOption(e.target.value);
    setText(e.target.value)
  };
 console.log("text is ",textSubmit);

  const dispatch = useDispatch();

  const addCartItem = (id) => {
    dispatch(addToCart(id));
  };

  const opencart = () => {
    dispatch(addvalue(true));
  };
  const categories = ["iphone",
  "laptop",
  
  "perfume",
  "furniture",
  "tops",
  " serum",
  "womens-shoes",
  "mens-shirts",
  "Lamp",
  "Rings",
  "goggles",
  "T-Shirts",
  "Watch",
  "sunglasses",
  "bag",
  "motorcycle",
  "lighting"];
  const GetProducts = async (page) => {
    try {
      setLoader(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/?limit=${itemsPerPage}&skip=${skip}&select=title,price,thumbnail`
      );
      const data = await response.json();
      setPageCount(Math.ceil(data.total / itemsPerPage));
      setProductsData(data.products);

      if (data.products.length == 0) {
        alert("Error");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  const handlePageChange = (selectedPage) => {
    setskip((selectedPage - 1) * itemsPerPage);
    setCurrentPage(selectedPage);
  };

  const getValue = (e) => {
    setText(e.target.value);
  };
  const sumitButtonSearch = () => {
    
    setTextSubmit(text);
    getSearchApi();
  };
  console.log("text is :",textSubmit);
  const getSearchApi = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/search?q=${textSubmit}`
      );

      const dataSearch = await response.json();

      setProductsData(dataSearch.products);
      if (dataSearch.products.length === 0) {
        setProductsData(["Not Item Found"]);
      } else {
        setProductsData(dataSearch.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    GetProducts(currentPage);
    
    sumitButtonSearch();
  }, [skip,text]);


  
  return (
    <div className="mt-5 ">
      {searchButton && (
        <div
          style={{
            position: "fixed",
            top: 30,
            zIndex: 10,
            background: "lightgrey",
            opacity: "0.8",
          }}
          className="d-inline p-4"
        >
          <input
            type="text"
            placeholder="Search"
            className="form-control d-inline "
            style={{ width: "350px" }}
            onChange={getValue}
            value={text}
          />
          <button onClick={sumitButtonSearch} className="btn btn-primary ms-2 ">
            Search
          </button>
          <br />
          <ul style={{ listStyle: "none" }}>
            {categories.map((category) => (
              <li key={category} style={{ color: "black" }}>
                <label>
                  <input
                    type="radio"
                    value={category}
                    checked={text === category}
                    onChange={handleOptionChange}
                  />
                  <p className="d-inline ms-5"> {category}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="text-center">
      <button
        className="btn btn-primary ms-5 "
        onClick={() => setSearchButton(!searchButton)}
        
      >
        {searchButton ? "Hide" : "Search"}
      </button>
      </div>
      {loader && (
        <div className="col-12 d-flex justify-content-center ">
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
    </div>
  );
};

export default AllProducts;
