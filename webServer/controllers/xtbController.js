const Users = require('../usersModel')
const mongoose = require('mongoose')
const WebSocket = require('ws')


let wsGlobal = null

const funcz = async (ws,item) =>{

    ws.send(`{
        "command": "getSymbol",
        "arguments": {
            "symbol": "EURPLN"
        }
    }`
    )

}

const getLogin = async (req,res,next) =>{
    const ws =   new WebSocket('wss://ws.xtb.com/demo');
    wsGlobal = ws
    
    console.log('hitting /login endpoint')
    const user = req.body.user
    const password = req.body.password
    const action = req.body.action


    // xtb login
        ws.on('open', async function  open() {

            ws.send(
                `{
                "command": "login",
                "arguments": {
                    "userId": "${req.body.user}",
                    "password": "${req.body.password}",
                    "appId": "",
                    "appName": ""
                    }
                }`  
            );       

        });

    ws.on('close', function close() {
    console.log('disconnected');
    });

    ws.on('error',(e)=>{
    console.log(e)
    })



    ws.on('message', async function message(data) {
        console.log(JSON.parse(data))
        console.log('working')

        return res.status(200).send(JSON.parse(data))

        
        
 
    });


     
  
}


const getSymbol = async (ws,res)=>{

    wsGlobal.send(`{
        "command": "getSymbol",
        "arguments": {
            "symbol": "EURPLN"
        }
    }`
    )


    // ws.on('message', async function message(data) {
    //     // console.log(JSON.parse(data))
    //     console.log('working')

    //     return res.status(200).json(JSON.parse(data))
        
        
 
    // });

    // wsGlobal.on('message', (data)=>{
    //     console.log('working')
    //     // res.status(200).json(data)
    // })


    // wsGlobal.on('message', async function message(data) {
   
        // console.log(`message`,JSON.parse(data));
        // res.send(data)
        // res.status(200).json(JSON.parse(data))
        
 
    // });

}


module.exports = {
    getLogin,
    getSymbol,
    funcz
}
