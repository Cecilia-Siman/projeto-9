import React from "react";
import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import TopBar from "./components/TopBar";

import { useParams } from "react-router-dom";


export default function MovieSession() {
    const paramNotTreated = useParams();
    
    let parameter = paramNotTreated.idsession;
    parameter = parameter.replace("session/","");
    //console.log(parameter);
    
    const [sessionInfo,setSessionInfo] = React.useState({});
    const [movieInfo,setMovieInfo] = React.useState({});
    const [movieDay,setMovieDay] = React.useState({});
    const [seatsInfo,setSeatsInfo] = React.useState([]);
    let listseats = [];

    React.useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${parameter}/seats`);

        requisicao.then(response => {
            setSessionInfo({...response.data})
            //console.log(response.data)
            setMovieInfo({...response.data.movie})
            setMovieDay({...response.data.day})
            setSeatsInfo([...response.data.seats])
            //console.log(response.data.seats)
        });
    }, []);

    

    function RenderSeats(props){
        const [chosen,setChosen] = React.useState(false);
        function clicked(number){
            function removevalue(value){
                return value !== number;    
            }
            if (!chosen){
                listseats.push(number);
            } else{
                listseats = listseats.filter(removevalue);
            }
            setChosen(!chosen);

            console.log(listseats);
            
        }
        return (
            <>
                {props.isAvailable ? 
                    <div className={chosen ? "selected":"avaliable"} onClick={()=>{clicked(props.id)}} key={props.id}><p>{props.name}</p></div> :
                    <div className="button notavaliable" onClick={()=>alert("Esse assento não está disponível")} key={props.id}>{props.name}</div>
                }
            </>
        )
    }

    //()=>{setChosen("selected");setListSeats([...listseats,props.name])}S

    function ListSeats(){
        const listReturn = seatsInfo.map(RenderSeats);
        return listReturn;
    }

    const [name, setName] = React.useState("");
    const [cpf, setCpf] = React.useState("");

    function submitData(event) {
        event.preventDefault();
        const obj = {
            name:name,
            cpf:cpf,
            ids:[...listseats],
        };
        console.log(obj);
        
        const requisicao = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',obj);
        requisicao.then(alert("Mensagem enviada com sucesso!"));    
        
        setName("");
        setCpf("");

    }


    return(
        <>
            <TopBar />
            <Container>
                <h3>Selecione o(s) assento(s)</h3>  
                <Seats>
                    <div>
                        <ListSeats/>
                    </div>
                </Seats>
                <div className="legend">
                    <div className="typeSeat">
                        <div style={{background: '#8DD7CF',border: '1px solid #1AAE9E'}}></div>
                        <p>Selecionado</p>
                    </div>
                    <div className="typeSeat">
                        <div style={{background: '#C3CFD9',border: '1px solid #7B8B99'}}></div>
                        <p>Disponível</p>
                    </div>
                    <div className="typeSeat">
                        <div style={{background: '#FBE192',border: '1px solid #F7C52B'}}></div>
                        <p>Indisponível</p>
                    </div>
                </div>
            </Container>

            <FormStyle>
                <form onSubmit={submitData}>
                    <p htmlFor="name">Nome do comprador:</p>
                    <input 
                    type="name" 
                    id="name" 
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome..."
                    />
                    <p>CPF do comprador:</p>
                    <input 
                    type="name" 
                    value={cpf}
                    required
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Digite seu CPF..."
                    />
                    <button type="submit" >Reservar assento(s)</button>
                </form>
            </FormStyle>
            <BottomBar>
            <img src={movieInfo.posterURL} alt="poster"></img>
            <div>
                <p>{movieInfo.title}</p>
                <p>{movieDay.weekday} - {sessionInfo.name}</p>
            </div>
            </BottomBar>
        </>
    );

}


const Container = styled.div `
  display:flex;
  justify-content:center; 
  flex-direction: column;
  margin-bottom: 46px;

  h3{
        color:#293845;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        align-items: center;
        text-align: center;
        margin: 42px 0px 20px 0px;
    }
  .legend{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        margin-top:10px;
    }
  .typeSeat{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
    }
  .typeSeat div{
        width: 25px;
        height: 25px;
        border-radius: 17px;
    }
  .typeSeat p{
        margin-top:5px;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        color: #4E5A65;
    }
`
const Seats = styled.div`
width:100%;

div{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
}

    .button{
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        color: #000000;

        width: 26px;
        height: 26px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius: 50%;
        margin: 10px 4px;
        box-size:border-box;
        &:hover{
            cursor:pointer;
        }
    }
    .avaliable{
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        color: #000000;

        background: #C3CFD9;
        border: 1px solid #7B8B99;
        width: 26px;
        height: 26px;
        display:flex;
        align-items:center;
        justify-content:center;
        border: 1px solid #808F9D;
        border-radius:50%;
        margin: 10px 4px;
        &:hover{
            cursor:pointer;
        }
    }
    .selected{
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        color: #000000;

        background: #8DD7CF;
        border: 1px solid #1AAE9E;
        width: 26px;
        height: 26px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius: 50%;
        margin: 10px 4px;
        &:hover{
            cursor:pointer;
        }
    }
    .notavaliable{
        background: #FBE192;
        border: 1px solid #F7C52B;
    }
`

const FormStyle = styled.div `
margin-bottom:128px;

form{
    display:flex;
    flex-direction:column;
}
input{
    margin:10px 25px;
    //width: 327px;
    height: 51px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
    padding-left:16px;
    &::placeholder{
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
        color: #AFAFAF;
    }
}
p{
    margin: 0px 25px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #293845;
}

button {
    margin 50px 70px 10px 70px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
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
  div{
      display:flex;
      flex-direction:column;
  }
  p{
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    color: #293845; 
    margin-bottom:5px;
  }
  
`