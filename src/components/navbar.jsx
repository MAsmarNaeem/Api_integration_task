import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import style from "../components/navbar.css";
import SearchItems from "./SearchIcons";

const NavbarCom = (props) => {
  const isLoggedIn = localStorage.getItem("key");

  const logoutFun = () => {
    localStorage.clear();
  };
  

  return (
    <div
      className="bg-info row justify-content-center"
      style={{ position: "fixed", width: "100%", top: 0, left: 0, zIndex: 10 }}
    >
      <div className="col-md-3"></div>
      <div className="col-md-5">
        <Navbar expand="lg" className="">
          <Container>
            <Navbar.Brand href="/">
              <h3 className={style.name}>
                <Link to="/" className="text-decoration-none text-white ms-3">
                  Shopping App
                </Link>
                <Link
                  to="/ProdctsPage"
                  className="text-decoration-none text-white ms-5"
                >
                  Products
                </Link>
              </h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link></Nav.Link>
                <Nav.Link></Nav.Link>
              </Nav>
              <Nav>
                {isLoggedIn ? (
                  <Nav.Link>
                    <h3>
                      <Link
                        className="text-decoration-none text-white"
                        onClick={logoutFun}
                        to="/login"
                        style={{}}
                      >
                        Logout
                      </Link>
                    </h3>
                  </Nav.Link>
                ) : (
                  <>
                    <Nav.Link>
                      <h3>
                        <Link
                          className="text-decoration-none text-white "
                          to="/login"
                        >
                          Login
                        </Link>
                      </h3>
                    </Nav.Link>
                    <Nav.Link>
                      <h3 style={{ zIndex: 1 }}>
                        <Link
                          className="text-decoration-none text-white ms-4"
                          to="/signup"
                          style={{ marginRight: "440px" }}
                        >
                          Signup
                        </Link>
                      </h3>
                    </Nav.Link>
                  </>
                )}
              </Nav>
              {/* Search Icon and Cart Component */}
              <Nav>
                <div
                  className="d-flex align-items-center"
                  style={{ marginLeft: "20px" }}
                >
                  <SearchItems />
                  
                  {/* Add your Cart component here */}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div
        className="col-md-4 text-end px-5 pt-2 d-inline"
        style={{ marginTop: "2px", zIndex: "10px" }}
      >
        <Sidebar myids={props.ids} className="d-inline" />
      </div>
    </div>
  );
};

export default NavbarCom;
