import logo from "./logo.svg";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProdctsPage from "./Pages/Products";
import Productdetail from "./Pages/Productdetail";
import CheckoutPage from "./Pages/CheckoutPage";
import ErrorPage from "./Pages/ErrorPage";
import SearchItems from "../src/Pages/SearchItems";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SearchItems/:productCat" element={<SearchItems />} />
        <Route path="/ProdctsPage" element={<ProdctsPage />} />
        <Route path="/Productdetail/:paramid" element={<Productdetail />} />
        <Route path="/CheckoutPage" element={<CheckoutPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

      
        <Route
          path="*"
          element={<ErrorPage  />}
        />
      </Routes>
    </>
  );
}

export default App;
