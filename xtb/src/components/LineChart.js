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
    console.log(stock)
    

    const {stocks,dispatch} = useStocksContext()

    const [buy,setBuy] = useState(0)
    const [sell,setSell] = useState(0)
    const [period,setPeriod] = useState(0)
    const [ticks,setTicks] = useState(0)

    const [symbol,setSymbols] = useState('')
    const [buyLine,setBuyLine] = useState('')
    const [sellLine,setSellLine] = useState('')
    const [showDetails,setShowDetails] = useState(false)


    useState(()=>{
        if (stock===undefined){

        }else {
            setBuy(Number(stock.buy))
            setSell(Number(stock.sell))
            setSymbols(stock.symbol)
            setPeriod(stock.period)
            setTicks(stock.ticks)
            if (stock.buy===0){
            } else {
            setBuyLine({beforeDatasetsDraw(chart){
                            const {ctx,scales:{x,y},chartArea:{top,right,bottom,left,width,height}} = chart
                            ctx.save();

                            // success line
                            ctx.strokeStyle = 'green';

                            ctx.strokeRect(left,y.getPixelForValue(stock.buy),width,0)
                            ctx.restore()

                            // success backgroud
                            ctx.fillStyle = 'rgba(0,200,0,0.2'
                            ctx.fillRect(left,bottom,width,y.getPixelForValue(stock.buy)-bottom)
                            ctx.restore()

                            // success text
                            ctx.font = '12px Arial'
                            ctx.fillStyle = ('green')
                            ctx.fillText('Buy', width,y.getPixelForValue(stock.buy))


        
                            }   
                        })
                    }
            if (stock.sell===0){

            } else{
            setSellLine({beforeDatasetsDraw(chart){
                            const {ctx,scales:{x,y},chartArea:{top,right,bottom,left,width,height}} = chart
                            ctx.save();

                            //success line
                            ctx.strokeStyle = 'red';
                            ctx.strokeRect(left,y.getPixelForValue(stock.sell),width,0)
                            ctx.restore()


                            // success backgroud

                            ctx.fillStyle = 'rgba(255,0,0,0.2'
                            ctx.fillRect(left,top,width,y.getPixelForValue(stock.sell)-top)
                            ctx.restore()

                            // success text
                            ctx.font = '12px Arial'
                            ctx.fillStyle = ('red')
                            ctx.fillText('Sell', width,y.getPixelForValue(stock.sell))

          
                            }   
                        })
            }
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
        stock.period=period
        stock.ticks=ticks

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

    const getDetails = () =>{

        setShowDetails(value=>!value)
     
    }

    return(
        <div>
        {stock ?  <div style={{width:300}}>

            <button onClick={handleClickDeleteStock}>Delete</button>
            <Line data={chartData}  plugins={
                [buyLine,sellLine]
            }/>


            <button onClick={handleSetPrice}>Print stocks</button>
            <button onClick={getDetails}>Get Details</button>

            <div>{showDetails ? <div>
                
                <form>
                    <div>Set Price</div>
                    <label>Price to Sell</label>
                    <input onChange={(e)=>setSell(Number(e.target.value))} value={sell} type="number"></input>
                    <label>Price to Buy</label>

                    <input onChange={(e)=>setBuy(Number(e.target.value))} value={buy} type="number"></input>
                    <button onClick={updateUser}>Set</button>
                </form>

                <form>
                    <div>Period</div>
                    <select value={period} onChange={e=>setPeriod(e.target.value)}>
                        <option value="1">1 Minute</option>
                        <option value="5">5 Minutes</option>
                        <option value="15">15 Minutes</option>
                        <option value="30">30 Minutes</option>
                        <option value="60">60 minutes (1hour)</option>
                        <option value="240">240 minutes (4 hours)</option>
                        <option value="1440">1440 minutes (1 day)</option>
                        <option value="10080">10080 minutes (1 week)</option>
                        <option value="43200" >43200 minutes (30 days)</option>
                    </select>
                </form>

                <form>
                    <label>Ticks</label>
                    <input type="number" value={ticks} onChange={(e)=>{setTicks(Number(e.target.value))}}></input>
                    <button onClick={updateUser}>update ticks</button>
                </form>

                <form>
                    <label>Range</label>
                    <select onClick={(e)=>console.log(e.target)}>
                        <option value="All">All</option>
                        <option value="1Y">1Y</option>
                        <option value="1M">1M</option>
                        <option value="7D">7D</option>
                        <option value="1D">1D</option>
                    </select>
                </form>



            </div> :<div></div>}
            </div>
        </div> 
        
        : <div>no</div>}

        </div>
    )



}

export default LineChart