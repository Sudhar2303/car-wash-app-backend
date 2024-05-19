const jwt=require('jsonwebtoken')
const JWT_TOKEN='reorijofivmweoirfjwoeiwosfhbjh'
const userModel = require('../models/userModel')

const adminAuth = async(request,response,next) =>
{
    const givenToken = request.body.token
    try
    {
        const loggedInUser=jwt.verify(givenToken,JWT_TOKEN)
        const loggedInUseremail=loggedInUser.email
        const userDetails =await userModel.findOne({email : loggedInUseremail})
        console.log(userDetails)
        if(userDetails)
        {
            if(userDetails.role == 'admin')
            {
                // return response.status(200).send({message : "welcome admin"})
                next()
            }
            else
            {
                return response.status(200).send({message : "unauthorized user"})
            }
        }
        else
        {
            return response.status(200).send({message : "un-identified token"})
        }
    }
    catch(error)
    {
        return response.status(500).send({message : error.message})
    }
}

module.exports = adminAuth
