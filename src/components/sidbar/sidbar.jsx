import React, { useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import { Link} from "react-router-dom";
import { FiAlignCenter } from 'react-icons/fi';



function Sidebar(props) {
  const [Sidebar, setSidebar] = useState(false);

  const handleShow = () => 
  {
    setSidebar(!Sidebar);
  }

  return (
    <>
      <div>
        <Link
          to="#"
          className="nav-link ms-2"
          // style={{fontSize:"30px"}}
          onClick={handleShow}
        >
          <FiAlignCenter/>
        </Link>

        <Offcanvas
          // placement="end"
          show={Sidebar}
          onHide={handleShow}
          backdrop={false}
        >
          <Offcanvas.Header closeButton>
         
          </Offcanvas.Header>
          <Offcanvas.Body>
          <div className="text-center mt-5"> 
          <li>
                  <Link
                    to="/dashboard"
                    className="nav-link"
                   
                  >
                Dashboard   
                  </Link>
                  </li>
                  <Link
                    to="/users"
                    className="nav-link"
                  
                  >
                    Users
                  </Link>
                </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default Sidebar;
