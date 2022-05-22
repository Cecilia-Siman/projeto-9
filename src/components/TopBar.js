import React from "react";
import styled from 'styled-components';

export default function TopBar() {
    return (
        <Container>
            <h1>CINEFLEX</h1>
        </Container>
        
    );
}

const Container = styled.div `
  background-color:#C3CFD9; 
  height:68px;
  display:flex;
  justify-content:center;
  align-items:center;

  h1{
    color:#E8833A;
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
  }
`