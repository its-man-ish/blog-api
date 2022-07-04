const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String       
    },
    category:{
        type:String
    },
    body:{
        type:String
    },
    author:{
        type:String
    }
},{
    timestamps:true
});

const blogDB = mongoose.model('blogs',blogSchema);

module.exports= blogDB