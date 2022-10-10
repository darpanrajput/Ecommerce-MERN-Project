import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import { User } from "./pages/user/User";
import { NewUser } from "./pages/newuser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./Componets/context/darkModeContext";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const user = useSelector((state) => state.user.currentUser);
  console.log(user?.isAdmin);
  return (
    <div className={darkMode ? "App dark" : "App"}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={user?.isAdmin ? <Home /> : <Login />}
          />
          <Route
            path="/users"
            element={user?.isAdmin ? <UserList /> : <Login />}
          />
          <Route
            path="/user/:userId"
            element={user?.isAdmin ? <User /> : <Login />}
          />
          <Route
            path="/newUser"
            element={user?.isAdmin ? <NewUser /> : <Login />}
          />
          <Route
            path="/products"
            element={user?.isAdmin ? <ProductList /> : <Login />}
          />
          <Route
            path="/product/:productId"
            element={user?.isAdmin ? <Product /> : <Login />}
          />
          <Route
            path="/newProduct"
            element={user?.isAdmin ? <NewProduct /> : <Login />}
          />
          <Route path="/login" element={user?.isAdmin ? <Home /> : <Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
