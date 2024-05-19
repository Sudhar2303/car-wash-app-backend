const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const registerNewUser = async(request,response)=>
{
    const encryptedPassword = await bcrypt.hash(request.body.password,10)

    const user = userModel({
        firstName : request.body.firstName,
        lastName : request.body.lastName,
        email : request.body.email,
        password : encryptedPassword
    })

    try
    {
        const existingUser = await userModel.findOne({email: request.body.email})
        if(existingUser)
        {
            return response.status(409).send({message : 'User Name already exist'})
        }
        else
        {
            const addingNewUser = await user.save()
            return response.status(201).send(addingNewUser)
        }
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

module.exports = {registerNewUser}