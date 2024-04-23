import axios from'axios';
import { useStocksContext } from "../hooks/useStocksContext";





const StockDetails = ({stock,user})=>{

    const {stocks,dispatch} = useStocksContext()


    const handleClick = async (e) =>{


        const filteredArray = stocks.filter((s)=>s._id !== stock._id)
        const currObj = {user:user,stocks:filteredArray}

        e.preventDefault();
        axios.patch('https://xtbbackend.onrender.com/deleteStock',
        
        currObj
        )
            .then((response)=>{
                console.log(response.data)
      
                dispatch({type:'DELETE_STOCK',payload:response.data.stocks}) 


            })
        


    }



    return(
        <div>
            <h4>{stock.symbol}</h4>
            <p>{stock.buy}</p>
            <p>{stock.sell}</p>
            <span onClick={handleClick}>Delete</span>
        </div>

    )
}

export default StockDetails