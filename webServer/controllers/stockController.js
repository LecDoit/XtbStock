const Stock = require('../stockModel')
const Users = require('../userModel')

// get credentials
const getCredentials = async(req,res)=>{
    const credentials = 
        {user:16313473,
        password:'Xtbxtbxtb123'
        }
    res.status(200).json(credentials)
}

//get all users

const getAllUsers = async(req,res)=>{
    

    const users = await Stock.find({})
    res.status(200).json(users)
}

const resetUser = async (req,res)=>{

    const user=  req.body.user


    

    const userSearch = await Stock.find({username:user})
    console.log(Users)
    if (userSearch.length===0) {
        return res.status(405).json({error: 'no such user'})
    }
    const userRequest = await Stock.findOneAndUpdate({username:user},{ 

        ...req.body
            
    })

    const userRequestRefreshed = await Stock.find({username:user})

    res.status(200).json(userRequestRefreshed)

}


// Enpoints used on Web
const getUser = async (req,res)=>{

    const {email}=   (req.body)

    if (!email){
        return res.status(404).json({error:'wrong input'})
    }

    const userRequest = await Stock.find({email:email})


    if (userRequest.length===0) {
        return res.status(405).json({error: 'no such user'})
    }

    res.status(200).json(userRequest[0])
}

const addStock = async (req,res)=>{

    const email=  req.body.email
    const symbol = req.body.stocks[0].symbol

    const userExist = await Stock.find({email:email})
    if (userExist.length===0) {
        return res.status(405).json({error: 'no such user or wrong input'})
    } else{
        const user_id = req.user._id
        console.log(user_id)

        const userStocks =  userExist[0].stocks

        for (let a = 0;a<userStocks.length;a++){
            if (userStocks[a].symbol===symbol){
                return res.status(406).json({error: 'Stock already added'})
            } 
        }

        const userRequest = await Stock.findOneAndUpdate({email:email},{
            $push:{stocks:req.body.stocks[0]}
        })

    }
    
    const userRequestRefreshed = await Stock.find({email:email})

    console.log(`Adding a Stock to '${email}`)
    res.status(200).json(userRequestRefreshed[0])
}

const updateUserSellNBuy = async (req,res)=>{

    const email=  req.body.email


    const userExist = await Stock.find({email:email})
    if (userExist.length===0) {
        return res.status(405).json({error: 'no such user or wrong input'})
    } 

    const userRequest = await Stock.findOneAndUpdate({email:email},{ 
        ...req.body
    })

    const userRequestRefreshed = await Stock.find({email:email})
    console.log(`Updating Sell and Buy for '${email}`)
    res.status(200).json(userRequestRefreshed[0])
    
}

const deleteStock = async (req,res)=>{

    const email =  req.body.email

    const userExist = await Stock.find({email:email})
    if (userExist.length===0) {
        return res.status(405).json({error: 'no such user or wrong input'})
    }
    const userRequest = await Stock.findOneAndUpdate({email:email},{ 
        ...req.body  
        
    })

    const userRequestRefreshed = await Stock.find({email:email})
    console.log(`Deleting stock for '${email}`)
    res.status(200).json(userRequestRefreshed[0])
}


module.exports = {
    getUser,
    getAllUsers,
    addStock,
    resetUser,
    deleteStock,
    updateUserSellNBuy,
    getCredentials

}

