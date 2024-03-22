import React,{useEffect,useState,useCallback} from 'react';
import './App.css';
import Register from './components/Register'


import useWebSocket, { ReadyState } from 'react-use-websocket';
import axios from 'axios';
import { useStocksContext } from "./hooks/useStocksContext";





function App() {
  const {stocks,dispatch} = useStocksContext()


  

  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
