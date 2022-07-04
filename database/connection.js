const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`Database connect to : ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;