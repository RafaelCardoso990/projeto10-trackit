
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"



export default function Seats(){
    const {idSessao} = useParams();
    const [seats, setSeats] = useState([])
    
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`)
        promise.then(response => {
            const {data} = response
            setSeats(data)            
        })
        promise.catch((err) => {
            console.log(err);
        })
        
    },[])
   
    let array = []
    let objeto = {}
    let valorInput;
    let nameInput;
    
    let cpf = e =>{
        console.log(e.target.value)
        valorInput = e.target.value
    }

    let nome = e =>{
        console.log(e.target.value)
        nameInput = e.target.value
    }
    console.log(seats)
   


   
    const {name, movie, day} = seats
    return seats.length != 0 ?(
        
        <Main>               
            <header>CINEFLIX</header>
            
            <h1>Selecione o(s) assento(s)</h1>
            <div className="tudo">
                <div>
                    {seats.seats.map((seat)=> {      
                        let {name, isAvailable} = seat
                        
                        return( 
                            <div className={`seats ${isAvailable}`} onClick={(e) => 
                              {  
                                    if(e.target.className === "seats true"){
                                     e.target.className = "seats selecionado"
                                     array.push(seat.id)
                                     console.log(array)

                                }else if(e.target.className === "seats selecionado" ){
                                    array = array.filter(value => value !== seat.name)
                                    e.target.className = "seats true"
                                    console.log(array)                                 
                                }else if(e.target.className === "seats false"){
                                    alert("Assento Selecionado")
                                }}
                            }>{name}</div>
                        )              
                    })}  
                </div> 
                <div>
                    <span className="selected">
                        <div className="seat">
                            <article className="selecionado"> </article>
                            <p>Selecionado</p>
                        </div>
                        <div className="seat">
                            <article className="disponivel"> </article>
                            <p>Disponivel</p>
                        </div>
                        <div className="seat">
                            <article className="false"> </article>
                            <p>Indisponível</p>
                        </div>
                    </span>    
                </div>        

                
                <Forms>
                    <form >
                        <div className="input-cima">
                            <h6 className="titulo">Nome do comprador:</h6>
                            <input placeholder="Digite seu nome..." onKeyDown={(e) => nome(e)}></input>
                        </div>
                    <div className="input-baixo">
                            <h6 className="titulo">CPF do comprador:</h6>
                            <input placeholder="Digite seu CPF..." onKeyDown={(e) => cpf(e)}></input>
                        </div>
                    </form>
                </Forms>  
                
                
            </div>
                
            <Link to="/sucesso"><button onClick={() => click()}>Reservar assento(s)</button></Link>

            <footer>
                <div className="box-footer">
                    <img src={movie.posterURL}/>
                </div>
                <div className="title-day">   
                    <h2>{movie.title}</h2>
                    <h2>{day.weekday} - {name}</h2>
                </div>     
            </footer>
        </Main>
    ):<></>
     
    function click(){
        createObject();
        const timer = setTimeout(() => {
            post()  
          }, 2000);
    }

    function createObject(){
        objeto = {ids: array, 
                       name: nameInput,
                       cpf: valorInput}
    }
                    
    function post(){
        console.log(objeto)
        let promise = axios.post('ttps://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', objeto)
            promise.then(response => {
                alert('Deu certo')  
                console.log(response)          
            })
            promise.catch(response =>{
                console.log(response.statusText)
            })
       
    }
}


const Forms = styled.section`
        
      form{
           
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
        }

        .input-cima{
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
        }

        .input-baixo{
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
        }

        .titulo{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            color: #293845;
        }

        input{
            width: 327px;
            height: 51px;            
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            box-sizing: border-box;
            border-radius: 3px;
            
            font-family: 'Roboto';
            font-style: italic;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;  
            color: #AFAFAF;
        }
        
        
`


const Main = styled.main`
        width: 100vw;
        height: 100%;
        text-align: center;
        position: relative;
        

        button{
            width: 225px;
            height: 42px;      
            border: none;
            background: #E8833A;
            border-radius: 3px;
            margin-top: 100px;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;         
            letter-spacing: 0.04em;
            color: #FFFFFF;
            margin-bottom: 200px;

        }       

        p{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 15px;
            display: flex;
            align-items: center;
            letter-spacing: -0.013em;
            color: #4E5A65;
        }
        .selected{
            display: flex;
            
        }

        .selecionado{
            width: 24px;
            height: 24px;
            background: #C3CFD9;
            border: 1px solid #808F9D;
            box-sizing: border-box;
            border-radius: 12px;
                    
        }

        .disponivel{
            width: 24px;
            height: 24px;
            background: #C3CFD9;
            border: 1px solid #808F9D;
            box-sizing: border-box;
            border-radius: 12px;   
            margin: 0px 50px 0 50px;     
        }

        .false{
            width: 24px;
            height: 24px;
            background: #C3CFD9;
            border: 1px solid #808F9D;
            box-sizing: border-box;
            border-radius: 12px;        
        }

        .seat{
            
            display: flex;
            flex-direction: column;
        }

        .title-day{
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: start;
            font-weight: 400;
        }

        .baixo{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
         
            color: #4E5A65;
        }   
        
        .tudo{
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            overflow-y: scroll;

        }

        header{
            width: 100vw;
            height: 67px;
            background-color: #C3CFD9;
            text-align: center;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 34px;
            line-height: 70px;
            align-items: center;
            text-align: center;
            color: #E8833A;
            position: fixed;
            top: 0px;
           
        }
        
        h1{
            margin-top: 80px;
            padding: 50px;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 28px;            
            align-items: center;
            text-align: center;
            letter-spacing: 0.04em;
            color: #293845;
            background-color: #FFFFFF;     

        }

        div{  
           display: flex;
           justify-content: center;
           align-items: center;
           flex-wrap: wrap;
           margin: 0 8px 18px 0px;
        }
        
        footer{
            width: 100%;
            height: 120px;
            display: flex;
            justify-content: start;
            align-items: center;
            background-color: #DFE6ED;
            position: fixed;
            bottom: 0px;
        }
        
        .box-footer{
            width: 64px;
            height: 89px;
            background: #FFFFFF;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
        }
        
        img{
            width: 48px;
            height: 72px;
        }

        h2{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 30px;
            display: flex;
            align-items: center;
            color: #293845;
        }
        
        h4{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 30px;
            display: flex;
            align-items: center;
            color: #293845;
            margin-bottom: 23px;   
        }
        
        h3{
            display: flex;
            justify-content: start;
            align-items: space-around;
            margin-bottom: 23px;   
        }

        h5{
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #E8833A;
            margin-right: 10px;
            width: 83px;
            height: 43px;
            background: #E8833A;
            border-radius: 3px;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.02em;
            color: #FFFFFF;
        }
        
        .seats{
            width: 26px;
            height: 26px;      
            background: #C3CFD9;
            border: 1px solid #808F9D;
            box-sizing: border-box;
            border-radius: 12px;                        
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.04em;
            color: #000000;
        }

        .selecionado{
           
            background: #8DD7CF;
            border: 1px solid #1AAE9E;
            
        }
        
        .disponivel{
            
            background: #C3CFD9;
            border: 1px solid #1AAE9E;
          
        }
        
        .false{
   
            background: #FBE192;
            border: 1px solid #1AAE9E;
         
        }

`       
  
