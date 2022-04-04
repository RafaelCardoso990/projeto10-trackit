import {useState, useContext, useEffect} from 'react'
import styled from "styled-components"
import axios from 'axios';

import ListHabits from './layout/listHabit';

import UserContext from '../contexts/context';

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import reactDom from 'react-dom';

function Habits(){

    
    const {data, habitToday,refreshs} = useContext(UserContext);
    
    const [listHabit, setListHabit] = useState([])
    const [habits, setHabits] = useState([])
    const [total, setTotal] = useState(0)

    const context = useContext(UserContext)
   
    

    const config = {
        headers: {
            Authorization : `Bearer ${data.token}`
        }
    }

    function Delete(habit){    
        
       
        const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, config)
        promisse.then(response => {
            alert("apagou!")
            refresh();           
        })
        
    }

    
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
    
    useEffect(()=>{
        
       
        
        const promise = axios.get(URL, config)
        promise.then(response =>{
            const {data} = response;   
            setListHabit(data)           
        })
        promise.catch(err => console.log(err.response.data)) 
    

    },[])

   function refresh(){
        console.log('chamou')
        const promise = axios.get(URL, config)
        promise.then(response =>{
            const {data} = response;  
            setListHabit(data)           
       })
        promise.catch(err => console.log(err.response.data))    
   }

   if(refreshs === true){
    refresh()
    }
  
    return(
        <>
            <Header/>
            <Main>           
                <h1>Meus hábitos</h1>
                <ion-icon class="add" name="add-sharp" onClick={()=> {setHabits([...habits,[<ListHabits/>]])}}></ion-icon>     
                {habits}
                {listHabit.length === 0 ? <h2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2> : <></>}
                    {listHabit.map((habit) =>{
                        const {name,id, days} = habit
                        return (
                        <Habit key={id}>
                            <p>{name}</p>
                            <nav className="week">
                                <p value={0} className={`p`}>D</p>
                                <p value={1} className={`p`}>S</p> 
                                <p value={2} className={`p`}>T</p> 
                                <p value={3} className={`p`}>Q</p> 
                                <p value={4} className={`p`}>Q</p> 
                                <p value={5} className={`p`}>S</p> 
                                <p value={6} className={`p`}>S</p>         
                            <nav className="buttons">
                                <ion-icon class="trash" name="trash-outline" onClick={() => {
                                    const answuer = window.confirm("Você deseja apagar este habito ?")
                                    {answuer === true ? Delete(habit): <></>}
                                }}></ion-icon>
                            </nav>
                            </nav>
                        </Habit>)
                    })}      
             <Footer/>
            </Main>
        </>
    )
}

const Habit = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 20px;
    position: relative;
     
    .trash{        
        width: 18px;
        height: 20px;
        background: #ffffff;
        border-radius: 4.63636px;
        font-size: 30px;
        fill: #ffffff;
        border: none;
        position: absolute;
        top: 10px;
        left: 310px;      
    }

    > p {
        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        margin-top: 20px;
        margin-left: 10px;       
    }
    
    button{
        width: 84px;
        height: 35px;   
        background: #52B6FF;
        border-radius: 5px;
        border:none;        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;    
        text-align: center;
        color: #FFFFFF;
        margin-left: 23px;
    }

    input{
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;      
        color: #DBDBDB;
        margin-top: 20px;
    }

    .buttons > p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;        
        text-align: center;
        color: #52B6FF;
    }

    .buttons{
        display: flex;
        margin-left: 125px;
        align-items: center;
    }

    .week{
        display: flex;
        margin-right: 73px;
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .p{
        width: 30px;
        height: 30px;
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        text-align: center;
        margin-left: 10px;
        align-self: flex-start;
    }
`
const Main = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
    
    footer{
        position: fixed;
    }
    span{
        width: 340px;
        height: 94px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-top: 30px;
        position: relative;        
    }

    .add{
        width: 40px;
        height: 35px;
        left: 325px;      
        background: #52B6FF;
        border-radius: 4.63636px;
        font-size: 30px;
        fill: #ffffff;
        border: none;
        position: absolute;
        top: 90px;
    }

    h2 {
        width: 338px;
        height: 74px;      
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        margin-top: 30px;
        color: #666666;
    }

    span > p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        margin-left: 5px;
        color: #666666;
    }

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
        color: #BABABA;
        align-self: flex-start;
        margin-left: 10px;
    }
`

export default Habits;