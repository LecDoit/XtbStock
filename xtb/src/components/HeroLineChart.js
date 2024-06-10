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
import { useAuthContext } from '../hooks/useAuthContext';
import {faker} from '@faker-js/faker';




function HeroLineChart({chartData,userProps,pwd,stock}) {


   const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: false,

      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [

      {
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };





    const {stocks,dispatch} = useStocksContext()
    const {user} = useAuthContext()

    const [buy,setBuy] = useState(0)
    const [sell,setSell] = useState(0)
    const [period,setPeriod] = useState(0)
    const [ticks,setTicks] = useState(0)

    const [symbol,setSymbols] = useState('')
    const [buyLine,setBuyLine] = useState('')
    const [sellLine,setSellLine] = useState('')
    const [showDetails,setShowDetails] = useState(false)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [lastYear, setLastYear] = useState('')
    const [last5Year, setLast5Year] = useState('')
    const [last10Year, setLast10Year] = useState('')
    const [lastMonth, setLastMonth] = useState('')

    // const startDate = new Date('January 1, 2022').getTime()



    useState(()=>{
        if (stock===undefined){

        }else {
            setBuy(Number(stock.buy))
            setSell(Number(stock.sell))
            setSymbols(stock.symbol)
            setPeriod(stock.period)
            setTicks(stock.ticks)
            setStartDate(stock.start)
            setEndDate(new Date().getTime())
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
        const currObj = {email:user.email,stocks:filteredArray}


        e.preventDefault();
        axios.patch('https://xtbbackend.onrender.com/stocks/deleteStock',
        // axios.patch('http://localhost:10000/stocks/deleteStock',
        
        currObj,
        {
            headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
            }
          }
        )
            .then((response)=>{
                // console.log(response.data)
                const json = response.data.stocks
                dispatch({type:'DELETE_STOCK',payload:json}) 
           

            })
            

        


    }


    useEffect(()=>{

        const endDateYear = new Date(endDate).getFullYear()
        const endDateMonth = new Date(endDate).getMonth()+1
        const endDateDay = new Date(endDate).getDay()

        setLastYear(new Date(`${endDateYear-1}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
        setLast5Year(new Date(`${endDateYear-5}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
        setLast10Year(new Date(`${endDateYear-10}`+  `,${endDateMonth}` + `,${endDateDay}`).getTime())
        setLastMonth(new Date(`${endDateYear}`+  `,${endDateMonth-1}` + `,${endDateDay}`).getTime())


    },[endDate])
    




    return(
        <div>
<div style={{width:300}}>

            <Line data={data} options={options} />




            </div>



        </div>
    )



}

export default HeroLineChart