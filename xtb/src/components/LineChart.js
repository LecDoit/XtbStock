import React,{useEffect,useState,useCallback} from 'react';
import {Bar,Line} from 'react-chartjs-2'
import { useStocksContext } from "../hooks/useStocksContext";
import {Chart as ChartJS,
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement,
        Tooltip,
        Legend
} from 'chart.js/auto'

import axios from'axios';



function LineChart({chartData,user,pwd,stock}) {

    


    
    const {stocks,dispatch} = useStocksContext()
    const [buy,setBuy] = useState(0)
    const [sell,setSell] = useState(0)
    const [symbol,setSymbols] = useState('')
    const [buyLine,setBuyLine] = useState('')
    const [sellLine,setSellLine] = useState('')


    useState(()=>{
        if (stock===undefined){
            console.log('sex')
        }else {
            setBuy(Number(stock.buy))
            setSell(Number(stock.sell))
            setSymbols(stock.symbol)
            setBuyLine({beforeDatasetsDraw(chart){
                            const {ctx,scales:{x,y},chartArea:{top,right,bottom,left,width,height}} = chart

                            // success line
                            ctx.strokeStyle = 'green';

                            ctx.strokeRect(left,y.getPixelForValue(stock.buy),width,0)
                            ctx.restore()

                            // success backgroud
                            ctx.fillStyle = 'rgba(0,200,0,0.2'
                            ctx.fillRect(left,y.getPixelForValue(stock.buy),width,y.getPixelForValue(stock.buy)+bottom)
                            ctx.restore()

                            // ctx.lineWidth = 1;
                            // ctx.moveTo(x.getPixelForValue(chartData.labels[0]),y.getPixelForValue(stock.buy));
                            // ctx.lineTo(x.getPixelForValue(chartData.labels[chartData.labels.length-1]),y.getPixelForValue(stock.buy));
                            // ctx.stroke();
                            // ctx.fillText('Buy',x.getPixelForValue(chartData.labels[0]),y.getPixelForValue(stock.buy));

                            // ctx.closePath();
                            // ctx.restore();
                            }   
                        })
            setSellLine({beforeDatasetsDraw(chart){




                
                            const {ctx,scales:{x,y}} = chart
                            ctx.save();
                            ctx.beginPath();
                            ctx.strokeStyle = 'red';
                            ctx.lineWidth = 1;
                            ctx.moveTo(x.getPixelForValue(chartData.labels[0]),y.getPixelForValue(stock.sell));
                            ctx.lineTo(x.getPixelForValue(chartData.labels[chartData.labels.length-1]),y.getPixelForValue(stock.sell));
                            ctx.stroke();
                            ctx.font = '10px Arial';
                            ctx.fillText('Sell',x.getPixelForValue(chartData.labels[0]),y.getPixelForValue(stock.sell));
                            // ctx.closePath();
                            // ctx.restore();
                            }   
                        })
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
        console.log(buy)

    }

    const updateUser = async (e)=>{
        e.preventDefault()

        const filteredArray = stocks.filter((s)=>s._id !== stock._id)

        stock.buy=buy
        stock.sell=sell

        filteredArray.push(stock)

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

    },[stocks])



    return(
        <div>
        {stock ?  <div style={{width:780}}>
            <form>
                <label>Price to Sell</label>
                <input onChange={(e)=>setSell(Number(e.target.value))} value={sell} type="number"></input>
                <label>Price to Buy</label>

                <input onChange={(e)=>setBuy(Number(e.target.value))} value={buy} type="number"></input>
                <button onClick={updateUser}>Set</button>
            </form>
            <button onClick={handleClickDeleteStock}>Delete </button>
            <Line data={chartData}  plugins={
                [buyLine,sellLine]
            }/>

            <button onClick={handleSetPrice}>Print stocks</button>
        </div> 
        
        : <div>no</div>}

        </div>
    )



}

export default LineChart