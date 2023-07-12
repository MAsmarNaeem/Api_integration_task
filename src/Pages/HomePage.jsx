

import React, { useEffect, useState } from "react";
import Product from "../components/Product/Product";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Carousel from "react-bootstrap/Carousel";
import { Audio } from "react-loader-spinner";
import pic4 from "../../src/Pages/images/image111.jpg";
import pic5 from "../../src/Pages/images/image112.jpg";
import pic6 from "../../src/Pages/images/image113.jpg";
import { useDispatch } from "react-redux";
import PaginationComponent from "../components/pagination";
import { addvalue } from "../Store/CartSlice";
import { addToCart } from "../Store/AddCartSlice";

function HomePage() {
  const [productData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [pageCount, setPageCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const[skip,setskip]=useState(0)
  
  const dispatch = useDispatch();

  const addCartItem = (id) => {
   
    dispatch(addToCart(id));
  };

  const opencart = () => {
    dispatch(addvalue(true));
  };
  useEffect(() => {
    GetProducts(currentPage);
  }, [skip]);

  const GetProducts = async (page) => {
    try {
      setLoader(true);
    
     
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/?limit=${itemsPerPage}&skip=${skip}&select=title,price,thumbnail`
      );
      const data = await response.json();
      setPageCount(Math.ceil(data.total / itemsPerPage));
      setProductsData(data.products);
     // setLoader(false);
      if(data.products.length==0)
      {
        alert("Error")
      }
    
    } catch (error) {
    // setLoader(false)
      console.log("Error fetching data:", error);
      
    //  alert("Kindly visit the website later");
    }
    finally
    {
      setLoader(false)
    }
  }
  

  const handlePageChange = (selectedPage) => {
 
    setskip((selectedPage-1)*itemsPerPage)
    setCurrentPage(selectedPage);
  };

  return (
    <div className="container-fluid">
      <Navbar color="bg-info" />

      <div className="row mt-2">
        <div className="col">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={pic4}
                alt="First slide"
                height={700}
              />
              <Carousel.Caption>
                <h3>Welcome to our Store</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={pic5}
                alt="Second slide"
                height={700}
              />
              <Carousel.Caption>
                <h3 className="text-info">Best Services Available</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={pic6}
                alt="Third slide"
                height={700}
              />
              <Carousel.Caption>
                <h3 className="text-info">Quality Products</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
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

export default HomePage;


