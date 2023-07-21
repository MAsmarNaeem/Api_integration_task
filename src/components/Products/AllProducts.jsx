import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { Bars } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import PaginationComponent from "../Pagination/pagination";
import { addvalue } from "../../Store/CartSlice";
import { addToCart } from "../../Store/AddCartSlice";
import "./AllProducts.css";

const AllProducts = () => {
  const [productData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [skip, setSkip] = useState(0);
  const[error,seterror]=useState("")

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
      seterror(error)
    } finally {
      setLoader(false);
    }
  };
 
  const handlePageChange = (selectedPage) => {
    setSkip((selectedPage - 1) * itemsPerPage);
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
     // eslint-disable-next-line
    GetProducts(currentPage);
     // eslint-disable-next-line
  }, [skip]);

  return (
    <div className="mt-5">
      {loader && (
        <div className="col-12 d-flex justify-content-center ">
          <p>{error}</p>
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
