import styled from "styled-components"

import Header from "./layout/Header";
import Footer from "./layout/Footer";

function Historic(){
    return(
        <>
            <Header/>
            <Main>
                    <h1>Histórico</h1>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>     
            <Footer/>                
            </Main>
        </>       
    )
}

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;

    > h1{ 
        align-self: flex-start;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
        margin-left: 25px;
        margin-top: 20px;
    }

    > p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        align-self: flex-start;
        margin-left: 20px;
        margin-top: 10px;
    }
    

`
export default Historic;