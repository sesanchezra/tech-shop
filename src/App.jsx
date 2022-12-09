import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import Home from './components/Home/Home'
import ProductDetail from './components/Home/Product Details/ProductDetail'
import SignUp from './components/SignUp/SignUp'
import Orders from './components/Home/Orders/Orders'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/' element={<Home />}/>
        <Route element={<ProtectedRoutes />}>
          
          <Route path='/productdetail/:id' element={<ProductDetail/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
