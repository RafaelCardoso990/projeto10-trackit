import react from "react"
import styled from "styled-components"
import { useContext } from "react"
import logo from "../../assets/image/TrackIt.png"
import user from "../../assets/image/user.jpg"

import UserContext from "../../contexts/context"

export default function Header(){
    const {data, todayHabits} = useContext(UserContext);
    return(
        <Headers>
            <img className="logo" src={logo}></img>
            <img className="user" src={data.image}></img>
        </Headers>
    )
}

const Headers = styled.header`
    width: 100vw;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    justify-content: center;
    position: fixed;
    top: 0px;
    z-index: 2;
    
    .logo{
        width: 97px;
        height: 29px;    
        color: #FFFFFF;
        margin-left: 30px;
        margin-right: 30px;
    }

    .user{
        width: 51px;
        height: 51px;       
        border-radius: 98.5px;
        display: flex;
        margin-right: 20px;
     }
`