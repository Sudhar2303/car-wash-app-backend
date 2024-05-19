const mongoose = require('mongoose')

const serviceDetailsModel = mongoose.Schema({
    serviceCenter :
    {
        type : String,
        required : true
    },
    Availability : 
    {
        type : Number,
        default : 5
    },
    services : 
    {
        type : [String],
        required : true
    },
    storeStatus :
    {
        type : String,
        enum : ['opened','closed'],
        default : 'opened'
    }
},
{
    collection : 'service-details'
 })

 module.exports = mongoose.model('service-details',serviceDetailsModel)