const serviceDetailsModel = require('../models/serviceDetailsModel')
const bookingModel = require('../models/bookingModel')
const initialData = require('../data/initialData')

const getAllServiceCenter = async(request,response) =>
{
    try
    {
        const serviceCenterData = await serviceDetailsModel.find()
        if(serviceCenterData.length === 0)
        {
            return response.status(200).send({message: "There is no service center"})
        }
        else
        {
            return response.status(200).json(serviceCenterData)
        }
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}


const getBookingAvailability = async(request,response)=>
{
    try
    {
        const serviceCenterData = await serviceDetailsModel.find({ Availability: { $gt: 0 } })
        if(serviceCenterData.length === 0)
        {
            return response.status(200).send({message: 'Sorry all the slot are full'})
        }
        else
        {
            return response.status(200).json(serviceCenterData)
        }
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}
    
const getBookingStatus = async(request,response)=>
{
    const givenCarNumber = request.body.carNumber
    try
    {
        const bookingData = await bookingModel.findOne({carNumber: givenCarNumber})
        if(bookingData.length == 0)
        {
            return response.status(409).send({message: 'No, details is found using the given car number'})
        }
        else
        {
            return response.status(200).json(bookingData)
        }
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}

const addnewBooking = async(request,response)=>
{
    const newBooking = request.body
    try
    {
        const existingData = await bookingModel.findOne({carNumber: newBooking.carNumber})
        if(existingData)
        {
            return response.status(409).send({message: 'Already data is exists'})
        }
        else
        {
            const addNewData = await bookingModel.insertMany(newBooking)
            return response.status(200).send(addNewData)
        }
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}
module.exports = {getAllServiceCenter,getBookingAvailability,getBookingStatus,addnewBooking}