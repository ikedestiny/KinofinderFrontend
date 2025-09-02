import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Preferences from "./pages/Preferences"
import './App.css'
import SearchResult from "./pages/SearchResult"


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/preferences' element={<Preferences/>}/> 
    <Route path="/search" element={<SearchResult/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
