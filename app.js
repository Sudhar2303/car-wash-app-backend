require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 3500
const app = express()
const mongoose = require('mongoose')

const loginRouter = require('./routes/loginRoute')
const signupRouter = require('./routes/signupRoute')
const adminRouter = require('./routes/adminRoute')
const userRouter = require('./routes/userRoute')
app.use(express.json())

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',(error)=>console.log(error.message))
db.once('open',()=>console.log('database is connected successfully'))

app.get('/',(request,response)=>
{
    response.status(200).send({message : 'server is sunning successfully'})
})

app.use('/login',loginRouter)
app.use('/signup',signupRouter)
app.use('/admin',adminRouter)
app.use('/user',userRouter)

app.listen(PORT,console.log(`the server is running successfully at http://localhost:${3500}`))