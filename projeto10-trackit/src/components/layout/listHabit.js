import React from "react";
import styled from "styled-components"
import {useState, useContext} from 'react'
import axios from "axios";
import days from "./Days";
import UserContext from "../../contexts/context";


function ListHabits(){

    const context = useContext(UserContext)
    
    const [habitToday, setHabitToday] = useState("")
    const [refreshs,setRefreshs] = useState(false)
    const {data} = useContext(UserContext);
    const [able, setAble] = useState(false)
    const [createHabit, setCreateHabit] = useState(true)
    const [newHabits, setNewHabits] = useState({name: "", days: []})
    const [color, setColor] = useState(false)
    const [index,setIndex] = useState([])

    console.log(refreshs)
    function listDays(day){
        
        if(newHabits.days.includes(day)){
            const index = newHabits.days.indexOf(day);
            if (index > -1) {
            newHabits.days.splice(index, 1);
            }
            setColor(false)
        }else{
            setNewHabits({...newHabits, days:[...newHabits.days, day]})
            setColor(true)
        }
    }
  

    function save(){
        
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

        const config = {
            headers: {
                Authorization : `Bearer ${data.token}`
            }
        }

        const promise = axios.post(URL, newHabits, config)
        promise.then(response =>{   
            const {data} = response
            
            setCreateHabit(!createHabit) 
            alert('Hábito criado!')
          
        })
        promise.catch(err => {err.response.data.details === '"name" is not allowed to be empty' ? alert("Preencha o campo nome do hábito") : alert('Escolha os dias')})
        setAble(false)
        
    }
    
    


    return(
        <>
            <ion-icon class="add" name="add-sharp" onClick={()=> setCreateHabit(!createHabit)}></ion-icon>  
            {createHabit ?   <Habit>
                <input type="text" placeholder='nome do hábito' value={newHabits.name} onChange={(e) => setNewHabits({...newHabits, name:e.target.value})}></input>
                <nav className="week">                  
                    {days.map((day, id) => <p disabled={able} className={`color ${index.includes(id) ? true : <></>}`} onClick={() => { 
                        index.includes(id) ? setIndex(index.filter(index => index !== id)) : setIndex([...index, id])}}>{day}</p>)}
                </nav>
                <nav className="buttons">
                    <p onClick={() => {setCreateHabit(!createHabit)}}>Cancelar</p>
                    <button onClick={() => {context.setRefreshs(true)
                                            setHabitToday("refresh")
                                            save()
                                            setAble(true)
                                            setNewHabits({name: "", days: []})
                    }}>Salvar</button>
                </nav>
            </Habit> : null}
        </>
    )
}


const Habit = styled.div`
    width: 340px;
    height: 180px;  
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    
  

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
    
    .color{
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
        margin-left: 4px;
        align-self: flex-start;
    }

    .true{
        background-color: #CFCFCF;
    }  
       
    `
export default ListHabits;