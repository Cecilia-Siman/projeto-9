import React from "react";
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import TopBar from "./TopBar";

export default function MovieTime() {

    const param = useParams();
    const [movieTime,setMovieTime] = React.useState([]);
    const [sessions,setSessions] = React.useState([]);

    console.log(param.idmovie);
    React.useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${param.idmovie}/showtimes`);

        requisicao.then(response => {
            setMovieTime([...response.data.days])
            console.log(response.data.days)
        });
    }, []);

    function renderDates(props){

        function renderTime(props){
            return(
                <>
                    <Link to={`/${props.id}`} >
                        <div className="buttonTime">{props.name}</div>
                    </Link>
                </>
            )
        }

        function ListTime(){
            let listReturn = props.showtimes.map(renderTime);
            return listReturn;
        }

        return(
            <div key={props.id} className="dates">
                <p>{props.weekday} - {props.date}</p>
                <TimeAvaliable>
                    <ListTime />
                </TimeAvaliable>
            </div>  

        )

    }

    
    function ListSessions() {
        let listReturn = movieTime.map(renderDates);
        return listReturn;
    }

    
    return(
        <>
            <TopBar/>
            <Container>
                <h3>Selecione o horário</h3>  
                <ListSessions/>              
                <button className="teste">
                    <Link to="/">Teste</Link>
                </button> 
            </Container>
        </>
    );
}

const Container = styled.div `
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
  .dates{
    display:flex;
    flex-direction:column;
    margin:0px 20px;
  }
  p{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;    
    color: #293845;
    //position:absolute;
    //top:10px;
    //left:20px;
  }

  }
  .teste{
    width:50px;
    position:fixed;
    top:10px;
    left:10px;

    &:hover{
      cursor:pointer;
    }
  }
 
`

const TimeAvaliable = styled.div `
display:flex;
flex-direction: row;

.buttonTime{
    width:84px;
    height:42px;
    background: #E8833A;
    border-radius: 3px;
    color:white;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:8px;
  }
`