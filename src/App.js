// import logo from "./logo.svg";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProdctsPage from "./Pages/Products";


import Productdetail from "./Pages/Productdetail";
import CheckoutPage from "./Pages/CheckoutPage";
import "./App.css"

function App() {
  return (
    <>
     
      <Routes>
       
        <Route path="/" element={<HomePage />} />
      
       <Route path="/ProdctsPage" element={<ProdctsPage />} /> 
       
        <Route path="/Productdetail/:paramid" element={<Productdetail />} />
        <Route path="/CheckoutPage" element={<CheckoutPage />} />


        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
