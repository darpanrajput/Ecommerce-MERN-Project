import { Navbar } from "./Navbar/Navbar";
import { Cart } from "./Pages/Cart";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import ProductPage from "./Pages/ProductPage";
import ProductList from "./Pages/ProductList";
import { Register } from "./Pages/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Pay from "./components/stripe/Pay";
import Success from "./components/stripe/Success";
import Failed from "./components/stripe/Failed";
import RazorPayPayment from "./components/RazorPayment";
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pay" element={user ? <Pay /> : <Login />} />
        <Route path="/success" element={user ? <Success /> : <Login />} />
        <Route path="/failed" element={user ? <Failed /> : <Login />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/find/:id" element={<ProductPage />} />
        <Route
          path="/Register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/Login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/cart" element={<Cart />} />

        {/* <RazorPay /> */}
      </Routes>
    </Router>
  );
};

export default App;
