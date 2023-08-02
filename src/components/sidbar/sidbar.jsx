import React, { useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import { Link} from "react-router-dom";
import { FiAlignCenter } from 'react-icons/fi';
import { MdDashboardCustomize } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi'


function Sidebar(props) {
  const [Sidebar, setSidebar] = useState(false);

  const handleShow = () => 
  {
    localStorage.setItem("cond",Sidebar)
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
          style={{top:"52px",width:"220px"}}
        >
          <Offcanvas.Header >
         
          </Offcanvas.Header>
          <Offcanvas.Body>
          <div> 
        
                  <Link
                    to="/dashboard"
                    className="nav-link"
                   
                  >
                    <MdDashboardCustomize /> Dashboard   
                  </Link>
                  
                  <Link
                    to="/users"
                    className="nav-link"
                  
                  >

                   <FiUsers/> Users
                  </Link>
                </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default Sidebar;
