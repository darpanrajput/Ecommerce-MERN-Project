import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge/Badge";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/apiCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px", marginTop: "5px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "0px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: "2" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin: 25px;
  padding: 5px;
  ${mobile({ margin: "10px", padding: "2px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "40px" })}
`;
const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "20px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;
export const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/", { replace: true });
  };
 // console.log(cart);
  // );

  const logoutUser = () => {
    logout(dispatch);
   // console.log("logout called");
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Loging You Out",
      success: "Logout Success 👌",
      error: "Logout Failed 🤯",
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "grey", fontSize: "16px" }} />
          </SearchContainer>
        </Left>

        <Center>
          <Logo onClick={goToHome}>SHOP</Logo>
        </Center>

        <Right>
          {!user ? (
            <Link
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <MenuItem>Register</MenuItem>
            </Link>
          ) : (
            <MenuItem>{`Hi,${user.username}`}</MenuItem>
          )}
          {user ? (
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          ) : (
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <MenuItem>Sign in</MenuItem>
            </Link>
          )}
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <MenuItem>
              <Badge
                badgeContent={cart.quantity}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    </Container>
  );
};
