import React from "react";
import  Navbar from '../Layout/navbar'
import "./dashboard.css";
import NavbarCom from "../Layout/navbar";

const dashboard = () => {
  const isLoggedIn = localStorage.getItem("token");
  return (
    
    <div>
       <NavbarCom/>
      {
     isLoggedIn ?  <h2 className="customcss mb-5 pb-5">Welcome to Dashboard</h2> :<h2 className="customcss mb-5 pb-5">Unauthorized </h2> 
}
    </div>
  );
};

export default dashboard;
