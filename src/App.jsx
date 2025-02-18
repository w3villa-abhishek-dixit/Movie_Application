import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Page from './Components/Page'
import Latest from './Components/Latest'
import './App.css'

const App=()=>{
  const url="http://www.omdbapi.com/?i=tt3896198&apikey=d909114f"
  return(
    <BrowserRouter>
       <Navbar/>
       <Latest/>
         <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/page/:id' element={<Page/>}></Route>
          </Routes>    
    </BrowserRouter>
  )
}

export default App
