import React, { useEffect, useState } from 'react'

import axios from'axios';
import { useStocksContext } from "../hooks/useStocksContext";
import { isCompositeComponent } from 'react-dom/test-utils';

const StockSearch = ({symbols,user,pwd}) => {

    

    const [inputValue,setInputValue] = useState('');
    const [chosenSymbol,setChosenSymbol] = useState('')
    const [suggestions,setSuggestions] = useState([]);
    const {stocks,dispatch} = useStocksContext()



    const updateUser = async (e)=>{

        axios.patch('/updateUser',
        
        //CREATE ADDITIONAL ENDPOINT TO ADJUST BUY AND SELL VALUES
        {"user":user,"stocks":[{"symbol": e.symbol, "buy": 0, "sell": 0}]}

        )
            .then((response)=>{
                console.log(response.data)
                const json = response.data.stocks
                dispatch({type:`CREATE_STOCK`,payload:json})
             

            })
            setChosenSymbol('')
            setInputValue('')
               
    }

    const onChange = (e)=>{
        const inputValue = e.target.value.toLowerCase()
        setInputValue(e.target.value)

    }

    const onSearch = (searchTerm)=>{
        setInputValue(searchTerm.description)
        setChosenSymbol(searchTerm)

    }



    

  return (
    <div>
        
        <div>
            <input type="text" value={inputValue} onChange={onChange} >
            </input>
            <button onClick={()=>updateUser(chosenSymbol)}>Click me</button>
        </div>
        <div>
            {symbols.filter(item=>{
                const searchTerm = inputValue.toLowerCase()
                const fullDesc = item.description.toLowerCase()
                const fullSymbol = item.symbol.toLowerCase()
                return searchTerm &&  fullDesc.includes(searchTerm) && fullDesc !=searchTerm ||searchTerm &&  fullSymbol.includes(searchTerm) && fullSymbol !=searchTerm
            }).map((item,i)=>
            <div onClick={()=>onSearch(item)} key={i}>{item.description} </div>
            
        )
            }
        </div>
    </div>
  )
}

export default StockSearch