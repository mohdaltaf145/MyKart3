import React from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/userRedux"
import {mobile} from "../responsive"
import { emptyProduct } from "../redux/cartRedux";
import { zeroPrice } from "../redux/cartRedux";
 
const Container = styled.div`
  height: 60px;
  ${mobile({height: "50px"})}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({padding: "10px 0px"})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({marginLeft: "-20px", marginRight: "5px"})}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display: "none"})}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({width: "50px"})}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize: "20px", marginLeft: "5px"})}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({flex: 3, justifyContent: "center", margin: "0px 5px"})}
`;

const MenuItem = styled.div`
  fosnt-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  underline: none;
  color: black;
  ${mobile({fontSize: "11px", marginLeft: "10px"})}
`;

const Button = styled.button`
  margin-left: 15px;
  margin-top: 5px;
  border: none;
  padding: 10px 15px;
  background-color: #f56991;
  color: black;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: center;
  ${mobile({padding: "5px 8px", fontSize: "10px"})}
`

const Navbar = () => {
  //useSelector is used to ectract "value" from the global state
  const quantity = useSelector((state) => state.cart.quantity); //will give the initial state quantity from cartRedux
  const total = useSelector((state) => state.cart.total); //will give the initial state quantity from cartRedux
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser(currentUser))
    dispatch(emptyProduct(quantity))
    dispatch(zeroPrice(total))
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search"/>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Center>
            <Logo style={{color: "Black"}}>MyKart.</Logo>
          </Center>
        </Link>
        <Right>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          {/* <Link to="/logout" style={{ textDecoration: "none" }}>
            <MenuItem>LOGOUT</MenuItem>
          </Link> */}
          <Button onClick={handleClick}>LOGOUT</Button>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
