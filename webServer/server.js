require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = require('./dbConn')
const express = require('express');
const app = express()
const path = require('path');
const PORT = process.env.PORT || 3500;

const WebSocket = require('ws')

const {createUser,getAllUsers,getUser,updateUser,resetUser,deleteStock} = require('./controllers/userController.js')

const {getLogin, getSymbol } = require('./controllers/xtbController.js')

const Users = require('./usersModel')


// Connect to mongo db
connectDB()

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
  });


app.get('/',(req,res)=>{

})


app.post('/login',getLogin)

app.get('/getSymbol',getSymbol)

app.get('/getAllUsers',getAllUsers)

app.post('/getUser', getUser)

app.post('/createUser', createUser)

app.patch('/updateUser',updateUser)

app.patch('/resetUser',resetUser)

app.patch('/deleteStock',deleteStock)




mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')

})




// ws.send(`{
//     "command":"getCalendar"
// }`)
app.listen(PORT,()=> console.log(`Server running on ${PORT}`))
