import  React ,{ useRef,useState,useEffect,useCallback } from "react";
import axios from'axios';


import useWebSocket, { ReadyState } from 'react-use-websocket';
import WebSocket from '../components/WebSocket'


import { useStocksContext } from "../hooks/useStocksContext";
import StockDetails from '../components/Stock'




const Register = () => {

    const {stocks,dispatch} = useStocksContext()
  

    const userRef = useRef();

    const [user,setUser] = useState('15708108');

    const [pwd,setPwd] = useState('Raggajungle120!');

    const [loaded,setLoaded] = useState(false)





    const createPost= async (e)=>{
        e.preventDefault();

        // Mongo DB call 
        const response = await axios.post('https://xtbbackend.onrender.com/getUser',
        {
   
            user:user,
            password:pwd

        })
        .then((response)=>{
            const json = response.data.stocks
            console.log(response.data.stocks)
            dispatch({type:"SET_STOCKS",payload:json})
            setLoaded(true)


        })



    }


    
    useEffect(()=>{


    },[stocks])



  return (
    <div>  
      
        <h1>Register</h1>
        <form >
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" ref={userRef} onChange={(e)=>setUser(e.target.value)} autoComplete='off' value={user}></input>


            <label htmlFor="password">Password:</label>
            <input type="password" id="password"  onChange={(e)=>setPwd(e.target.value)}  required value={pwd}></input>
  
            <button onClick={createPost} >Sign up</button>

        </form>
        <div>

        </div>
        <div>

                { loaded ? <WebSocket user={user} pwd = {pwd}/> :<div></div>}


        </div>
    </div>
  )
}

export default Register