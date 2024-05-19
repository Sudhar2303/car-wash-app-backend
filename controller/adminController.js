const serviceDetailsModel = require('../models/serviceDetailsModel')
const bookingModel = require('../models/bookingModel')
const initialBookingData = require('../data/initialBookingData')
const initialData = require('../data/initialData')

const getAllServiceCenter = async(request,response) =>
{
    try
    {
        const serviceCenterData = await serviceDetailsModel.find()
        if(serviceCenterData.length === 0)
        {
            const initialDetails = await serviceDetailsModel.insertMany(initialData)
            return response.status(200).json(initialDetails)
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

const addNewServiceCenter = async(request,response)=>
{
    const newCenter = request.body
    try
    {
        const existingCenter = await serviceDetailsModel.findOne({serviceCenter:newCenter.serviceCenter})
        if(!existingCenter)
        {
            const addNewCenter = await serviceDetailsModel.insertMany(newCenter)
            return response.status(200).json(addNewCenter)
        }
        else
        {
            return response.status(409).send({message : `The service Center is already exists`})
        }
    }
    catch(error)
    {
        return response.status(200).send({message : error.message})
    }
}

const addNewServices = async(request,response)=>
{
    const newService = request.body.services
    const serviceCenter = request.body.serviceCenter
    try
    {
        const serviceCenterDetails = await serviceDetailsModel.findOne({ serviceCenter: serviceCenter });
        serviceCenterDetails.services.push(...newService);
        await serviceCenterDetails.save();
        return response.status(200).send(serviceCenterDetails)
    }
    catch(error)
    {
        return response.status(200).send({message : error.message})
    }
}

const getAllbookings = async(request,response)=>
{
    try
    {
        const bookingData = await bookingModel.find()
        if(bookingData.length === 0)
        {
            const initialDetails = await bookingModel.insertMany(initialBookingData)
            return response.status(200).json(initialDetails)
        }
        else
        {
            return response.status(200).json(serviceCenterData)
        }
    }
    catch(error)
    {
        return response.status(500),send({message: error.message})
    }
}

module.exports = {getAllServiceCenter,addNewServiceCenter,addNewServices,getAllbookings}