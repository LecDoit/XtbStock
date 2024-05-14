import React,{useEffect,useState,useCallback} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Register from './components/Register'
import { useStocksContext } from "./hooks/useStocksContext";

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'



function App() {
  const {stocks,dispatch} = useStocksContext()


  

  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
