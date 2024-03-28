const Users = require('../usersModel')
const mongoose = require('mongoose')


// create new user

const createUser =async(req,res)=>{
    const {username,stocks} = req.body
    try{
        const user = await Users.create({username,stocks})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})

    }

}

//get all users


const getAllUsers = async(req,res)=>{
    
    const users = await Users.find({})
    res.status(200).json(users)

}


// get a single user
const getUser = async (req,res)=>{


    const {user}=   (req.body)
    const userRequest = await Users.find({username:user})


    // if (!mongoose.Types.ObjectId.isValid(userRequest)){
    //     return res.status(404).json({error:"No such user"})
    // }



    // if (!userRequest) {
    //     return res.status(400).json({error: 'no such user'})
    // }
    console.log('im logging in')
    res.status(200).json(userRequest[0])

}



// update user

const updateUser = async (req,res)=>{

    const user=  req.body.user
    const userRequest = await Users.findOneAndUpdate({username:user},{ 

        $push :{stocks:req.body.stocks[0]}
        
        
    })


    const userRequestRefreshed = await Users.find({username:user})
    console.log('updating user',userRequestRefreshed)
    res.status(200).json(userRequestRefreshed[0])
    

}

const updateUserSellNBuy = async (req,res)=>{
   
    const user=  req.body.user
    const userRequest = await Users.findOneAndUpdate({username:user},{ 

        ...req.body
        
        
    })


    const userRequestRefreshed = await Users.find({username:user})
    console.log('updating user',userRequestRefreshed[0].stocks)
    res.status(200).json(userRequestRefreshed[0])
    
}

const resetUser = async (req,res)=>{

    const user=  req.body.user
    const userRequest = await Users.findOneAndUpdate({username:user},{ 

        ...req.body
            
    })

    const userRequestRefreshed = await Users.find({username:user})
    console.log(req.body)
    res.status(200).json(userRequestRefreshed)

}

const deleteStock = async (req,res)=>{
    const user=  req.body.user


    const userRequest = await Users.findOneAndUpdate({username:user},{ 

        ...req.body  
        
    })

    const userRequestRefreshed = await Users.find({username:user})
    console.log('deleting stock',req.body)
    res.status(200).json(userRequestRefreshed[0])
}


module.exports = {
    getUser,
    createUser,
    getAllUsers,
    updateUser,
    resetUser,
    deleteStock,
    updateUserSellNBuy

}

