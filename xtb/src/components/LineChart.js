import React,{useEffect,useState,useCallback} from 'react';
import {Bar,Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import {Chart as ChartJS} from 'chart.js/auto'

import axios from'axios';


function LineChart({chartData,user,pwd,stock}) {

    
    // console.log(stock)

    
    const {stocks,dispatch} = useStocksContext()
    const [buy,setBuy] = useState(Number(stock.buy))
    const [sell,setSell] = useState(Number(stock.sell))
    const [symbol,setSymbols] = useState(stock.symbol)






    const handleClickDeleteStock = async (e) =>{
 

        const filteredArray = stocks.filter((s)=>s._id !== stock._id)
        const currObj = {user:user,stocks:filteredArray}

        e.preventDefault();
        axios.patch('/deleteStock',
        
        currObj
        )
            .then((response)=>{
                console.log(response.data)
                const json = response.data.stocks
     
                dispatch({type:'DELETE_STOCK',payload:json}) 
           

            })
            

        


    }

    const handleSetPrice = (e)=>{
        e.preventDefault()
        console.log(stock)

    }

    const updateUser = async (e)=>{
        e.preventDefault()

        console.log(stock)
        stock.buy=buy
        stock.sell=sell
        console.log(stock)

        // console.log( {"user":user,"stocks":[{"symbol": symbol, "buy": buy, "sell": sell}]})

        // axios.patch('/updateUser',
        
        
        // {"user":user,"stocks":[{"symbol": symbol, "buy": buy, "sell": sell}]}

        // )
        //     .then((response)=>{
        //         console.log(response.data)
        //         const json = response.data.stocks
        //         dispatch({type:`CREATE_STOCK`,payload:json})
             

        //     })
            // setChosenSymbol('')
            // setInputValue('')
               
    }

    useEffect(()=>{
        // console.log(stocks)
    },[stocks])



    return(
        <div style={{width:700}}>
            <form>
                <label>Price to Sell</label>
                <input onChange={(e)=>setSell(Number(e.target.value))} value={sell} type="number"></input>
                <label>Price to Buy</label>

                <input onChange={(e)=>setBuy(Number(e.target.value))} value={buy} type="number"></input>
                <button onClick={updateUser}>Set</button>
            </form>
            <button onClick={handleClickDeleteStock}>Delete </button>
            <Line data={chartData} />

            <button onClick={handleSetPrice}>Print stocks</button>
        </div>
    )



}

export default LineChart