import React from "react";
import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import TopBar from "./TopBar";

export default function InitialPage() {
  const [items, setItems] = React.useState([]);
	React.useEffect(() => {
		const requisicao = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

		requisicao.then(response => {
			setItems([...response.data])
    });
	}, []);

function renderImg(props){
  return (
    <div key={props.id}>
      <Link to={`/${props.id}`}>
        <img src={props.posterURL} alt={props.title}></img>
      </Link>
    </div>  )
}

function ListImgs() {
  let listReturn = items.map(renderImg);
  return listReturn;
}

  return (
    <>
      <TopBar/>
      <Container>
        <h3>Selecione o filme</h3>
        <div>
          <ListImgs />
        </div>
        <button>
          <Link to="/movietime">Teste</Link>
        </button>  
      </Container>
    </>
  );
}

const Container = styled.div `
  //background-color:blue; 
  display:flex;
  justify-content:center; 
  flex-direction: column;

  h3{
    color:#293845;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    align-items: center;
    text-align: center;
  }
  div{
    display:flex;
    justify-content:space-around;
    flex-wrap:wrap;
  }
  img{
    width:130px;
    border: 8px solid white;
    border-radius:3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    margin-bottom:12px;
    &:hover{
      cursor:pointer;
    }
  }
  button{
    width:50px;
    &:hover{
      cursor:pointer;
    }
  }
`