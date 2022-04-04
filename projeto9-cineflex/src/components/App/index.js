import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../Main/MainPage";
import Movie from "../Movie";
import Seats from "../Seats";
import Sucess from "../Sucess";

export default function App(){
   
     return(
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/sessoes/:idFilme" element={<Movie/>}/>
                    <Route path="/assentos/:idSessao" element={<Seats/>}/>
                    <Route path="/sucesso" element={<Sucess/>}/>
               </Routes>
          </BrowserRouter>
     )
}