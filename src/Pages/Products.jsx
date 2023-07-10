import React, { useEffect, useState } from "react";
import ProductCard from "../components/Products";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ReactPaginate from "react-paginate";
import Carousel from "react-bootstrap/Carousel";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addvalue } from "../Store/CartSlice";
import { addToCart } from "../Store/AddCartSlice";
import { Audio } from "react-loader-spinner";
import PaginationComponent from "../components/pagination";



function ProdctsPage() {
  const [productData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const dispatch = useDispatch();

  const addCartItem = (id) => {
    const speech = new SpeechSynthesisUtterance("Item added into cart successfully");

    speech.lang = "en-US";
    speech.volume = 5;
    speech.rate = 1;
    speech.pitch = 1;
    speech.voice = speechSynthesis.getVoices().find((voice) => voice.name === "Google US English");
    window.speechSynthesis.speak(speech);

    dispatch(addToCart(id));
  };

  const opencart = () => {
    dispatch(addvalue(true));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/?limit=10&skip=10&select=title,price,thumbnail`
      );
      const data = await response.json();
      setPageCount(Math.ceil(data.total / itemsPerPage));
      setProductsData(data.products);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialProducts = await dataLimit(currentPage);
      setProductsData(initialProducts);
    };
    fetchData();
  }, [currentPage]);

  const dataLimit = async (currentPage) => {
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/?_page=${currentPage}&limit=10&skip=${skip}&select=title,price,thumbnail`
      );
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.log("Error fetching data:", error);
      return [];
    }
  };

  const handlePageClick = async (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="container-fluid">
      <Navbar color="bg-info" />

     

      <div className="row mt-3">
        {productData.length === 0 ? (
          <div className="col-12 d-flex justify-content-center mt-5">
            <Audio type="Oval" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          productData.map((myproducts) => (
            <ProductCard
              key={myproducts.id}
              product={myproducts}
              addCartItem={addCartItem}
              opencart={opencart}
            />
          ))
        )}
      </div>

      <PaginationComponent
        onPageChange={handlePageClick}
        pageCount={pageCount}
        itemsPerPage={itemsPerPage}
      />
      

      <Footer />
    </div>
  );
}

export default ProdctsPage;

