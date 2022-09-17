import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import Home from './components/Home/Home'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
