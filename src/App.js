
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth";
import { Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProdctsPage from "./Pages/Products";
import Productdetail from "./Pages/Productdetail";
import CheckoutPage from "./Pages/CheckoutPage";
import ErrorPage from "./Pages/ErrorPage";


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

      
        <Route
          path="*"
          element={<ErrorPage  />}
        />
      </Routes>
    </>
  );
}

export default App;
