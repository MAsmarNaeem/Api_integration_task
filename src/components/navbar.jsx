import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import style from '../components/navbar.css'

const navbar = (props) => {
  const logoutFun = () => {
    localStorage.clear();
  };
  return (
    <div className="bg-info  row  justify-content-center" >
      <div className="col-md-3"></div>
      <div className="col-md-5">
        <Navbar expand="lg" className="">
          <Container>
            <Navbar.Brand href="/" >
              <h3 className={style.name}>
                <Link to="/" className="text-decoration-none text-white ms-3 " >
                  My Shopping App
                </Link>
                <Link
                  to="/ProdctsPage"
                  className="text-decoration-none text-white ms-4 "
                >
                  Products
                </Link>
              </h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
              <Nav className="me-auto">
                <Nav.Link>
                  {/* <h3>
                    <Link className="text-decoration-none text-white " to="/">
                      Home
                    </Link>
                  </h3> */}
                </Nav.Link>
                <Nav.Link></Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link>
                  <h3>
                    <Link
                      className="text-decoration-none text-white "
                      onClick={logoutFun}
                      to="/login"
                      style={{}}
                    >
                      Logout
                    </Link>
                  </h3>
                </Nav.Link>

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
                  <h3 style={{zIndex:1}}>
                    <Link
                      className="text-decoration-none text-white "
                      to="/signup"
                      style={{ marginRight: "490px" }}
                    >
                      Signup
                    </Link>
                  </h3>
                </Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="col-md-4 text-end px-5 pt-2 name" style={{ marginTop: "2px",zIndex:1 }}>
        <Sidebar myids={props.ids} />
      </div>
    </div>
  );
};

export default navbar;
