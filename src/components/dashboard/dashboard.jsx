import React from "react";
import  Navbar from '../Layout/navbar'
import "./dashboard.css";
import NavbarCom from "../Layout/navbar";

const dashboard = () => {
  
  return (
    <div>
       <NavbarCom/>

      <h2 className="customcss " >Welcome to Dashboard</h2>
     
    </div>
  );
};

export default dashboard;
