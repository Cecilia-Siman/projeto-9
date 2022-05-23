import React from "react";
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import TopBar from "./TopBar";

export default function MovieTime() {

    const paramNotTreated = useParams();
    let param = paramNotTreated.idmovie;
    param = param.replace("movie/","");
    param = param.toString(param);
    
    const [movieTime,setMovieTime] = React.useState([]);
    const [movieInfo,setMovieInfo] = React.useState({});

    React.useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${param}/showtimes`);

        requisicao.then(response => {
            setMovieTime([...response.data.days])
            setMovieInfo({...response.data})
            console.log(response.data)
        });
    }, []);

    function renderDates(props){

        function renderTime(props){
            return(
                <>
                    <Link style={{textDecoration: 'none'}}  to={`/session${props.id}`} >
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
            </Container>
            <BottomBar>
                <img src={movieInfo.posterURL} alt="poster"></img>
                <p>{movieInfo.title}</p>
            </BottomBar>
        </>
    );
}
//<img src={movieInfo.posterURL} alt="poster"></img>
            

const Container = styled.div `
  display:flex;
  justify-content:center; 
  flex-direction: column;
  margin-bottom: 128px;

  h3{
    color:#293845;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    align-items: center;
    text-align: center;
    margin: 42px 0px;
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
margin:30px 0px;

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
    &:hover{
        cursor:pointer;
    }
  }
`

const BottomBar = styled.div `
  display:flex;
  flex-direction:row;
  align-items:center;
  height:118px;
  width:100%;
  position:fixed;
  bottom:0;
  left:0;
  background-color:#ffffff;
  //border-top: solid 1px #000000;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.5);
  img{
    width:48px;
    height:72px;
    border: 8px solid white;
    border-radius:3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    margin-left:10px;
    margin-right:16px;
  }
  p{
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    color: #293845;
  }
  
`