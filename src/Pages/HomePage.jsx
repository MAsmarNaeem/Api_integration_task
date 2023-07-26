import React from "react";

import Navbar from "../components/Layout/navbar";
import Footer from "../components/Layout/Footer/footer";
import Carousel from "react-bootstrap/Carousel";

import pic4 from "../../src/Pages/images/image111.jpg";
import pic5 from "../../src/Pages/images/image112.jpg";
import pic6 from "../../src/Pages/images/image113.jpg";

import AllProducts from "../components/Products/AllProducts";

function HomePage() {


  return (
    <>
      <Navbar color="bg-info" />
      <div className="">
      <div >
        <div className="col">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={pic4}
                alt="First slide"
                height={500}
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
                height={500}
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
                height={500}
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
  
          <AllProducts/>
      <Footer />
      </div>
      </>
  );
}

export default HomePage;
