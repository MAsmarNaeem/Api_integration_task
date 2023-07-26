import React from "react";
import NavbarCom from "../Layout/navbar";
import Footer from "../Layout/Footer/footer";
import "./dashboard.css";

const dashboard = () => {
  return (
    <div>
      <NavbarCom />

      <h2 className="customcss">Welcome to Dashboard</h2>
      <div className="fixed-bottom">
        <Footer className="customcss " />
      </div>
    </div>
  );
};

export default dashboard;
