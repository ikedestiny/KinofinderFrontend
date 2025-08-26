import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Preferences from "./pages/Preferences"
import './App.css'


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/preferences' element={<Preferences/>}/> 
   </Routes>
   </BrowserRouter>
  )
}

export default App
