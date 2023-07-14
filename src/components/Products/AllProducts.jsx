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
 const[text,setText]=useState("")
const[textSubmit,setTextSubmit]=useState("")


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

  const getValue=(e)=>
  {
   setText(e.target.value)
  }
  const sumitButtonSearch=()=>
  {
    setTextSubmit(text)
    getSearchApi()
  }
  const getSearchApi= async()=>
  {
   
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products/search?q=${textSubmit}`
    );

    const dataSearch = await response.json();
   
    setProductsData(dataSearch.products);
   

  }
  useEffect(() => {
    GetProducts(currentPage);
    sumitButtonSearch()
  }, [skip]);

  return (
    <div className="mt-5">
      <input type="text"  placeholder="Search"  onChange={getValue}/><button onClick={sumitButtonSearch}>Search</button>
   
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
