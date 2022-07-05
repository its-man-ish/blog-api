const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const connectDB  = require('./database/connection');
const blogRouter = require('./routes/blogs/router');
const cors = require('cors')

//databse connection
connectDB()
app.use(express.json());
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(cors())

app.use(blogRouter);
app.get('/server',(req,res)=>{
    res.send('Server')
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});