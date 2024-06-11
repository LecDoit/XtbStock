const Stock = require('../stockModel')
const Users = require('../userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id,)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}


//login

const loginUser = async (req,res)=>{

    const {email,password} = req.body

    try{
        const user = await Users.login(email,password)
        console.log(req.path, req.method,`user logged in ${user}`)

        const token = createToken(user._id)

        res.status(200).json({email,token})

    } catch (error){
        res.status(400).json({error:error.message})
    }
}
//signup

const signupUser = async (req,res)=>{
    const {email,password} = req.body
    const emptyArr = []
    try{
        const user = await Users.signup(email,password)
        const stock = await Stock.create({email,emptyArr})
        console.log(req.path, req.method,`user created ${user}`)

        const token = createToken(user._id)

        res.status(200).json({email,token})

    } catch (error){
        res.status(400).json({error:error.message})
    }


}



module.exports = {
    loginUser,
    signupUser

}

