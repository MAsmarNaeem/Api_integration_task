import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
 import Sidebar from "./Sidebar";
 import style from "../components/navbar.css";
import SearchItems from "./SearchIcons";

const NavbarCom = (props) => {
  const isLoggedIn = localStorage.getItem("key");

  const logoutFun = () => {
    localStorage.clear();
  };
  

  return (
    <>
      <Navbar expand="lg" className="bg-info" sticky="top" variant="light">
      <Container fluid>
          {/* <Navbar.Brand href="/">My Shopping App</Navbar.Brand> */}
          <Link className="navbar-brand" to="/">My Shopping App</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/ProdctsPage" className="nav-link">Products</Link>

               <SearchItems />
          </Nav>
            <Nav>
              <Sidebar myids={props.ids} className="d-inline" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     {/* <div
       className="bg-info row justify-content-center py-2 fixed"
        style={{ position: "fixed", width: "100%", top: 0, left: 0, zIndex: 10 }}
     >
       <div className="col-md-3"></div>
       <div className="col-md-6">
         <Navbar expand="lg" className="" fixed="top">
           <Container>
             <h3 className={style.name}>
               <Link to="/" className="text-decoration-none text-white ms-3">
                 My Shopping App
               </Link>
               <Link
                 to="/ProdctsPage"
                 className="text-decoration-none text-white ms-4"
               >
                 Products
               </Link>
             </h3>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav">
         
               <Nav>
                 {isLoggedIn ? (
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
                 ) : (
                   <>
                     <h3>
                       <Link
                         className="text-decoration-none text-white ms-5"
                         to="/login"
                       >
                         Login
                       </Link>
                     </h3>
                     <h3 style={{ zIndex: 1 }}>
                       <Link
                         className="text-decoration-none text-white ms-5"
                         to="/signup"
                       >
                         Signup
                       </Link>
                     </h3>
                   </>
                 )}
               </Nav>
               <Nav>
                 <div
                   className="d-flex align-items-center"
                   style={{ paddingLeft: "100px" }}
                 >
                   <SearchItems />
                 </div>
               </Nav>
             </Navbar.Collapse>
           </Container>
         </Navbar>
       </div>

       <div
         className="col-md-3 text-end px-5 pt-2 d-inline"
         style={{ marginTop: "2px", zIndex: "10px" }}
       >
         <Sidebar myids={props.ids} className="d-inline" />
       </div>
     </div> */}
    </>
  );
};

export default NavbarCom;
