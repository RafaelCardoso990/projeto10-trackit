import styled from 'styled-components'
import axios from 'axios';
import { useContext,useEffect, useState } from 'react';

import UserContext from '../contexts/context';
import Header from "../components/layout/Header"
import Footer from './layout/Footer'

import DayJS from 'react-dayjs';



function Today(){
        const {data} = useContext(UserContext);
        const context = useContext(UserContext)
        
        const [percent, setPercent] = useState(0)
        const [completedHabits, setCompletedHabits] = useState([])
        const [todayHabits, setTodayHabits] = useState([]);             
        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`,                    
            },
        }    
      
        let percentage = (100/todayHabits.length)
        useEffect(() => {
                     
            console.log(config)
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
            
            promise.then(response => {
                setTodayHabits(response.data)
                context.setTodayHabits(response.data)  
                console.log(response.data)   
                let cont = 0
                {response.data.map((item) => item.done ? cont++ :<></>)}
                context.setTotal(cont) 
                console.log(cont) 
            })

            promise.catch(err => console.log(err.response.data))

        },[])
        
        function Mark(id){
            if(completedHabits.includes(id)){
                const index = completedHabits.indexOf(id);
                if (index > -1) {
                    completedHabits.splice(index, 1);
                    console.log(completedHabits, "tirou")
                    Delete(id)
                }
            }else{
                setCompletedHabits([...completedHabits, id]);
                console.log(completedHabits, "foi")
                Post(id)
            }
        }

        function Post(id){
           
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`

            const promise = axios.post(URL, completedHabits, config)
            promise.then(response => {
                const {data} = response
                console.log("foi")
                
            })
            promise.catch(err => err.response.data)
        }
        
        function Delete(id){    
            console.log(id)
            const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, config)
            promisse.then(response => {
                alert("apagou!")
                refresh();   
            })
            promisse.catch(err => console.log(err.response.data) )            
        }

        function refresh(){            
            console.log(config)
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
            
            promise.then(response => {
                setTodayHabits(response.data)        
                console.log(response.data)                       
            })

            promise.catch(err => console.log(err.response.data))      
       }

        return(
        <>
            <Header/>
            <Main>
                    <h1><DayJS format="dddd"/>, <DayJS format="DD"/>/<DayJS format="MM"/></h1>
                    {todayHabits.length !== 0 ? <p className='percentage'>{percentage}% dos hábitos concluídos</p> : <p>Nenhum habito concluido ainda</p>}            
                    
                    
                    {todayHabits.map((data) => {
                        const {id,name, currentSequence, done,highestSequence} = data
                         return(                          
                            <span onClick={() => {Mark(id)
                                                  
                            }}>
                                <h2>{name}</h2>                                
                                <div><p>Sequência atual: <p  className={`sequence ${done}`}>{currentSequence} dias</p></p></div>
                                <div><p>Seu recorde: <p className={`highest ${currentSequence === highestSequence && highestSequence !== 0 ? true : false}`}>{highestSequence} dias</p></p></div>                                
                                <ion-icon name="checkbox" class={`check ${done} md hydrated`} onClick={() =>Delete}></ion-icon>
                                
                            </span>                           
                         )
                    })}                    
                                                    
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
    
    div > p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        margin-left: 5px;
        color: #666666;
        white-space: nowrap;
    }

    .sequence{
        color: #666666;
    }
   
    .highest{
        color: #666666;
    }

    .true{
        color: #8FC549;
    }

    .false{
        color: #666666;
    }

    .percentage{
        color: #8FC549;
    }
    div{
        display:flex;
        flex-direction: row;
    }

    span{
        width: 340px;
        height: 94px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-top: 30px;
        position: relative;        
    }

    .check{
        font-size: 80px;
        fill: #8FC549;
        border: none;
        position: absolute;
        top: 7px;
        right: 0px;        
    }

    .false{
        fill: #c9c9c9;
          
    }

    
    span > h2 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        margin-top:10px;
        margin-left: 5px;
    }

  

    > h1{ 
        align-self: flex-start;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
        margin-left: 10px;
    }
    
    > p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
        align-self: flex-start;
        margin-left: 10px;
    }
`
export default Today;
