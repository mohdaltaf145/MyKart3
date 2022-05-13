import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    height: 30px;
    background-color: #f56991;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    color: black;
`;

const Info = styled.h3`
  flex: 1.8;
  margin-left: 8px;
  color: black;
  font-size: 15px;
  ${mobile({fontSize: "10px", flex: 0.8})}
`
const Heading = styled.div`
  margin-left: 18px;
  flex: 5.5;
  color: black;
   ${mobile({fontSize: "8.5px", flex: 1, marginLeft: "-0.5px"})}
`

const Announcement = () => {
  return(
    <Container>
        <Heading>Super Deal! Free Shipping on Orders Over 1000₹</Heading>
        <Info>Made with ❤️ By Group 13</Info>
    </Container>
  )
};

export default Announcement;
