import { useState, useEffect } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

import logo from "../assets/image/Group 8.png"

function Register(){

    const [able, setAble] = useState(false)
    const [dataRegister, setdataRegister] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    })
    
    const handleFormChange= (e) => {
        setdataRegister({...dataRegister,[e.target.name]: e.target.value})
    }
    console.log(dataRegister)
    const navigate = useNavigate();
    
    function register(){
        setAble(true)
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        const promise = axios.post(URL, {
            email: dataRegister.email,
            name: dataRegister.name,
            image: dataRegister.image,
            password: dataRegister.password
        })
        promise.then(response =>{
            const {data} = response;
            console.log(data)
            navigate("/")
        })
        promise.catch(err => console.log(err.response.data))
        alert("Preencha os campos corretamente.")
        setAble(false) 
    }
    return(
        <Main>
            <img src={logo}/>
            <input disabled={able} type="text" placeholder="email" name="email" value={dataRegister.email} onChange={handleFormChange}/>
            <input disabled={able} type="password" placeholder="senha"name="password" value={dataRegister.password} onChange={handleFormChange}/>
            <input disabled={able} type="text" placeholder="nome" name="name" value={dataRegister.name} onChange={handleFormChange}/>
            <input disabled={able} type="text" placeholder="foto" name="image" value={dataRegister.image} onChange={handleFormChange}/>

            <button onClick={register}>Cadastrar</button>
            <Link to="/"><h1>Ja tem uma conta? Faça login!</h1></Link> 
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
        text-decoration-color: #DBDBDB;
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
export default Register;