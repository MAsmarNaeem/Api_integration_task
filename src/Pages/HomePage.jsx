import React, { useEffect, useState } from "react";
import ProductCard from "../components/Products";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch } from "react-redux";
import { addvalue } from "../Store/CartSlice";
import { addToCart } from "../Store/AddCartSlice";
import { Audio } from "react-loader-spinner";
import pic4 from "../../src/Pages/images/image111.jpg";
import pic5 from "../../src/Pages/images/image112.jpg";
import pic6 from "../../src/Pages/images/image113.jpg";
import PaginationComponent from "../components/pagination";

function HomePage() {
  const [productData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [loader, setLoader] = useState(false); 

  const dispatch = useDispatch();

  const addCartItem = (id) => {
    const speech = new SpeechSynthesisUtterance(
      "Item added into cart successfully"
    );

    speech.lang = "en-US";
    speech.volume = 5;
    speech.rate = 1;
    speech.pitch = 1;
    speech.voice = speechSynthesis
      .getVoices()
      .find((voice) => voice.name === "Google US English");
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
      setLoader(true); 
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/?limit=10&skip=10&select=title,price,thumbnail`
      );
      const data = await response.json();
      setPageCount(Math.ceil(data.total / itemsPerPage));
      setProductsData(data.products);
      setLoader(false); 
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
        `${process.env.REACT_APP_API_URL}/products/?limit=10&skip=${skip}&select=title,price,thumbnail`
      );
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.log("Error fetching data:", error);
      return [];
    }
  };

  const handlePageChange = async (selectedPage) => {
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
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
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
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
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
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
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
        {
        // productData.length === 0 ? (
        //   <div className="col-12 d-flex justify-content-center mt-5">
        //     <Audio type="Oval" color="#00BFFF" height={100} width={100} />
        //     Please Wait
        //   </div>
        // ) : (
          productData.map((myproducts) => (
            <ProductCard
              key={myproducts.id}
              product={myproducts}
              addCartItem={addCartItem}
              opencart={opencart}
            />
          ))
       // )
        }
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
