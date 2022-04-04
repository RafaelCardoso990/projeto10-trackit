import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import axios from "axios"

import logo from "../assets/image/Group 8.png"
import UserContext from "../contexts/context"


function MainPage(){

    const context = useContext(UserContext)

    const [able, setAble] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    
    const handleFormChange= (e) => {
        setData({...data,[e.target.name]: e.target.value});
        
    }
    const navigate = useNavigate();
    
    function enter(){
        setAble(true)
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
        const promise = axios.post(URL, {
            email: data.email,
            password: data.password
        })
        promise.then(response =>{
            const {data} = response;
            context.setData(data)
            navigate("/hoje")            
        })
        promise.catch(err => alert("Preencha os campos corretamente."))  
        
        setAble(false)          
    }  
    return(
        <Main>
            <img src={logo}/>
            <input disabled={able} placeholder="email" name="email" value={data.email} onChange={handleFormChange}/>
            <input disabled={able} type="password" placeholder="senha" name="password" value={data.password} onChange={handleFormChange}/>
            <button disabled={able} onClick={enter}>Entrar</button>
            <Link to="/cadastro"><h1>Não tem uma conta ? Cadastre-se!</h1></Link> 
        </Main>
    )
}


const Main = styled.main`
    margin-top: 70px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    

    img{
        width: 180px;
        height: 178.38px;
        margin-bottom: 35px;
    }

    input{
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        margin-bottom: 6px
    }

    button{
        width: 303px;
        height: 45px;      
        background: #52B6FF;
        border-radius: 5px;
        border: none;
        color: #FFFFFF;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        margin-bottom: 5px;
    }

    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`

export default MainPage;