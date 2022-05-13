import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({width: "0px 20px", display: "flex", flexDirection:"column"})}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight: "0px"})}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({margin: "10px 0px"})}
`
const Option = styled.option``

const ProductList = () => {
  const location = useLocation();
  // console.log(location) //console pathname: "/products/women"
  const cat = location.pathname.split("/")[2] //will give "women" if localhost:5000/products/women and "coat" if localhost:5000/products/coat

  const[filters, setFilters] = useState({}) //to change color and size using useState
  const[sort, setSort] = useState("newest")

  const handleFilters = (e) => {
    const value = e.target.value
    setFilters({
      ...filters, //to keep the previous state
      [e.target.name]: value,
    })
  }
 
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="color" onChange={handleFilters}>
              <Option disalbed>Color</Option>
              <Option>white</Option>
              <Option>black</Option>
              <Option>red</Option>
              <Option>blue</Option>
              <Option>yellow</Option>
              <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
              <Option disabled>Size</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
