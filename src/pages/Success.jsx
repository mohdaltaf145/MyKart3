import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

const Successful = styled.div`
  display: flex;
  height: 100vh:
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Pay = styled.h1`
  color: #f56991;
  font-weight: 500;
`

const Success = () => {
  const location = useLocation();
  const history = useHistory()
  console.log(location);
  return(
      <Successful>
        <Pay>Payment Successfull!!</Pay>
        {history.push("/")}
      </Successful>
  );
};

export default Success;
