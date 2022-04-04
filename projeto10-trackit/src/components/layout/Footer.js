import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from "react"
import UserContext from "../../contexts/context"
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Footer(){
    const {data,todayHabits,total} = useContext(UserContext);
    

    console.log(total)
    let percentage = (total/todayHabits.length)*100          
       
    return(
        <Footers>
           <Link to="/habitos"><h1>Habitos</h1></Link>
           <Link to="/hoje"><Circulo
                        value={percentage}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
            /></Link>
            <Link to="/historico"><h1>Histórico</h1></Link>
        </Footers>
    )
}
const Circulo = styled(CircularProgressbar)`
    width: 91px;
    position: absolute;
    bottom: 10px;
    left: 38vw;
    overflow-y: visible;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;

    color: #FFFFFF;
`
const Footers = styled.footer`
    width: 100vw;
    height: 80px;  
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content:space-evenly;
    align-items:center;
    z-index: 1;
    
    
    img{
        left: 150px;
        position: absolute;
        bottom: 30px;
    }

    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
        margin-right: 50px;
        margin-left: 50px;
    }
`
export default Footer;