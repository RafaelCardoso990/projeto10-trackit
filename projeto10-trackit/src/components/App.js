import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState} from "react"
import MainPage from "./MainPage";
import Register from "./Register";
import Today from "./Today"
import Habits from "./Habits";
import Historic from "./Historic";

import UserContext from "../contexts/context";

function App(){
  const [data, setData] = useState({});
  const [todayHabits, setTodayHabits] = useState([]);
  const [refreshs,setRefreshs] = useState(false)
  const [total, setTotal] = useState(0)

  return(
     <UserContext.Provider value={{data, setData, todayHabits, setTodayHabits, refreshs, setRefreshs, total, setTotal}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/cadastro" element={<Register />}/>
            <Route path="/hoje" element={<Today/>}/>
            <Route path="/historico" element={<Historic/>}/>
            <Route path="/habitos" element={<Habits/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>  
  )
}

export default App;