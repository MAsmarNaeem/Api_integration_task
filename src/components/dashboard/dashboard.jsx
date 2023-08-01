import React from "react";
import  Navbar from '../Layout/navbar'
import "./dashboard.css";
import NavbarCom from "../Layout/navbar";

const dashboard = () => {
  return (
    <div>
       <NavbarCom/>

      <h2 className="customcss mb-5 pb-5">Welcome to Dashboard</h2>
      <div className="fixed-bottom">
       
      </div>
    </div>
  );
};

export default dashboard;
