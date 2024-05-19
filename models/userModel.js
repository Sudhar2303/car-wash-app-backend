const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    firstName :
    {
        type : String,
        required : true
    },
    lastName : 
    {
        type : String,
        required : true
    },
    email : 
    {
        type : String,
        required : true
    },
    password : 
    {
        type : String,
        required : true
    },
    role :
    {
        type : String,
        enum :['admin','user'],
        default : 'user'
    }
},
{
    collection : 'carWash'
 })

 module.exports = mongoose.model('carWash',userModel)