import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth";
import { Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProdctsPage from "./Pages/Products";
import Productdetail from "./Pages/Productdetail";
import CheckoutPage from "./Pages/CheckoutPage";
import ErrorPage from "./Pages/ErrorPage";
import Dashboard from "./Pages/dashboard";
import User from "./Pages/User";

import Footer from "./components/Layout/Footer";

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProdctsPage />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/product/:paramid" element={<Productdetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
