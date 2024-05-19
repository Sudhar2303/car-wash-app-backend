const mongoose = require('mongoose')

const bookingModel = mongoose.Schema({
    carNumber :
    {
        type : String,
        required : true
    },
    model : 
    {
        type : Number,
        required : true
    },
    services : 
    {
        type : [String],
        required : true
    },
    bookingStatus :
    {
        type : String,
        enum : ['pending','success','rejected'],
        default : 'pending'
    }
},
{
    collection : 'booking-details'
 })

 module.exports = mongoose.model('booking-details',bookingModel)