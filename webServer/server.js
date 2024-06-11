require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors');

const connectDB = require('./dbConn')
const express = require('express');
const app = express()



const stockRoutes = require('./routes/stocks')
const userRoutes = require('./routes/user')



// Connect to mongo db
connectDB()


// middleware
app.use(express.json())

app.use(cors({
  origin:'*',
  credentials:true,
  optionsSuccessStatus:200
}))

app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

app.get('/',(req,res)=>{
  res.json({msg:'This is regular endpoint for XTB App.'})


})

app.use('/stocks',stockRoutes)

app.use('/users',userRoutes)


mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')

})



app.listen(10000,()=> console.log(`Server running on 10k`))
