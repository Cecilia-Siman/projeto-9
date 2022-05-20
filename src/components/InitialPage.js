import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function InitialPage() {
    const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		const requisicao = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

		requisicao.then(resposta => {
			setItems(resposta.data.items);console.log("sucesso!");
		});
	}, []);
  return (
    <div className="initialPage">
      <div className="topBar">
          CINEFLEX
      </div>
      <h3>Selecione o filme</h3>
      <div>Filme</div>   
    </div>
  );
}