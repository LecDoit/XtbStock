const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    stocks:[{
        
            symbol:{type:String},
            buy:{type:Number},
            sell:{type:Number},

            start:{type:Number},
            period:{type:Number},
            ticks:{type:Number}

        
    }]


},{timestamps:true})



module.exports = mongoose.model('stocks',stockSchema)

