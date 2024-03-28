import React,{useEffect,useState,useCallback} from 'react';
import {Bar,Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import {Chart as ChartJS} from 'chart.js/auto'

import axios from'axios';


function LineChart({chartData,user,pwd,stock}) {

    


    
    const {stocks,dispatch} = useStocksContext()
    const [buy,setBuy] = useState(0)
    const [sell,setSell] = useState(0)
    const [symbol,setSymbols] = useState('')


    useState(()=>{
        if (stock===undefined){
            console.log('sex')
        }else {
            setBuy(Number(stock.buy))
            setSell(Number(stock.sell))
            setSymbols(stock.symbol)
        }
    },[stock,stocks])



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
        // let splicedArray = stocks.find((s)=>s._id===stock._id).buy

        // let filteredArrayBuy = stocks.filter((s)=>s._id == stock._id)[0].buy
        const filteredArray = stocks.filter((s)=>s._id !== stock._id)
        // filteredArrayBuy = buy
        // const currObj = {user:user,stocks:filteredArray}

        stock.buy=buy
        stock.sell=sell
        console.log(filteredArray)
        filteredArray.push(stock)
        console.log(filteredArray)


        // console.log( {"user":user,"stocks":[{"symbol": symbol, "buy": buy, "sell": sell}]})

        axios.patch('/updateUserSellNBuy',
        
        
        {"user":user,"stocks":filteredArray}

        )
            .then((response)=>{
                console.log(response.data)
                const json = response.data.stocks
                dispatch({type:`DELETE_STOCK`,payload:json})
             

            })

               
    }

    useEffect(()=>{
        // console.log(stocks)
    },[stocks])



    return(
        <div>
        {stock ?  <div style={{width:300}}>
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
        
        : <div>no</div>}

        </div>
    )



}

export default LineChart