import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({height: "20vh"})}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-coloe: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

//categories (item.cat) are women coat and jeans
const CategoryItem = ({ item }) => {
  return (
    <Container>
      {/*each categories have a link products/women or products/coat
      and if we click on that link we will redirect to that route */}
      <Link to={`/products/${item.cat}`}> 
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
