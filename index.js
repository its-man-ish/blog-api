const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const connectDB  = require('./database/connection');
const blogRouter = require('./routes/blogs/router');
const cors = require('cors')

//databse connection
connectDB()
app.use(express.json());
app.use(cors())

app.use(blogRouter);
app.get('/server',(req,res)=>{
    res.send('Server')
})
app.listen(5000,()=>{
    console.log('Server on port 5000')
})